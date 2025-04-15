import { Sequelize } from 'sequelize';

const db = new Sequelize('energy_data', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
})

export default db
