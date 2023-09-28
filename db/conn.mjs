import { Sequelize } from "sequelize";

const sequelize = new Sequelize('toughts', 'root', '', {
        host: 'localhost',
        dialect: 'mysql',
})

try {
        sequelize.authenticate()
        console.log('Conexão com o banco de dados estabelecida com sucesso.')
} catch (error) {
        console.log(`Não foi possível conectar: ${error}`)
}

export default sequelize;