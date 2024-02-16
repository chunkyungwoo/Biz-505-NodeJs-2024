-- 메모장프로젝트
CREATE DATABASE memoDB2;
USE memoDB2;
CREATE TABLE tbl_memos (
m_seq	BIGINT		PRIMARY KEY,
m_author	VARCHAR(25)	NOT NULL,	
m_date	VARCHAR(10)	NOT NULL,
m_time	VARCHAR(10)	NOT NULL,	
m_subject	VARCHAR(50),
m_memo	VARCHAR(400),	
m_image	VARCHAR(125)
);
SHOW TABLES;
DESC tbl_memos;
