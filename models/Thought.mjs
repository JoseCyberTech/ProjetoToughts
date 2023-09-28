import { DataTypes } from "sequelize";
import db from '../db/conn.mjs';
import User from './User.mjs'

const Tought = db.define('Tougth', {
        title: {
                type: DataTypes.STRING,
                allowNull: false,
                require: true
        }
})

Tought.belongsTo(User)
User.hasMany(Tought)

export default Tought