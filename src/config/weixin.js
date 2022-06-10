// 企业微信相关常量
const appid = window._CONFIG.WORK_WX_APPID // 企业微信 appid
const homeUrlEncode = encodeURIComponent(window._CONFIG.APP_FULL_URL)
const loginUrlEncode = encodeURIComponent(window._CONFIG.APP_FULL_URL + '/login')

// 组织企业微信-主页url
export const homeUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${homeUrlEncode}&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect`
// 组织企业微信-登录页url
export const loginUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${loginUrlEncode}&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect`
