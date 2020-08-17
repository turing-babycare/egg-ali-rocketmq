# egg-ali-rocketmq
  aliyun rocketmq egg插件封装

<!--
Description here.
-->

## Install

```bash
$ npm i egg-ali-rocketmq --save
```

## Usage

```js
// {app_root}/config/plugin.js
exports.aliRocketmq = {
  enable: true,
  package: 'egg-ali-rocketmq',
};
```

## Configuration

```JavaScript
// {app_root}/config/config.default.js

/** topics:
  [
     {
      topic: 'FdBeAskToCommon', // topic 名称
      group: 'GID_default',
      trans: false, //是否是事务
      enable_consumer: false, // 是否开启该topic的消费者
    },
  ]
 */

exports.aliRocketmq = {
    topics: [], // 参照以上配置
    options: {
      group: 'GID_default',
      accessKey: '',
      accessSecret: '',
      endpoint: '', // http 公网接入
      instance: '',
    },
    consumer: {
      numOfMessages: 3,
      waitSeconds: 1,
    },
    enable_consumer: true,
};
```

see [config/config.default.js](config/config.default.js) for more detail.

## Example

框架提供sendMsg接口   接口参数如下
```JavaScript 
  async sendMsg(topic: string, msg: unknown, tag: string, props?: MsgProps) {
  }
```
可在service或者controller下面直接
```js
this.app.rocketmq.sendMsg();
this.ctx.rocketmq.snedMsg();
```
```js
{
  topic: 'topic名称',
  msg: '消息体 可以是字符串  对象 传入什么消费者接受的也是液氧的',
  tag: 'tag',
  props: 'interface MsgProps'
}
interface MsgProps {
    /**
     * 定时消息，单位毫秒（ms），在指定时间戳（当前时间之后）进行投递。
     * 如果被设置成当前时间戳之前的某个时刻，消息将立刻投递给消费者
     */
    sdTime?: number;

    /**
     * 在消息属性中添加第一次消息回查的最快时间，单位秒，并且表征这是一条事务消息
     */
    tciTime?: number;

    /**
     * 设置消息KEY
     */
    key?: string;

    /**
     * 自定义消息属性
     */
    [k: string]: string | number;
  }
```


## Questions & Suggestions

Please open an issue [here](https://github.com/turing-babycare/egg-ali-rocketmq/issues).

## License

[MIT](LICENSE)
