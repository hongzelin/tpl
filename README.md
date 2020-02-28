## tpl
 创建统一功能模块模板。

 结构如下：
 <pre>
xxx                     // 业务组件根目录
  |-- components        // 业务组件目录
  |-- models            // 业务 models 目录
    |-- xxx.js          // 业务 model 文件，自动加载 services
  |-- services          // 业务 services 目录
    |-- xxx.js          // 业务 service 文件
  |-- XxxPage.js        // 业务组件开发入口，自动 connect model
  |-- XxxPage.less      // 业务样式
  |-- index.js          // 业务入口，使用 dynamic 引用
  |-- MapProps.js       // mapStateToProps、mapDispatchToProps，自动引用 model
</pre>

## 安装
```
npm i zh-tpl -g
```

## 使用
```
$ tpl 模块名
```

例如：需要创建 home 模块，则运行如下命令
```
tpl home

```

运行结果：
<pre>
home                    // 业务组件根目录
  |-- components        // 业务组件目录
  |-- models            // 业务 models 目录
    |-- home.js         // 业务 model 文件，自动加载 services
  |-- services          // 业务 services 目录
    |-- home.js         // 业务 service 文件
  |-- HomePage.js       // 业务组件开发入口，自动 connect model
  |-- HomePage.less     // 业务样式
  |-- index.js          // 业务入口，使用 dynamic 引用
  |-- MapProps.js       // mapStateToProps、mapDispatchToProps，自动引用 model
</pre>

为了规范，在创建模块的时候，同时支持传入头文件注释 author，命令行：
```
$ tpl 模块名 --author=小明

或者使用简写

$ tpl 模块名 -a=小明
```

## 说明

- 1.该模板是针对使用 umi 框架的项目，创建统一功能模块模板；

- 2.安装完成之后，直接在项目的根目录 cmd 下运行命令（VSCode 直接打开终端运行命令）；

- 3.由于实际项目开发，模块一般都是在 `src/pages` 下创建，所以，默认创建的模块放在 `src/pages` 目录下；

- 4.如果执行命令的目录下没有 `src/pages` ，则默认在执行的目录下创建模块；

- 5.支持创建模块的时候，同时传入头文件注释 author，简写命令为：`$ tpl 模块名 -a=xxx`

- 6.同时支持 taro 模板，默认为 umi 模板，如果需要创建 taro 模板，运行命令为：`$ tpl 模块名 -a=xxx -t=taro`
