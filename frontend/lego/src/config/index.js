const config = {
  development: {
    rootURL: 'http://47.94.196.246:3080',
    rootPath: '/'
  },
  production: {
    rootURL: 'http://47.94.196.246:3080',
    rootPath: '/lego/'
  }
}

export default config[process.env.NODE_ENV]
