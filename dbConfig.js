const Sequelize = require('sequelize');
//Connecting to database
const sequelize = new Sequelize('postgres://ghgrtgri:mRv4Tr-HZZydR74B5u6IoLfVf07mMYqb@jelani.db.elephantsql.com/ghgrtgri', {
    define: {
        freezeTableName: true
    }
}) // 
module.exports = sequelize