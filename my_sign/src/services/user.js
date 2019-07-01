import request from '../utils/request';

// 登陆接口
export let login = code=>{
    return request.post('/user/code2session', {
      code
    })
  }