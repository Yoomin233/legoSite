const config = {
  development: {
    rootURL: 'http://localhost:3080'
  },
  production: {
    rootURL: 'http://localhost:3080'
  }
}

console.log(`current env = ${process.env.NODE_ENV}`)

export default config[process.env.NODE_ENV]
