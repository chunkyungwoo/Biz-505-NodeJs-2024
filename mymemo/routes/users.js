import express from "express";
import DB from "../models/index.js";
const router = express.Router();

const USER = DB.models.tbl_member;

/* GET users listing. */
router.get("/", async (req, res, next) => {
  res.send("respond with a resource");
});
// 로그인

router.get("/login", (req, res) => {
  res.render("user/login");
});
// 오류 방지
let crypto;
try {
  crypto = await import("node:crypto");
} catch (error) {
  console.error(`Crypto 모듈을 사용할수없음 ${error}`);
}

router.get("/login", async (req, res) => {
  const message = req.query.fail;
  res.render("user/login", { NEED: message });
});

router.post("/login", async (req, res) => {
  const id = req.body.m_id;
  const password = req.body.m_password;

  const result = await USER.findByPk(id);
  if (!result) {
    return res.redirect(`/login?fail=${LOGIN_MESSAGE.USER_NOT}`);
  } else if (result.m_id === id) {
    const hashAlgorithm = await crypto.createHash("sha512");
    const hashing = await hashAlgorithm.update(password);
    const hashPassword = hashing.digest("base64");
    if (result.m_password === hashPassword) {
      req.session.user = result;
      return res.redirect("/");
    } else {
      return res.redirect(`/login?fail=${LOGIN_MESSAGE.PASS_WORNG}`);
    }
  }
});
const LOGIN_MESSAGE = {
  USER_NOT: "사용자 ID없음",
  PASS_WORNG: "비밀번호 오류",
  NEED_LOGIN: "로그인 필요",
};
// 로그아웃
router.get("/logout", (req, res) => {
  req.session.destroy();
  return res.redirect("/");
});

// 회원가입

router.get("/join", async (req, res) => {
  res.render("user/join");
});

router.get("/join", async (req, res) => {
  const message = req.query.fail;
  res.render("user/join", { NEED: message });
});

// 데이터베이스에서 모든 사용자를 조회하고
// 첫번째로 가입하는 아이디를 어드민으로 설정
// 데이터베이스에 저장하기전에 해싱해서 보안강화
router.post("/join", async (req, res) => {
  const rows = await USER.findAll();
  if (rows.length > 0) {
    req.body.m_role = "USER";
  } else {
    req.body.m_role = "ADMIN";
  }
  const password = req.body.m_password;
  const hashAlgorithm = await crypto.createHash("sha512");
  const hashing = await hashAlgorithm.update(password);
  const hashPassword = await hashing.digest("base64");
  req.body.m_password = hashPassword;
  const result = await USER.create(req.body);
  return res.redirect("/users/login");
});

router.get("/:m_id/check", async (req, res) => {
  const m_id = req.params.m_id;
  const row = await USER.findByPk(m_id);
  if (row) {
    return res.json({ MESSAGE: "FOUND" });
  } else {
    return res.json({ MESSAGE: "NOT FOUND" });
  }
});
export default router;
