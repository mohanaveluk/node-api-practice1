const productModel = require('../models/product');

var productService = class ProductService {

    static async fetchProducts(){
        try {
            var allProducts = await productModel.fetchProducts();
            if(allProducts !== undefined && allProducts.length > 0 && allProducts[0].length >0){
                return {status: true, message: '', result: allProducts[0]};
            }
            return {status: false, message: 'No product exist at this moment'};
                
        } catch (error) {
            return {status: false, message: error.message};
        }
    }

    static async fetchProduct(productId){
        try {
            var [allProducts] = await productModel.fetchProduct(productId);
            if(allProducts !== undefined && allProducts.length > 0 && allProducts[0].length >0){
                return {status: true, message: '', result: allProducts[0]};
            }
            return {status: false, message: 'No product exist at this moment'};
                
        } catch (error) {
            return {status: false, message: error.message};
        }
    }

}

module.exports = productService;