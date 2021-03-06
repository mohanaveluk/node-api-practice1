-- SELECT * FROM plamofashon.product;

-- proc_get_product
DROP procedure IF EXISTS `proc_get_product`;
DELIMITER $$
CREATE PROCEDURE `proc_get_product`(
	IN __prodId bigint(20),
    IN __catId  bigint(20)
)
BEGIN
	
    select * from product where id = __prodId;
    
END$$
DELIMITER ;

-- call proc_get_product (1026);

-- proc_update_product
DROP procedure IF EXISTS `proc_update_product`;
DELIMITER $$
CREATE PROCEDURE `proc_update_product`(
	IN __prodId bigint(20),
    IN __prodName varchar(100),
    IN __product_description varchar(500),
    IN __catId  varchar(20),
    IN __productPrice  bigint(20)
)
BEGIN
	
    DECLARE __tempAffectedRow int(1) default 0;
    DECLARE __tempRespose varchar(10) default '';
    
    IF __prodId > 0 THEN
        SET __tempAffectedRow = __prodId;
		update product set 
			product_name = __prodName
			,Product_description = __product_description
			,categoryId = __catId
			,product_price = __productPrice
        Where id = __prodId;
        SET __tempRespose = 'success1';
    ELSE
		insert into product (
			product_name
			,Product_description
			,categoryId
			,product_price
        ) values (
			__prodName
            ,__product_description
            ,__catId
            ,__productPrice
        );
         SET __tempAffectedRow = last_insert_id();
         SET __tempRespose = 'success1';
    END IF;
    
    select __tempAffectedRow as responseId, __tempRespose as response;
    
END$$
DELIMITER ;

-- call proc_update_product(101, 'Keyboard- wirelesss', '', 'Electronics', 120)



-- proc_get_category
DROP procedure IF EXISTS `proc_get_category`;
DELIMITER $$
CREATE PROCEDURE `proc_get_category`(
    IN __catId  bigint(20)
)
BEGIN
	
    IF __catId <= 0 THEN
		select 
			id,
            category_name 
        from productcategory order by category_name;
    ELSE
		select 
        	id,
            category_name 
		from productcategory where id = __catId order by category_name;
    END IF;
    
END$$
DELIMITER ;



-- proc_update_user
DROP procedure IF EXISTS `proc_update_user`;
DELIMITER $$
CREATE PROCEDURE `proc_update_user`(
    IN __userid  bigint(11),
    IN __guid  varchar(1000),
    IN __username  varchar(255),
    IN __password  text,
    IN __firstname  varchar(255),
    IN __lastname  varchar(255),
    IN __mobile  varchar(10),
    IN __createdon varchar(30)
  
)
BEGIN

    DECLARE __tempAffectedRow int(1) default 0;
	DECLARE __tempRespose varchar(10) default '';

    IF __userid <= 0 THEN
		insert into user (
			org_id
			,username
			,password
			,firstname
			,lastname
			,phone
            ,createdon
		) values (
			1
			,__username
			,__password
			,__firstname
			,__lastname
			,__mobile
            ,__createdon			
		);
		SET __tempAffectedRow = last_insert_id();
        SET __tempRespose = 'success';
    ELSE
		update user set 
			password = __password
			,firstname = __firstname
			,lastname = __lastname
			,phone = __mobile
			,createdon = __createdon
		where id = __userid;
        SET __tempAffectedRow = __userid;
        SET __tempRespose = 'success';
    END IF;
    select __tempAffectedRow as responseId, __tempRespose as response;
    
    
END$$
DELIMITER ;



-- proc_get_user
DROP procedure IF EXISTS `proc_get_user`;
DELIMITER $$
CREATE PROCEDURE `proc_get_user`(
    IN __username  varchar(255)
)
BEGIN
	
	select 
		id
		,org_id
		,username
		,password
		,firstname
		,lastname
		,phone
		,roleid
		,profile_picture_url
		,createdon
		,updatedon
		,updatedby
	from user
	where username = __username and active = 1 order by id limit 1;

    
END$$
DELIMITER ;