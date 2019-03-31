'use strict';
import {
  WebviewPanel,
  ExtensionContext,
  window,
  Uri,
  ViewColumn,
} from 'vscode';
import * as path from 'path';
import { Config } from './config';
export class Call {
  private context: ExtensionContext;
  private config: Config;
  private panel: WebviewPanel | undefined;
  constructor(context: ExtensionContext, config: Config) {
    this.context = context;
    this.config = config;
  }
  public callJay() {
    if (this.panel) {
      this.panel.reveal();
    } else {
      const { picture, text } = this.config;
      this.panel = window.createWebviewPanel('jay', '周杰伦', ViewColumn.Two, {
        enableScripts: true,
        retainContextWhenHidden: true,
      });
      let imagePath: Uri | string = '';
      if (/http/.test(picture)) {
        imagePath = picture;
      } else {
        imagePath = Uri.file(
          path.join(
            this.context.extensionPath,
            'public',
            (picture || 'jay-2') + '.png'
          )
        ).with({ scheme: 'vscode-resource' });
      }

      this.panel.webview.html = `<!DOCTYPE html>
                                <html lang="en">
                                <head>
                                    <meta charset="UTF-8">
                                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                                    <title>周杰伦</title>
                                </head>
                                <body>
                                    <h1>${text}</h1>
                                    <div><img src="${imagePath}"></div>
                                </body>
                                </html>`;

      this.panel.onDidDispose(() => {
        this.panel = undefined;
      });
    }
  }
  public onConfigChange() {
    this.panel = undefined;
  }
}
