import express from "express";
import DB from "../models/index.js";
import { upLoad } from "../modules/file_upload.js";

const MEMO = DB.models.tbl_memo;
const router = express.Router();

router.post("/insert", upLoad.single("m_image"), async (req, res) => {
  let mCode = req.body.m_seq;
  if (mCode === "000") {
    const rows = await MEMO.findAll({
      order: [["m_seq", "DESC"]],
      limit: 1,
    });
    mCode = rows[0].m_seq;
    mCode = makeMCodenew(mCode);
    req.body.m_seq = mCode;
  }
  const file = req.file;
  if (file) {
    req.body.m_image_name = file.filename;
    req.body.m_image_origin_name = file.originalname;
  }
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
