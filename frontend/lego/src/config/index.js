const config = {
  development: {
    rootURL: 'http://192.168.56.1:3080'
  },
  production: {
    rootURL: 'http://192.168.56.1:3080'
  }
}

export default config[process.env.NODE_ENV]
