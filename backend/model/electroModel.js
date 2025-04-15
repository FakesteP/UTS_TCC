import { Sequelize } from "sequelize";
import db from "../config/database.js";

const Electro = db.define(
  "electros",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    device_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    energy_consumption: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    timestamp: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    },
  },
  {
    freezeTableName: true,
  }
);

export default Electro;

(async () => {
  await db.sync();
})();
