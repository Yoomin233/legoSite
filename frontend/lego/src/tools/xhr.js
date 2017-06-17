const beforeInterceptors = []
const afterInterceptors = []
const onProgressCbs = []
export function get (url, cb) {
  return new Promise((cb, reject) => {
    var xhr = new XMLHttpRequest()
    xhr.onreadystatechange = function() {
      if (this.readyState === 4 && this.status >= 200 && this.status <= 300) {
        cb(this.response)
        afterInterceptors.length && afterInterceptors.forEach(cb => cb(xhr))
      }
    }
    onProgressCbs.length && (xhr.onprogress = function (event) {
      onProgressCbs.forEach(cb => cb(event))
    })
    xhr.open('GET', url, true)
    beforeInterceptors.length && beforeInterceptors.forEach(cb => cb(xhr))
    xhr.send(null)
  })
}
export function post (url, data={}, cb=() => {}) {
  return new Promise((cb, reject) => {
    var xhr = new XMLHttpRequest()
    xhr.onreadystatechange = function() {
      if (this.readyState === 4 && this.status >= 200 && this.status <= 300) {
        cb(this.response)
        afterInterceptors.length && afterInterceptors.forEach(cb => cb(xhr))
      }
    }
    onProgressCbs.length && (xhr.onprogress = function (event) {
      onProgressCbs.forEach(cb => cb(event))
    })
    xhr.open('POST', url)
    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    beforeInterceptors.length && beforeInterceptors.forEach(cb => cb(xhr))
    let sendData = ''
    for (let i in data) {
      sendData += `${i}=${data[i]}&`
    }
    xhr.send(sendData.slice(0, sendData.length - 1))
  })
}

export function put (url, data={}, cb=() => {}) {
  return new Promise((cb, reject) => {
    var xhr = new XMLHttpRequest()
    xhr.onreadystatechange = function() {
      if (this.readyState === 4 && this.status >= 200 && this.status <= 300) {
        cb(this.response)
        afterInterceptors.length && afterInterceptors.forEach(cb => cb(xhr))
      }
    }
    onProgressCbs.length && (xhr.onprogress = function (event) {
      onProgressCbs.forEach(cb => cb(event))
    })
    xhr.open('PUT', url)
    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    beforeInterceptors.length && beforeInterceptors.forEach(cb => cb(xhr))
    let sendData = ''
    for (let i in data) {
      sendData += `${i}=${data[i]}&`
    }
    xhr.send(sendData.slice(0, sendData.length - 1))
  })
}

export default {
  get,
  post,
  beforeInterceptors,
  afterInterceptors,
  onProgressCbs
}
