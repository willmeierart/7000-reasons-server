module.exports = {

  development: {
    client: 'pg',
    connection:'postgres://localhost/saiz'
  },
  test: {
    client: 'pg',
    connection: 'postgres://localhost/test-saiz'
  },
  production: {
      client: 'pg',
      connection: process.env.DATABASE_URL + '?ssl=true'
  }


}
