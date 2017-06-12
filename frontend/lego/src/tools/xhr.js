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
export default {
  get,
  beforeInterceptors,
  afterInterceptors,
  onProgressCbs
}
