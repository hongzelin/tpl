/*
 * Author: lin.zehong 
 * Date: 2020-02-22 12:29:16 
 * Desc: 各种文件模板
 */
const fs = require("fs");
const chalk = require('chalk');

const {
  indexContent: umiindexContent,
  mapPropsContent: umimapPropsContent,
  pContent: umipContent,
  lessContent: umilessContent,
  servicesContent: umiservicesContent,
  modelsContent: umimodelsContent,
} = require('./umiTpl');

const {
  indexContent: tsindexContent,
  mapPropsContent: tsmapPropsContent,
  pContent: tspContent,
  lessContent: tslessContent,
  servicesContent: tsservicesContent,
  modelsContent: tsmodelsContent,
} = require('./umiTsTpl');

const {
  indexContent: taroindexContent,
  mapPropsContent: taromapPropsContent,
  pContent: taropContent,
  lessContent: tarolessContent,
  servicesContent: taroservicesContent,
  modelsContent: taromodelsContent,
} = require('./taroTpl');


// 默认 umi 模板
let indexContent = umiindexContent;
let mapPropsContent = umimapPropsContent;
let pContent = umipContent;
let lessContent = umilessContent;
let servicesContent = umiservicesContent;
let modelsContent = umimodelsContent;

function writeFileByType(filePath, pageName, file, argv) {
  const { type } = argv;

  if (type === 'taro') {
    indexContent = taroindexContent;
    mapPropsContent = taromapPropsContent;
    pContent = taropContent;
    lessContent = tarolessContent;
    servicesContent = taroservicesContent;
    modelsContent = taromodelsContent;
  }

  if (type === 'ts') {
    indexContent = tsindexContent;
    mapPropsContent = tsmapPropsContent;
    pContent = tspContent;
    lessContent = tslessContent;
    servicesContent = tsservicesContent;
    modelsContent = tsmodelsContent;
    // umi 、 taro
    writeTsFile(filePath, pageName, file, argv);
    return;
  }
  // umi 、 taro
  writeUmiOrTaroFile(filePath, pageName, file, argv);
}

function writeTsFile(filePath, pageName, file, argv) {
  // 创建文件，写入内容
  // index.js
  writeFile(`${filePath}/index.ts`, indexContent(pageName, argv));
  // MapProps.js
  writeFile(`${filePath}/MapProps.js`, mapPropsContent(pageName, file, argv));
  // xxxPage.js
  writeFile(`${filePath}/${pageName}.tsx`, pContent(file, pageName, argv));
  // xxxPage.less
  writeFile(`${filePath}/${pageName}.less`, lessContent(argv));
  // services
  writeFile(`${filePath}/services/${file}.ts`, servicesContent(file, argv));
  // models
  writeFile(`${filePath}/models/${file}.tsx`, modelsContent(file, argv), true);
}

function writeUmiOrTaroFile(filePath, pageName, file, argv) {
  // 创建文件，写入内容
  // index.js
  writeFile(`${filePath}/index.js`, indexContent(pageName, argv));
  // MapProps.js
  writeFile(`${filePath}/MapProps.js`, mapPropsContent(pageName, file, argv));
  // xxxPage.js
  writeFile(`${filePath}/${pageName}.js`, pContent(pageName, argv));
  // xxxPage.less
  writeFile(`${filePath}/${pageName}.less`, lessContent(argv));
  // services
  writeFile(`${filePath}/services/${file}.js`, servicesContent(file, argv));
  // models
  writeFile(`${filePath}/models/${file}.js`, modelsContent(file, argv), true);
}

// 创建文件
function writeFile(filename, fileContent = '', flag = false) {
  fs.writeFile(filename, fileContent, 'utf8', (error) => {
    if (error) {
      const err = chalk.red(error);
      console.info(err); // eslint-disable-line
      return false;
    }
    if (flag) {
      const msg = chalk.green("模块创建成功！！！");
      console.info(msg); // eslint-disable-line
      return true;
    }
  })
}

module.exports = {
  writeFileByType,
}
