import { DataTypes } from "sequelize";
import db from '../db/conn.mjs'

const User = db.define('User', {
        name: {
                type: DataTypes.STRING,
                required: true,
        },
        email: {
                type: DataTypes.STRING,
                required: true,
        },
        password: {
                type: DataTypes.STRING,
                required: true,
        }
})

export default User