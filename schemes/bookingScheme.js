const { DataTypes, Model } = require("sequelize")
const sequelize = require('../dbConfig')
class Booking extends Model { }
Booking.init({
    date: {
        type: DataTypes.RANGE(DataTypes.DATE),
        // allowNull: false
    },
    doctor: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    patient: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: "Upcoming"
    },
    prescription: {
        type: DataTypes.STRING
    },
    doctor_notes: {
        type: DataTypes.STRING
    },
    feedback: {
        type: DataTypes.STRING
    },
    rating: {
        type: DataTypes.INTEGER
    },
},
    {
        sequelize, modelName: "Booking"
    }
)
async function createTable() {
    try {
        await Booking.sync({ alter: true })
        console.log("Booking Table created Succesfully")

    }
    catch (err) {
        console.log(err)
    }
}
createTable()

module.exports = Booking