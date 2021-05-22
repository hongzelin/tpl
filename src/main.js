const fs = require("fs");
const path = require("path");
const chalk = require('chalk');
const conf = require("./config");
const { capitalize, smallLetters } = require('./utils');
const { writeFileByType } = require('./template');

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
    const { type } = argv;

    // 公共组件和页面模板组件，路径不相同
    let root = "./";
    if (type === 'fc' && isExisDir(conf.rootCompPath)) {
      root = conf.rootCompPath || "./";
    } else if (isExisDir(conf.root)) {
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

    // 函数组件独立处理
    if (type === 'fc') {
      const fileName = capitalize(file);
      const pageName = `${capitalize(file)}Page`;
      const filePath = path.resolve(process.cwd(), root, fileName);
      
      // 创建目录
      mkdirsSync(filePath);

      writeFileByType(filePath, pageName, fileName, argv);
      return;
    } 

    const filePath = path.resolve(process.cwd(), root, file);
    const pageName = `${capitalize(file)}Page`;
    const fileName = smallLetters(file);

    // 创建目录
    DIRS.forEach(dirName => {
      mkdirsSync(`${filePath}/${dirName}`);
    });

    writeFileByType(filePath, pageName, fileName, argv);

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

module.exports = Main;
