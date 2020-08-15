import { Application } from 'egg';
import { Client } from 'ali-rocketmq';
import { IRocketMQConfigTopic } from './consumer.provider';


export interface IRocketMQClients {
  size: number;
  clients: Map<string, Client>;
  topicConfigs: Map<string, IRocketMQConfigTopic>;
}


export default (app: Application): IRocketMQClients => {
  const config = app.config.rocketmq;
  const clients = new Map<string, Client>();
  const topicConfigs = new Map();
  const { topics, options } = config;
  topics.forEach(topicConf => {
    const opts = Object.assign(options, topicConf);
    const client = new Client(opts);
    clients.set(topicConf.topic, client);
    topicConfigs.set(topicConf.topic, topicConf);
    client.onHalfMessageError(err => {
      app.logger.warn(
        '[RocketMQ][onHalfMessageError] topic: %s',
        topicConf.topic,
        err,
      );
    });
    client.onMessageError(err => {
      app.logger.warn('[RocketMQ][onMessageError] topic: %s', topicConf.topic, err);
    });
    client.onConsumeError(err => {
      app.logger.warn('[RocketMQ][onConsumeError] topic: %s', topicConf.topic, err);
    });
  });
  return {
    size: clients.size,
    clients,
    topicConfigs,
  };
};
