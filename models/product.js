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
                id as productId,
                product_name as productName,
                Product_description as prodcutDescription,
                categoryId as category,
                product_price as price                
            from product`, []);
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

}

module.exports = productModel;