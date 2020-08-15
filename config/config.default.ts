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

