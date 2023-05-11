import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const transaksi = db.define(
  "transaksi",
  {
    id_Produk: {
        type: DataTypes.INTEGER,
      },
    id_Pelanggan: {
      type: DataTypes.INTEGER,
    },
    id_Pegawai: {
      type: DataTypes.INTEGER,
    },
    total_harga: {
      type: DataTypes.INTEGER,
    },
  },
  {
    freezeTableName: true,
  }
);

export default transaksi;