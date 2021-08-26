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
