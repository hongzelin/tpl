/*
 * Author: lin.zehong 
 * Date: 2020-02-22 12:29:16 
 * Desc: 各种文件模板 
 */
const {
  indexContent: umiindexContent,
  mapPropsContent: umimapPropsContent,
  pContent: umipContent,
  lessContent: umilessContent,
  servicesContent: umiservicesContent,
  modelsContent: umimodelsContent,
} = require('./umiTpl');

const {
  indexContent: taroindexContent,
  mapPropsContent: taromapPropsContent,
  pContent: taropContent,
  lessContent: tarolessContent,
  servicesContent: taroservicesContent,
  modelsContent: taromodelsContent,
} = require('./taroTpl');

// index 内容
function indexContent(pageName, options) {
  const { type } = options;
  if (type === 'umi') {
    return umiindexContent(pageName, options);
  } else if (type === 'taro') {
    return taroindexContent(pageName, options);
  } else {
    return umiindexContent(pageName, options);
  }
}

// MapProps 内容
function mapPropsContent(desc, modelName, options) {
  const { type } = options;
  if (type === 'umi') {
    return umimapPropsContent(desc, modelName, options);
  } else if (type === 'taro') {
    return taromapPropsContent(desc, modelName, options);
  } else {
    return umimapPropsContent(desc, modelName, options);
  }
}

// 入口组件内容
function pContent(pageName, options) {
  const { type } = options;
  if (type === 'umi') {
    return umipContent(pageName, options);
  } else if (type === 'taro') {
    return taropContent(pageName, options);
  } else {
    return umipContent(pageName, options);
  }
}

// less 内容
function lessContent(options) {
  const { type } = options;
  if (type === 'umi') {
    return umilessContent();
  } else if (type === 'taro') {
    return tarolessContent();
  } else {
    return umilessContent();
  }
}

// services 内容
function servicesContent(desc, options) {
  const { type } = options;
  if (type === 'umi') {
    return umiservicesContent(desc, options);
  } else if (type === 'taro') {
    return taroservicesContent(desc, options);
  } else {
    return umiservicesContent(desc, options);
  }
}

// models 内容
function modelsContent(fileName, options) {
  const { type } = options;
  if (type === 'umi') {
    return umimodelsContent(fileName, options);
  } else if (type === 'taro') {
    return taromodelsContent(fileName, options);
  } else {
    return umimodelsContent(fileName, options);
  }
}

module.exports = {
  indexContent,
  mapPropsContent,
  pContent,
  lessContent,
  servicesContent,
  modelsContent,
}
