const  express = require('express');
const productController = require('../controller/productController');

var router = express.Router();

router.get('/list', (req, res) => {
    res.json({status: true, message: '', response: ['dresses', 'Ornaments', 'Shoes' ]})
});

router.get('/update', (req, res) => {
    res.json({status: true, message: '', response: 'This product has been updated successfully'})
});

/**
 * This function comment is parsed by doctrine
 * @route get /api/v1/product/productlist
 * @group Product - Get active product(s) 
 * @produces application/json application/xml
 * @consumes application/json application/xml
 * @returns {Array.<object>} 200 - An array of user info
 * @returns {Error}  default - Unexpected error
 */

router.get('/productlist', productController.getProductList);

/**
 * This function comment is parsed by doctrine
 * @route get /api/v1/product/all
 * @group Product - Get active product(s) from database
 * @produces application/json application/xml
 * @consumes application/json application/xml
 * @returns {Array.<object>} 200 - An array of user info
 * @returns {Error}  default - Unexpected error
 */

 router.get('/all', productController.getProducts);



/**
 * This function comment is parsed by doctrine
 * @route get /api/v1/product
 * @group Product - Get active product 
 * @param {string} productId.query.required
 * @produces application/json application/xml
 * @consumes application/json application/xml
 * @returns {Array.<object>} 200 - An array of user info
 * @returns {Error}  default - Unexpected error
 */

//router.get('/', productController.getProductItem);
//router.get('/:id', productController.getProductItem);
router.get('/', productController.getProduct);
router.get('/:id', productController.getProduct);


module.exports = router;