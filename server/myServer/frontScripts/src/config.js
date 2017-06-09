const config = {
  development: {
    rootURL: 'http://192.168.27.110:3080'
  },
  production: {
    rootURL: 'http://192.168.27.110:3080'
  }
}

console.log(`current env = ${process.env.NODE_ENV}`)

export default config[process.env.NODE_ENV]
