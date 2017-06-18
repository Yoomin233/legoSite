const config = {
  development: {
    rootURL: 'http://47.94.196.246:3080'
  },
  production: {
    rootURL: 'http://47.94.196.246:3080'
  }
}

console.log(`current env = ${process.env.NODE_ENV}`)

export default config[process.env.NODE_ENV]
