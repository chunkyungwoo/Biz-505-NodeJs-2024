USE ecountDB;
DROP DATABASE ecountDB;
DESC tbl_iolist;
-- 칼럼추가
ALTER TABLE tbl_iolist
ADD COLUMN io_delete int;

SELECT * FROM tbl_iolist;

DROP TABLE tbl_depts;

DROP TABLE tbl_iolist;

DROP TABLE tbl_products;