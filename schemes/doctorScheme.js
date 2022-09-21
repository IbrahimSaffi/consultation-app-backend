const { DataTypes, Model } = require("sequelize");
const sequelize = require('../dbConfig');


class Doctor extends Model { }
Doctor.init({
    // Model attributes are defined here
    //Ids might need next version of sequize
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    qualifcations: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue:[]
    },
    experience: {
        type: DataTypes.INTEGER,
    },
    hospital: {
        type: DataTypes.STRING,
    },
    location: {
        type: DataTypes.STRING,
    },
    specialities: {
        type: DataTypes.ARRAY(DataTypes.STRING()),
    },
    cost: {
        type: DataTypes.INTEGER,
    },
    ratings: {
        type: DataTypes.INTEGER,
    },
    //Could be range or JSON
    availableSlots: {
        type: DataTypes.ARRAY(DataTypes.RANGE(DataTypes.DATE)),
        defaultValue:[]
    },
    // bookedSlots: {
    //     type: DataTypes.ARRAY(DataTypes.RANGE(DataTypes.TIME)),
    // },

},
    {
        sequelize, modelName: "Doctor"
    }
)
// const doctor = define('doctor', );

async function createTable(){
  await  Doctor.sync({ alter: true })

}
createTable()
// const doctorModel = sequelize.models.Doctor

module.exports = Doctor
