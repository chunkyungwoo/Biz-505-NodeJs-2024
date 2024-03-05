import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _tbl_check from  "./tbl_check.js";
import _tbl_member from  "./tbl_member.js";
import _tbl_memos from  "./tbl_memos.js";

export default function initModels(sequelize) {
  const tbl_check = _tbl_check.init(sequelize, DataTypes);
  const tbl_member = _tbl_member.init(sequelize, DataTypes);
  const tbl_memos = _tbl_memos.init(sequelize, DataTypes);


  return {
    tbl_check,
    tbl_member,
    tbl_memos,
  };
}
