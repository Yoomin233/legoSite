const config = {
  development: {
    rootURL: 'http://www.yoominhu.site',
    rootPath: '/'
  },
  production: {
    rootURL: 'http://www.yoominhu.site',
    rootPath: '/lego/'
  }
}

export default config[process.env.NODE_ENV]
