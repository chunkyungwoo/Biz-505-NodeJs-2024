import express from "express";
import DB from "../models/index.js";
import moment from "moment";
import { upLoad } from "../modules/file_upload.js";

const MEMO = DB.models.tbl_memo;
const router = express.Router();

router.get("/", async (req, res) => {
  const today = moment().format("YYYY-MM-DD");
  const time = moment().format("hh:mm");

  try {
    const rows = await MEMO.findAll();
    res.render("index", { MEMO: rows, today, time });
  } catch (error) {
    return res.json(error);
  }
});

router.get("/:m_seq/detail", async (req, res) => {
  const m_seq = req.params.m_seq;
  const rows = await MEMOS.findByPk(m_seq);
  await rows.destroy();
  return res.redirect("/");
});

router.post("/update/:seq", upLoad.single("m_image"), async (req, res) => {
  const seq = req.params.seq;
  const imageFile = req.file;
  req.body.m_image = imageFile?.filename;
  req.body.m_author = "ckw2434@naver.com";

  await MEMOS.update(req.body, { where: { m_seq: seq } });
  return res.redirect("/");
});
router.post("/", upLoad.single("m_image"), async (req, res) => {
  const imageFile = req.file;
  const m_seq = req.query.seq;

  req.body.m_image = imageFile?.filename;
  req.body.m_author = "ckw2434@naver.com";
  if (m_seq) {
    await MEMOS.update(req.body, { where: { m_seq } });
  } else {
    await MEMOS.create(req.body);
  }
  return res.redirect("/");
});

router.get("/:seq/get", async (req, res) => {
  const seq = req.params.seq;
  const row = await MEMOS.findByPk(seq);
  return res.json(row);
});
router.get("/get_new_date", async (req, res) => {
  const toDate = moment().format("YYYY-MM-DD");
  const toTime = moment().format("hh-mm:ss");

  return res.json({ toDate, toTime });
});

export default router;
