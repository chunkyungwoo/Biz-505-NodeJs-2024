import { Model } from "sequelize";
export default class tbl_member extends Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        m_id: {
          type: DataTypes.STRING(20),
          allowNull: false,
          primaryKey: true,
        },
        m_password: {
          type: DataTypes.STRING(125),
          allowNull: false,
        },
        m_email: {
          type: DataTypes.STRING(100),
          allowNull: true,
        },
        m_name: {
          type: DataTypes.STRING(20),
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: "tbl_member",
        timestamps: false,
        indexes: [
          {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [{ name: "m_id" }],
          },
        ],
      }
    );
  }
}
