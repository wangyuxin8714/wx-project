import request from '../utils/request';

// 登陆接口
export let login = code=>{
    return request.post('/user/code2session', {
      code
    })
}

//添加面试
export let addview = data=>{
  return request.post('/sign', data)
}

//获取列表
export let getview = (data)=>{
  return request.get('/sign',data)
}

//获取面试详情
export let getdetail = id=>{
  return request.get(`/sign/${id}`)
}

//更新面试详情
export let updatedetail = (id,params)=>{
  return request.put(`/sign/${id}`,params)
}


// 解密用户数据
export let encryptData = params=>{
  return request.post('/user/decrypt', params)
}