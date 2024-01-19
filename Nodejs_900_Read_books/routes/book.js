import express from "express";
import DB from "../config/mysql.js";
const router = express.Router();
const dbConn = DB.init();

router.get("/", (req, res) => {
  res.render("./book/list");
});
router.get("/insert", (req, res) => {
  res.render("book/input.pug");
});
router.post("/insert", (req, res) => {
  const b_isbn = req.body.b_isbn;
  const b_title = req.body.b_title;
  const b_author = req.body.b_author;
  const b_publisher = req.body.b_publisher;
  const b_price = req.body.b_price;
  const b_discount = req.body.b_discount;
  const b_pubdate = req.body.b_pubdate;
  const params = [b_isbn, b_title, b_author, b_publisher, b_price, b_discount, b_pubdate];
  const sql = " INSERT INTO tbl_book(b_isbn, b_title, b_author, b_publisher, b_price, b_discount, b_pubdate) " + " VALUES( ?,?,?,?,?,?,? )";

  dbConn.query(sql, params, (err, result) => {
    if (err) {
      return res.json(err);
    } else {
      return res.redirect("/book/");
    }
  });
});
router.post("/:b_isbn/update", (req, res) => {
  const b_isbn = req.params.b_isbn;
  const b_title = req.body.b_title;
  const b_author = req.body.b_author;
  const b_publisher = req.body.b_publisher;
  const b_price = req.body.b_price;
  const b_discount = req.body.b_discount;
  const b_pubdate = req.body.b_pubdate;

  const params = [b_isbn, b_title, b_author, b_publisher, b_price, b_discount, b_pubdate];
  const sql =
    " UPDATE tbl_book " +
    " SET b_title = ?, " +
    " b_author = ?, " +
    " b_publisher = ?, " +
    " b_price = ?, " +
    " b_discount = ?, " +
    "b_pubdate = ?, " +
    " WHERE b_isbn = ? ";
  dbConn.query(sql, params, (err, result) => {
    if (err) {
      return res.json(err);
    } else {
      return res.redirect(`/book/${b_isbn}/detail`);
    }
  });
});

export default router;
