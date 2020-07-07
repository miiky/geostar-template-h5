/*
 * @Description: 微信授权相关
 * @Author: miiky_yang
 * @Date: 2020-06-28 14:32:22
 * @LastEditors: miiky_yang
 * @LastEditTime: 2020-06-28 14:33:11
 */

let getAccessToken = () => {
  // 判断是否缓存有
  return new Promise((resolve, reject) => {
    var access_token = localStorage.getItem("accessToken");
    var expires = localStorage.getItem("expires_accessToken");
    if (expires > new Date().getTime() - 2000) {
      resolve(access_token)
      return;
    }
    let accessTokenUrl = 'https://qyapi.weixin.qq.com/cgi-bin/gettoken?corpid=' + this.groupId + "&corpsecret=" + this.secretId;

    // fetch(accessTokenUrl, { method: "GET" })
    fetch(this.porxyUrl, {
      method: "POST",
      body: JSON.stringify({
        method: "GET",
        url: accessTokenUrl
      })
    }).then(resp => {
      return resp.json()
    }).then(data => {
      if (data.errcode == 0) {
        //保存本次获取的accessToken
        localStorage.setItem("accessToken", data.access_token);
        localStorage.setItem("expires_accessToken", new Date().getTime() + data.expires_in * 1000);
        resolve(data.access_token);
      }
    }).catch(data => {
      reject();
    })
  });
}