import axios from '../public/js/axios.js'
import { notification, message } from 'antd';

export default {
  namespace: 'main',
  state: {},
  subscriptions: {
    Init({ dispatch, history }) {
      history.listen((location) => {
        console.log(location)
        if (location.pathname === '/main') {
          if (location.state) {

          } else {
            dispatch({//初始化列表
              type: 'fetchInit',
              payload: {
                start: 0,
                limit: 10,
                keyWords: null,
                dir: 'DESC',
                sort: 'StartDT'
                // current: 0
              }
            });
          }
        }
      });
    },
  },

  effects: {
    *fetchInit({ payload }, { call, put, select }) {  //首次加载
      axios({
        method: 'post',
        url: `FormTemplate/GetForModify`,
        data: payload
      })
        .then(function (res) {
          if (res.name) {
            message.success('载入成功！');
            dispatch({
              type: 'formBuilder/loadForm',
              ...res
            })
          }
          else {
            message.error('错误：' + data.msg, 30);
            dispatch({
              type: 'formBuilder/loadFailed',
            })
            // yield put({ type: 'loadFailed' });
          }
        })
        .catch(function (err) {
          console.log(err);
        });
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
