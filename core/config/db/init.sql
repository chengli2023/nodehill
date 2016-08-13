delimiter //

drop PROCEDURE IF EXISTS  menu_templst//

CREATE PROCEDURE menu_templst (IN rootid INT)
BEGIN
	DECLARE Level int ;
	drop TABLE IF EXISTS menu_templst;
	CREATE TABLE menu_templst (
		id int,
		nlevel int,
		scort varchar(8000)
	);
	Set Level=0 ;
	INSERT into menu_templst SELECT id,Level,ID FROM Menu WHERE pid=rootid;
	WHILE ROW_COUNT()>0 DO
		SET Level=Level+1 ;
		INSERT into menu_templst SELECT A.id,Level,concat(B.scort,',',A.id) FROM Menu A,menu_templst B
		WHERE  A.pid=B.id AND B.nlevel=Level-1  ;
	END WHILE;
END;
//

delimiter ;