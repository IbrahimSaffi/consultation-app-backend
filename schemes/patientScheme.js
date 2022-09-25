const { DataTypes, Model } = require("sequelize");
const sequelize = require('../dbConfig');

class Patient extends Model { }
Patient.init({
  //Ids might need next version of sequize
  // Model attributes are defined here
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  pastDiseases: {
    type: DataTypes.STRING
  },
  bloodgroup: {
    type: DataTypes.STRING
  },
  age: {
    type: DataTypes.INTEGER
  },
  gender: {
    type: DataTypes.STRING
  },
  weight: {
    type: DataTypes.INTEGER
  },
  country:{
  type:DataTypes.STRING
  },
  contactnumber:{
    type:DataTypes.STRING
    },
  type: {
    type: DataTypes.STRING,
    defaultValue: "Patient"
  }
},
  {
    sequelize, modelName: "Patient"
  }
)
async function createTable() {
  try {
    await Patient.sync({ alter: true })
    console.log("Patient Table created Succesfully")
  }
  catch (err) {
    console.log(err)
  }

}
createTable()

module.exports = Patient