module.exports = {
    port: process.env.PORT || 8081,
    db: {
        database: process.env.DB_NAME || 'carcheck',
        user: process.env.DB_USER || 'carcheck',
        password: process.env.DB_PASSWORD || 'carcheck',
        options: { 
            dialect: process.env.DIALECT || 'sqlite',
            host: process.env.HOST || 'localhost',
            storage: './carcheck.sqlite'
        }
    }
}