import { IRocketMQClients } from './client.provider';
import RocketMQClients from './client.provider';
import ConsumerProvider from './consumer.provider';
import { Application } from 'egg';
import { Client } from 'ali-rocketmq/build';
import { MsgProps } from '@aliyunmq/mq-http-sdk';

export interface IRocketMq {
  getClient(key: string): Client;
  sendMsg(topic: string, msg: unknown, tag: string, props?: MsgProps): Promise<any>;
}
export default class RocketMq implements IRocketMq {
  constructor(app: Application) {
    this.clientsProvider = RocketMQClients(app);
    if (app.config.rocketmq.enable_consumer) {
      ConsumerProvider(app, this.clientsProvider.clients);
    } else {
      app.coreLogger.info('[RocketMQ] skip consumer');
    }
  }
  private clientsProvider: IRocketMQClients

  getClient(key: string): Client {
    const cient = this.clientsProvider.clients.get(key);
    if (!cient) {
      throw new Error('[RocketMQ]没有找到Client ' + key);
    }
    return cient;
  }

  async sendMsg(topic: string, msg: unknown, tag: string, props?: MsgProps) {
    const client = await this.getClient(topic);
    return client.send(msg, tag, props, true);
  }

}
