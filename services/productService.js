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

    static async updateProduct(productId, prodName, prodDesc, catId, price){
        try {
            var [updateResponse] = await productModel.updateProduct(productId, prodName, prodDesc, catId, price);
            if(updateResponse !== undefined && updateResponse.length > 0 && updateResponse[0].length > 0){
                return {status: true, message: '', result: 'success'};
            }
            return {status: false, message: 'Failed to update product info'};
                
        } catch (error) {
            return {status: false, message: error.message};
        }
    }

}

module.exports = productService;