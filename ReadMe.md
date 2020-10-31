![](https://sres.blob.core.windows.net/img/main_logo_text_fc53ae225a.png)

# PyConChina 2020

[PyConChina][1] 大会网站，提供大会日程、讲师信息等内容。一个[渐进式 Web 应用][2]。

[![NPM Dependency](https://david-dm.org/shinyzhu/PyConChinaWeb.svg)][3]
[![CI & CD](https://github.com/shinyzhu/PyConChinaWeb/workflows/CI%20&%20CD/badge.svg)][4]

## 重要链接

-   后端 API：https://github.com/shinyzhu/PyConChinaService

## Technology stack

-   Language: [TypeScript v4][5]
-   Component engine: [WebCell v2][6]
-   Component suite: [BootStrap v4][7]
-   PWA framework: [Workbox v4][8]
-   Package bundler: [Parcel v1][9]
-   CI / CD: GitHub [Actions][10] + [Azure Static Web Apps][11]

## Development

```shell
npm install

npm start
```

## Deployment

```shell
npm run build
```

[1]: https://cn.pycon.org/
[2]: https://developer.mozilla.org/zh-CN/docs/Web/Progressive_web_apps
[3]: https://david-dm.org/shinyzhu/PyConChinaWeb
[4]: https://github.com/shinyzhu/PyConChinaWeb/actions
[5]: https://typescriptlang.org/
[6]: https://web-cell.dev/
[7]: https://getbootstrap.com/
[8]: https://developers.google.com/web/tools/workbox
[9]: https://parceljs.org/
[10]: https://github.com/features/actions
[11]: https://docs.microsoft.com/azure/static-web-apps/?WT.mc_id=python-10572-xinglzhu
