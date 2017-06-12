const config = {
  development: {
    rootURL: 'http://192.168.31.146:3080'
  },
  production: {
    rootURL: 'http://192.168.31.146:3080'
  }
}

export default config[process.env.NODE_ENV]
