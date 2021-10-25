const  express = require('express');
const productController = require('../controller/productController');
const isAuth = require('../middleware/is-auth');

var router = express.Router();

router.get('/list', (req, res) => {
    res.json({status: true, message: '', response: ['dresses', 'Ornaments', 'Shoes' ]})
});

router.get('/update', (req, res) => {
    res.json({status: true, message: '', response: 'This product has been updated successfully'})
});

/**
 * @typedef Product
 * @property {integer} productId
 * @property {string} productName.required - name of the product
 * @property {string} prodcutDescription - Some description for product
 * @property {string} category - category of the product
 * @property {string} price.required - price of the product product
 */

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
 * @route post /api/v1/product/update
 * @group Product - update product into database
 * @param {Product.model} Product.body.required - product information
 * @produces application/json application/xml
 * @consumes application/json application/xml
 * @returns {Array.<object>} 200 - An array of user info
 * @returns {Error}  default - Unexpected error
 */

 router.post('/update', productController.updateProductItem);



 /**
 * This function comment is parsed by doctrine
 * @route get /api/v1/product/category
 * @group Product - Get active product(s) from database
 * @param {string} id.query.required - Category Id
 * @produces application/json application/xml
 * @consumes application/json application/xml
 * @returns {Array.<object>} 200 - An array of user info
 * @returns {Error}  default - Unexpected error
 */

 router.get('/category',  productController.getCategory);
 router.get('/category/:id', productController.getCategory);


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
router.get('/', isAuth, productController.getProduct);
router.get('/:id', isAuth, productController.getProduct);

module.exports = router;