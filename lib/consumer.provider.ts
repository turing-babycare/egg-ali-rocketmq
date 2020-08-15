import { Application } from 'egg';
import { Client, Message } from 'ali-rocketmq';
import * as camelCase from 'camelcase';

export interface IRocketMQConfigTopic {
  endpoint?: string;
  instance?: string;
  accessKey?: string;
  accessSecret?: string;
  enable_consumer?: boolean;
  numOfMessages?: number;
  waitSeconds?: number;
  topic: string;
  group: string;
  trans: boolean;
}

export interface IRocketMQConfigConsumer {
  numOfMessages: number;
  waitSeconds: number;
}

export interface IRocketMQConfigOptions {
  endpoint: string;
  instance: string;
  accessKey: string;
  accessSecret: string;
}

export interface IRocketMQConfig {
  options: IRocketMQConfigOptions;
  consumer: IRocketMQConfigConsumer;
  topics: IRocketMQConfigTopic[];
  [x: string]: any;
}


async function processHandler(app: Application, message: Message) {
  try {
    const topic = message.client.options.topic || '';
    const tag = message.tag || '';
    const ctx = app.createAnonymousContext();
    const lTopic = camelCase(topic);
    const lTag = camelCase(tag);
    if (ctx.service.rocketmq[lTopic] && ctx.service.rocketmq[lTopic][lTag]) {
      return ctx.service.rocketmq[lTopic][lTag](message);
    }
    throw new Error(`'[RocketMQ] Not Found service.${lTopic}.${lTag}`);

  } catch (error) {
    app.logger.error('[RocketMQ] ', error);
  }
}

export default (app: Application, clients: Map<string, Client>) => {
  const config = app.config.rocketmq;
  for (let i = 0; i < config.topics.length; i++) {
    const topicConf = config.topics[i];
    const client = clients.get(topicConf.topic);
    if (client) {
      if (topicConf.enable_consumer) {
        if (topicConf.trans) {
          client.onHalfMessageSync(config.consumer, async (message: Message) => {
            return processHandler(app, message);
          });
        } else {
          client.onMessageSync(config.consumer, async (message: Message) => {
            return processHandler(app, message);
          });
        }

      } else {
        app.coreLogger.warn(`[RocketMQ] ${topicConf.topic} 跳过consumer`);
      }
    } else {
      app.coreLogger.warn(`[RocketMQ] ${topicConf.topic} 没有实例化Client`);
    }
  }
};
