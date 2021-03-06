/*
 * Author: lin.zehong 
 * Date: 2020-02-22 12:29:16 
 * Desc: 各种文件模板 
 */
const { getNowFormatDate } = require('../utils');

// index 内容
function indexContent(pageName, options) {
  const { author } = options;
  const content = `/*
* Author: ${author}
* Date: ${getNowFormatDate()} 
* Desc: ${pageName} 入口 
*/
import Taro, { Component } from '@tarojs/taro';
import ${pageName} from './${pageName}';

class Index extends Component {

  config = {
    navigationBarTitleText: '标题'
  }

  render() {
    return (
      <${pageName} />
    )
  }
}

export default Index
`;
  return content;
}

// MapProps 内容
function mapPropsContent(desc, modelName, options) {
  const { author } = options;
  const content = `/*
* Author: ${author} 
* Date: ${getNowFormatDate()}
* Desc: ${desc} MapProps 
*/
export const mapStateToProps = ({ ${modelName}, loading }) => ({
  loading: loading.models.${modelName},
  myData: ${modelName}.myData,
});

export const mapDispatchToProps = dispatch => ({
  onUpdate(payload) {
    dispatch({
      type: '${modelName}/update',
      payload,
    });
  },
  clearData(payload) {
    dispatch({
      type: '${modelName}/clearData',
      payload,
    });
  },
});
`;
  return content;
}

// 入口组件内容
function pContent(pageName, options) {
  const { author } = options;
  const content = `/*
* Author: ${author} 
* Date: ${getNowFormatDate()} 
* Desc: 描述
*/
import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import { mapStateToProps, mapDispatchToProps } from './MapProps';
import styles from './${pageName}.less';

class ${pageName} extends Component {

  render() {
    return (
      <View className={styles.root}>
        <Text>内容</Text>
      </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(${pageName});
`;
  return content;
}

// less 内容
function lessContent() {
  const content = `.root{

}
`;
  return content;
}

// services 内容
function servicesContent(string, options) {
  const { author } = options;
  const content = `/*
* Author: ${author} 
* Date: ${getNowFormatDate()} 
* Desc: ${string} services 
*/
import { get, post } from 'utils/request';

/** 接口名称
* @param {string} id -所属信息的id
*/
export const cityDataShow = param => get('/topics', param);

/** 接口名称
* @param {string} id -所属信息的id
*/
export const cityDataShowPost = param => post('/epidemic/cityDataShowPost', param);
`;
  return content;
}

// models 内容
function modelsContent(fileName, options) {
  const { author } = options;
  const content = `/*
* Author: ${author} 
* Date: ${getNowFormatDate()} 
* Desc: ${fileName} models 
*/
import * as ${fileName}Api from '../services/${fileName}.js';

const initData = {
  myData: [], // 数据
};

export default {
  namespace: '${fileName}',
  state: {
    ...initData,
  },

  effects: {
    *cityDataShow({ payload }, { call, put }) {
      const result = yield call(${fileName}Api.cityDataShow, payload);
      const { errCode, data } = result;
      if (errCode === 0) {
        yield put({
          type: 'update',
          payload: {
            myData: data || [],
          },
        });
      }
      return result;
    },
  },
  reducers: {
    update: (state, { payload }) => ({
      ...state,
      ...payload,
    }),
    clearData: () => ({ ...initData }),
  },
};
`;
  return content;
}

module.exports = {
  indexContent,
  mapPropsContent,
  pContent,
  lessContent,
  servicesContent,
  modelsContent,
}
