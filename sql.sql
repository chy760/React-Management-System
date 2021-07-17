-- DB사용
use management;

-- 테이블 생성
CREATE TABLE CUSTOMER_NEW(
	id INT PRIMARY KEY AUTO_INCREMENT,
    image VARCHAR(1024),
    name VARCHAR(64),
    birthday VARCHAR(64),
    gender VARCHAR(64),
    job VARCHAR(64)
) DEFAULT CHARACTER SET UTF8 COLLATE utf8_general_ci;

-- 테이블 수정
ALTER TABLE CUSTOMER_NEW ADD createDate DATETIME;
ALTER TABLE CUSTOMER_NEW ADD isDeleted INT;

-- update 쿼리
UPDATE CUSTOMER_NEW SET createDate = NOW();
UPDATE CUSTOMER_NEW SET isDeleted = 0;

-- insert 쿼리
INSERT INTO customer_new VALUE (1, 'http://placeimg.com/64/64/1', '나동빈', '961222', '남자', '대학생');
INSERT INTO customer_new VALUE (2, 'http://placeimg.com/64/64/2', '홍길동', '971222', '여자', '직장인');
INSERT INTO customer_new VALUE (3, 'http://placeimg.com/64/64/3', '동빈나', '981222', '남자', '프로그래머');
INSERT INTO customer_new VALUE (4, 'http://placeimg.com/64/64/4', '유성룔', '991222', '여자', '영업사원');

-- select 쿼리
SELECT * FROM management.customer_new;




