const mysql = require('mysql2');
const logger = require('../logger/logconfig');
const dbconfig = require('../config/dbconfig');

var productModel = class ProductModel {

    /***********************************************
    *
    * Get all product
    *
    ************************************************/    
    static async fetchProducts(){
        try {
            var query = mysql.format(`select 
                prod.id as productId,
                prod.product_name as productName,
                prod.Product_description as prodcutDescription,
                prod.categoryId as category,
                prod.product_price as price,
                cat.category_name                
            from product prod
            join productcategory cat on cat.id = prod.categoryId
            `, []);
            logger.info(query);
            var queryResult = await dbconfig.query(query);
            return queryResult;

        } catch (error) {
            logger.error(JSON.stringify(error));
            throw error;
        }
    }


    /***********************************************
    *
    * Get product by Id
    *
    ************************************************/     
    static async fetchProduct(productId){
        try {
            //var query = mysql.format('select * from product where id = ?', [productId]);
            var procedureQuery = mysql.format('call proc_get_product(?, ?)', [productId, 2]);
            logger.info(procedureQuery);
            var queryResult = await dbconfig.query(procedureQuery);
            return queryResult;

        } catch (error) {
            logger.error(JSON.stringify(error));
            throw error;
        }
    }

    static async updateProduct(productId, prodName, prodDesc, catId, price){
        try {
            //var query = mysql.format('select * from product where id = ?', [productId]);
            var procedureQuery = mysql.format('call proc_update_product(?, ?, ?, ?, ?)', [
                productId,
                prodName,
                prodDesc,
                catId,
                price
            ]);
            logger.info(procedureQuery);
            var queryResult = await dbconfig.query(procedureQuery);
            return queryResult;

        } catch (error) {
            logger.error(JSON.stringify(error));
            throw error;
        }
    }



    /***********************************************
    *
    * Get Category by Id
    *
    ************************************************/     
         static async fetchCategory(CategoryId){
            try {
                //var query = mysql.format('select * from product where id = ?', [productId]);
                var procedureQuery = mysql.format('call proc_get_category(?)', [CategoryId]);
                logger.info(procedureQuery);
                var queryResult = await dbconfig.query(procedureQuery);
                return queryResult;
    
            } catch (error) {
                logger.error(JSON.stringify(error));
                throw error;
            }
        }
}

module.exports = productModel;