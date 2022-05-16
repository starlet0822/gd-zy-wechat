// 企业微信相关常量
export const appid = 'wwa07d3a2cb92618de' // 企业微信 appid
const homeUrlEncode = encodeURIComponent('http://hrp.gdhtcm.com:8111/wechatWeb')
const loginUrlEncode = encodeURIComponent('http://hrp.gdhtcm.com:8111/wechatWeb/login')

// 组织企业微信-主页url
export const homeUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${homeUrlEncode}&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect`
// 组织企业微信-登录页url
export const loginUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${loginUrlEncode}&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect`
