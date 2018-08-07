import {fetch} from './config.js';
export default {
  //登录
  Login(params) {return fetch('v1/system/sub_menu_list', params,'post')},
}