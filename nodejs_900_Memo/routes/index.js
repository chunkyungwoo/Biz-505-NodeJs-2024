import express from "express";
import DB from "../models/index.js";
import moment from "moment";
import { Op } from "sequelize";

const MEMO = DB.models.tbl_memo;
const router = express.Router();

router.get("/", async (req, res) => {
  const today = moment().format("YYYY-MM-DD");
  const time = moment().format("hh:mm");
  const m_search = req.query.m_search || "";
  const sort = req.query.sort || "m_seq";
  const order = req.query.order || "ASC";

  const rows = await MEMO.findAll({
    where: {
      [Op.or]: [{ m_seq: `${m_search}` }],
    },
    order: [[sort, order]],
  });
  return res.render("layout", { MEMO: rows, m_search, today, time });
});
export default router;
