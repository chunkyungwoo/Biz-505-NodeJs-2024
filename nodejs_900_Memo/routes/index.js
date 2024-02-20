import express from "express";
import DB from "../models/index.js";
import moment from "moment";
import { Op } from "sequelize";
import { upLoad } from "../modules/file_upload.js";

const MEMO = DB.models.tbl_memo;
const router = express.Router();

router.get("/", async (req, res) => {
  const today = moment().format("YYYY-MM-DD");
  const time = moment().format("hh:mm");

  const rows = await MEMO.findAll();
  res.render("layout", { MEMO: rows, today, time });
});

router.get("insert", async (req, res) => {
  return res.render("input");
});

router.post("/insert", upLoad.single("m_image"), async (req, res) => {
  const m_image = req.file.filename;
  req.body.m_seq = 0;
  req.body.m_image = m_image;
  req.body.m_author = "ckw2434@naver.com";
  try {
    await MEMO.create(req.body);
    return res.redirect("/memo");
  } catch (error) {
    return res.json(error);
  }
});
router.get("/:m_seq/detail", async (req, res) => {
  const m_seq = req.params.m_seq;
  const data = await MEMO.findByPk(m_seq);
  return res.render("detail", { item: data });
});
router.get("/:m_seq/delete", async (req, res) => {
  const m_seq = req.params.m_seq;
  await MEMO.delete({ where: { m_seq } });
  return res.redirect("/");
});
router.get("/:m_seq/update", async (req, res) => {
  const m_seq = req.params.m_seq;
  const data = await MEMO.findByPk(m_seq);
  return res.render("input", { data });
});
export default router;
