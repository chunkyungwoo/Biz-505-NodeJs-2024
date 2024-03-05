import express from "express";
import moment from "moment";
import DB from "../models/index.js";
import { upLoad } from "../modules/fileupload.js";

const MEMOS = DB.models.tbl_memos;
const CHECK = DB.models.tbl_check;
const USER = DB.models.tbl_member;

const router = express.Router();

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/check", (req, res) => {
  res.render("memo/check");
});
// router.get("/memo", async (req, res) => {
//   const MEMO = await MEMOS.findAll();
//   const toDate = moment().format("YYYY-MM-DD");
//   const toTime = moment().format("HH:mm:ss");
//   try {
//     const rows = await MEMOS.findAll();
//     return res.render("memo/memo", { MEMOS: rows, toDate, toTime });
//   } catch (error) {
//     return res.json(error);
//   }
// });
// 로그인했을때 나의 아이디에 해당하는 체크리스트 가져오고
// 로그인 안했으면 에러표시 후 로그인페이지로 이동
router.get("/check", async (req, res) => {
  const user = req.session.user ? req.session.user.m_id : undefined;
  if (user) {
    const mychecklist = await CHECK.findByPk(user);
    try {
      const rows = await CHECK.findAll({
        where: {
          u_user: user,
        },
      });
      res.render("memo/check", { check: rows, mychecklist });
    } catch (error) {
      return res.json("에러");
    }
  } else {
    res.render("user/login");
  }
});
// 로그인했을때 나의 아이디에 해당하는 메모리스트 가져오고
// 로그인 안했으면 로그인페이지로 이동
router.get("/memo", async (req, res) => {
  const user = req.session.user ? req.session.user.m_id : undefined;
  const toDate = moment().format("YYYY-MM-DD");
  const toTime = moment().format("HH:mm:ss");
  try {
    const rows = await MEMOS.findAll();
  } catch (error) {
    return res.json(error);
  }
  if (user) {
    const mymemolist = await MEMOS.findByPk(user);
    try {
      const rows = await MEMOS.findAll({
        where: {
          m_author: user,
        },
      });
      res.render("memo/memo", {
        memo: rows,
        mymemolist,
        toDate,
        toTime,
      });
    } catch (error) {
      return res.json("에러");
    }
  } else {
    res.redirect("users/login");
  }
});

// 메모장 라우터

router.get("/:seq/delete", async (req, res) => {
  const m_seq = req.params.seq;
  // PK 값으로 데이터 선택하고 데이터 정보 삭제
  const rows = await MEMOS.findByPk(m_seq);
  await rows.destroy();
  return res.redirect("/memo");
});
router.post(
  "/update/:seq",
  upLoad.single("m_image"),
  async (req, res) => {
    const seq = req.params.seq;
    const imageFile = req.file;
    req.body.m_image = imageFile?.filename;
    req.body.m_author = m_id;

    await MEMOS.update(req.body, { where: { m_seq: seq } });
    return res.redirect("/memo");
  }
);
router.post("/memo", upLoad.single("m_image"), async (req, res) => {
  const imageFile = req.file;
  const m_seq = req.query.seq;
  const id = req.session.user.m_id;
  // const id = req.body.m_id;
  // const result = await USER.findByPk(id);
  req.body.m_image = imageFile?.filename;
  req.body.m_author = id;
  if (m_seq) {
    await MEMOS.update(req.body, { where: { m_seq } });
  } else {
    await MEMOS.create(req.body);
  }
  return res.redirect("/memo");
});

router.get("/:seq/get", async (req, res) => {
  const seq = req.params.seq;
  const row = await MEMOS.findByPk(seq);
  return res.json(row);
});

router.get("get_new_date", async (req, res) => {
  const toDate = moment().format("YYYY-MM-DD");
  const toTime = moment().format("hh:mm:ss");
  return res.json({ toDate, toTime });
});

//체크리스트 라우터

// 체크리스트에 번호 가져오고 정보없으면 0

export default router;
