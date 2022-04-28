const dotenv = require('dotenv').config();

module.exports = {
    PORT: process.env.PORT || 8080,
    TIPO_DB: process.env.TIPO_DB
}