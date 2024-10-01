import request from '../../utils/request'

// 枚举出接口变量
enum API{
    Signin = '/signin'
}
// 登录

export const reqSignin = (username: string, password: string) => request.post(API.Signin, { username:username, password:password })
