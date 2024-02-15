import express from "express";
import DB from "../models/index.js";
import { upLoad } from "../modules/file_upload.js";

const MEMO = DB.models.tbl_memo;
const router = express.Router();

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
router.get("/input", async (req, res) => {
  return res.json(22);
});
export default router;
