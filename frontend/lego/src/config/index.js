const config = {
  development: {
    rootURL: 'http://192.168.27.110:3080'
  },
  production: {
    rootURL: 'http://192.168.27.110:3080'
  }
}

export default config[process.env.NODE_ENV]
