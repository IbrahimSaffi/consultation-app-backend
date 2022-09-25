const { DataTypes, Model } = require("sequelize");
const sequelize = require('../dbConfig');

class Doctor extends Model { }
Doctor.init({
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
    qualifications: {
        type: DataTypes.ARRAY(DataTypes.STRING),
    },
    experience: {
        type: DataTypes.INTEGER,
        defaultValue:1
    },
    hospital: {
        type: DataTypes.STRING,
    },
    location: {
        type: DataTypes.STRING,
    },
    specialities: {
        type: DataTypes.ARRAY(DataTypes.STRING),
    },
    cost: {
        type: DataTypes.INTEGER,
        defaultValue:15,
    },
    ratings: {
        type: DataTypes.DECIMAL,
    },
    availableSlots: {
        type: DataTypes.STRING,
    },
    type:{
        type:DataTypes.STRING,
        defaultValue:"Doctor"
    }

},
    {
        sequelize, modelName: "Doctor"
    }
)

async function createTable(){
    try{
        await  Doctor.sync({ alter: true })
        console.log("Doctor Table created Succesfully")

    }
    catch(err){
        console.log(err)
    }

}
createTable()

module.exports = Doctor
