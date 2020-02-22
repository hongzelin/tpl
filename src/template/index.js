/*
 * Author: lin.zehong 
 * Date: 2020-02-22 12:29:16 
 * Desc: 各种文件模板 
 */
const { getNowFormatDate } = require('../utils');

// index 内容
function indexContent(string) {
  const content = `/*
* Author: lin.zehong 
* Date: ${getNowFormatDate()} 
* Desc: ${string} 入口 
*/
import dynamic from 'umi/dynamic';

export default dynamic({
  loader: () => import('./${string}'),
});
`;
  return content;
}

// MapProps 内容
function mapPropsContent(desc, modelName) {
  const content = `/*
* Author: lin.zehong 
* Date: ${getNowFormatDate()}
* Desc: ${desc} MapProps 
*/
export const mapStateToProps = ({ ${modelName}, loading }) => ({
  loading: loading.models.${modelName},
  myData: ${modelName}.myData,
});

export const mapDispatchToProps = dispatch => ({
  onDump(payload) {
    dispatch({
      type: '${modelName}/dump',
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
function pContent(string) {
  const content = `/*
* Author: lin.zehong 
* Date: ${getNowFormatDate()} 
* Desc: 描述
*/
import React from 'react';
import { connect } from "dva";
import { mapStateToProps, mapDispatchToProps } from "./MapProps";
import styles from './${string}.less';

const ${string} = () => {
  return (
    <div className={styles.root}>
      内容
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(${string});
`;
  return content;
}

// less 内容
function lessContent() {
  const content = `.root{
  :global{

  }
}
`;
  return content;
}

// services 内容
function servicesContent(string) {
  const content = `/*
* Author: lin.zehong 
* Date: ${getNowFormatDate()} 
* Desc: ${string} services 
*/
import { get } from 'utils/request';

/** 接口名称
* @param {string} id -所属省份信息的id
* @param {string} id -所属省份信息的id
*/
export const cityDataShow = param => get('/epidemic/cityDataShow', param);
`;
  return content;
}

// models 内容
function modelsContent(fileName) {
  const content = `/*
* Author: lin.zehong 
* Date: ${getNowFormatDate()} 
* Desc: ${fileName} models 
*/
import * as ${fileName}Api from '../services/${fileName}.js';

const initData = {
  provinceData: [], // 疫情省份数据
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
          type: 'dump',
          payload: {
            provinceData: data || [],
          },
        });
      }
      return result;
    },
  },
  reducers: {
    dump: (state, { payload }) => ({
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
