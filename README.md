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

## 说明

- 1.该模板是针对使用 umi 框架的项目，创建统一功能模块模板；

- 2.安装完成之后，直接在项目的根目录 cmd 下运行命令（VSCode 直接打开终端运行命令）；

- 3.由于实际项目开发，模块一般都是在 `src/pages` 下创建，所以，默认创建的模块放在 `src/pages` 目录下；

- 4.如果执行命令的目录下没有 `src/pages` ，则默认在执行的目录下创建模块；
