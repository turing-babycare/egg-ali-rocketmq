'use strict';

const mock = require('egg-mock');

describe('test/syhh-rocketmq.test.js', () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: 'apps/syhh-rocketmq-test',
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mock.restore);

  it('should GET /', () => {
    return app.httpRequest()
      .get('/')
      .expect('hi, syhhRocketmq')
      .expect(200);
  });
});
