import md5 from 'blueimp-md5'
import config from './config.js'
import { sendAjax } from './tools.js'

let {username, password} = document.querySelector('form')
document.querySelector('button.login').addEventListener('click', (e) => {
  e.preventDefault()
  if (!username.value || !password.value) {
    return alert('请填写用户名/密码先!')
  }
  sendAjax({
    url: `${config.rootURL}/users/login`,
    method: 'POST',
    headers: {'Content-type': 'application/x-www-form-urlencoded'},
    data: `username=${username.value}&password=${md5(password.value)}`,
    cb: (resp) => {
      let result = JSON.parse(resp.responseText)
      if (result.code !== 1) {
        return alert(result.message)
      } else {
        alert('登录成功!')
        // 前往网站根目录
        location.href = location.origin
      }
    }
  })
})
document.querySelector('button.register').addEventListener('click', (e) => {
  e.preventDefault()
  location.href = `${/^(.*)login\.html/.exec(location.href)[1]}register.html`
})
