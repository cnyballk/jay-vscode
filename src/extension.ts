'use strict';
import { commands, ExtensionContext } from 'vscode';

import { Call } from './call';
import { config, configDeactivate, getConfig, configActivate } from './config';
import { listenCall } from './listenCall';

export function activate(context: ExtensionContext) {
  getConfig();
  const call = new Call(context, config);
  listenCall(call, config);
  configActivate(call);
  commands.registerCommand('extension.callJay', () => {
    call.callJay();
  });
}

export function deactivate() {
  configDeactivate();
}
