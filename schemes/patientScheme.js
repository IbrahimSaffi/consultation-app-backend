const { DataTypes, Model } = require("sequelize");
const sequelize = require('../dbConfig');

class Patient extends Model {}
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
      pastDiseases:{
          type:DataTypes.ARRAY(DataTypes.JSON)
      },
      bloodGroup:{
          type:DataTypes.ARRAY(DataTypes.STRING)
      },
      age:{
          type:DataTypes.INTEGER
      },
      sex:{
          type:DataTypes.STRING
      },
      weight:{
          type:DataTypes.INTEGER
      },
      // history:{
      //    type:DataTypes.ARRAY(DataTypes.JSON)
      // },
    },
    {
      sequelize, modelName: "Patient"
  }
    )
    async function createTable(){
        await  Patient.sync({ alter: true })
      
      }
      createTable()
//   // const patientModel = sequelize.models.patient
  module.exports = Patient