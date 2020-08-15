import 'egg';
import { IRocketMq } from './lib/rocketmq';

declare module 'egg' {
    interface Application {
        rocketmq: IRocketMq
    }
    interface Context {
        rocketmq: IRocketMq
    }
}