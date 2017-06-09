import md5 from 'blueimp-md5'
import config from './config.js'
import { sendAjax } from './tools.js'

let {username, password, passwordAgain} = document.querySelector('form')

document.querySelector('button.gobackLogin').addEventListener('click', (e) => {
  e.preventDefault()
  history.back()
})
document.querySelector('button.register').addEventListener('click', (e) => {
  e.preventDefault()
  if (!username.value || !password.value || !passwordAgain.value) {
    return alert('请填写用户名/密码先!')
  } else if (password.value !== passwordAgain.value) {
    return alert('输入不一致!')
  }
  sendAjax({
    url: `${config.rootURL}/users/register`,
    method: 'POST',
    headers: {'Content-type': 'application/x-www-form-urlencoded'},
    data: `username=${username.value}&password=${md5(password.value)}`,
    cb: (resp) => {
      let result = JSON.parse(resp.responseText)
      if (result.code !== 1) {
        return alert(result.message)
      } else {
        alert('注册成功!')
        // 前往网站根目录
        location.href = location.origin
      }
    }
  })
})
