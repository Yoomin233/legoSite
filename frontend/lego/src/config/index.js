const config = {
  development: {
    rootURL: 'http://localhost:3080'
  },
  production: {
    rootURL: 'http://localhost:3080'
  }
}

export default config[process.env.NODE_ENV]
