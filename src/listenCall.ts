import { Call } from './call';
import { Config } from './config';

let timer: NodeJS.Timer | null = null;
export function listenCall(call: Call, config: Config) {
  clearInterval(timer as NodeJS.Timer);
  timer = setInterval(() => {
    call.callJay();
  }, 1000 * 60 * config.timer);
}
