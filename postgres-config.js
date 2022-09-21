//Not needed anymore delete later
var pg = require('pg')

var conString = "postgres://ghgrtgri:mRv4Tr-HZZydR74B5u6IoLfVf07mMYqb@jelani.db.elephantsql.com/ghgrtgri"

var client = new pg.Client(conString);
client.connect(function(err){
    if(err){
        return console.error("Error connecting to Database")
    }
    else{
     console.log("Connected succesfully")    
    }
})
module.exports = client