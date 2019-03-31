import { workspace, ConfigurationChangeEvent, Disposable } from 'vscode';
import { Call } from './call';
import { listenCall } from './listenCall';

let listener: Disposable;
export interface Config {
  timer: number;
  text: string;
  picture: string;
}
export const config: Config = {
  timer: 120,
  text: '哎哟，不错哦，这代码，不过记得先休息一下，喝杯奶茶吧',
  picture: 'jay-2',
};

export function getConfig(e?: ConfigurationChangeEvent) {
  if (e && !e.affectsConfiguration('jay')) return;
  const jay = workspace.getConfiguration('jay');
  config.timer = jay.get('timer', 120);
  config.text = jay.get(
    'text',
    '哎哟，不错哦，这代码，不过记得先休息一下，喝杯奶茶吧'
  );
  config.picture = jay.get('picture', 'jay-2');
}
export function configActivate(call: Call) {
  listener = workspace.onDidChangeConfiguration(
    (e: ConfigurationChangeEvent) => {
      getConfig(e);
      listenCall(call, config);
      call.onConfigChange();
    }
  );
}
export function configDeactivate() {
  listener.dispose();
}
