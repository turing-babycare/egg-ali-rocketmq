/** topics
  {
    FdBeAskToCommon: {
      topic: 'FdBeAskToCommon', // topic 名称
      group: 'GID_default',
      trans: false, //是否是事务
      enable_consumer: false, // 是否开启该topic的消费者
    },
  }
 */


export default () => {
  return {
    topics: [],
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
};

