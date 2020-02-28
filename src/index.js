#! /usr/bin/env node

const { argv } = require('yargs')
  .usage('创建统一模块模板')
  .option('d', {
    alias: 'root',
    default: "src/pages",
    describe: "需要创建模板的目录",
  })
  .option('a', {
    alias: 'author',
    default: "",
    describe: "作者",
  })
  .option('t', {
    alias: 'type',
    default: "umi",
    describe: "模板类型，目前支持 umi 和 taro 两种模板",
  })
  .help();

const Main = require("./main");

Main(argv);
