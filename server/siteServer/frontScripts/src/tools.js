export function sendAjax (userParams) {
  let params = Object.assign({}, {
    headers: {},
    data: null
  }, userParams)
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status >= 200 && this.status <= 300) {
          params.cb(this)
      }
  }
  xhttp.open(params.method, params.url, true)
  for (let key in params.headers) {
    if (params.headers.hasOwnProperty(key)) {
      xhttp.setRequestHeader(key, params.headers[key]);
    }
  }
  xhttp.send(params.data)
}
