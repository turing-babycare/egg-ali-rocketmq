import { Application } from 'egg';
import RocketMq from './lib/rocketmq';

export default (app: Application) => {
  if (app.config.rocketmq) {
    console.log('egg-rocketmq-ts');
    app.rocketmq = new RocketMq(app);
  }
};
