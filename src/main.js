const fs = require("fs");
const path = require("path");
const chalk = require('chalk');
const conf = require("./config");
const { capitalize } = require('./utils');
const {
  indexContent,
  mapPropsContent,
  pContent,
  lessContent,
  servicesContent,
  modelsContent,
} = require('./template');

const DIRS = ["models", "services", "components"];

function Main(argv) {
  const { _: files } = argv;
  if (files.length > 0) {
    files.map(file => {
      start(file, argv);
      return null;
    })
  } else {
    const msg = chalk.yellow(`请输入要创建的模块名称！！！`);
    console.info(msg); // eslint-disable-line
  }
}

function start(file, argv) {
  if (file.length) {

    let root = "./";
    if (isExisDir(conf.root)) {
      root = conf.root || "./";
    }

    // 获取 root 下面的所有文件夹
    const pagesPath = path.resolve(process.cwd(), root);
    const allDirs = findDirs(pagesPath);
    if (allDirs.indexOf(file) > -1) {
      const msg = chalk.yellow(`${file} 文件夹已经存在，请重命名输入！！！`);
      console.info(msg); // eslint-disable-line
      return;
    }

    const filePath = path.resolve(process.cwd(), root, file);
    const pageName = `${capitalize(file)}Page`;

    // 创建目录
    DIRS.forEach(dirName => {
      mkdirsSync(`${filePath}/${dirName}`);
    });

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
}

// 检查某个目录是否存在
function isExisDir(dir) {
  try {
    const stat = fs.statSync(dir);
    if (stat) {
      return true;
    }
  } catch (error) {
    return false;
  }
  return false;
}

// 获取所有子目录
function findDirs(dirs) {
  const dirArr = []
  const dirArray = fs.readdirSync(dirs);
  for (const d of dirArray) {
    const filePath = path.resolve(dirs, d);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      dirArr.push(d);
    }
  }
  return dirArr;
}

// 递归创建目录 同步方法
function mkdirsSync(dirname) {
  if (fs.existsSync(dirname)) {
    return true;
  } else if (mkdirsSync(path.dirname(dirname))) {
    fs.mkdirSync(dirname);
    return true;
  }
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

module.exports = Main;
