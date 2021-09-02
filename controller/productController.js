const productService = require('../services/productService');
var productList = [
    {
        productId: 101,
        productName: 'Computer',
        category: 'Electronics',
        price: '30000'
    },

    {
        productId: 102,
        productName: 'Mobile',
        category: 'Electronics',
        price: '15000'
    },

    {
        productId: 103,
        productName: 'Car',
        category: 'Automobile',
        price: '500000'
    },

    {
        productId: 104,
        productName: 'Shoe',
        category: 'Wearable',
        price: '500'
    },
    
];

exports.getProductList = (req, res) => {

    //return res.json({status: 'true', message: '', products: ['dresses', 'Ornaments', 'Shoes', 'Digital devices', 'Phepharals', 'Computers' ]});
    //return res.json({status: 'false', message: 'No product available', products: ['dresses', 'Ornaments', 'Shoes', 'Digital devices', 'Phepharals', 'Computers' ]});

    return res.json({status: 'true', message: '', products: productList});
    
}

exports.getProducts = async (req, res) => { 
    var allproducts = await productService.fetchProducts();
    if(allproducts.status){
        return res.json({status: 'true', message: '', products: allproducts.result});
    }
    return res.json({status: 'false', message: allproducts.message});   
}


exports.getProduct = async (req, res) => { 
    productId = req.query.productId;
    var product = await productService.fetchProduct(productId);
    if(product.status){
        return res.json({status: 'true', message: '', product: product.result});
    }
    return res.json({status: 'false', message: product.message});   
}


exports.getProductItem = (req, res) => {
    productId = req.query.productId;
    var product = productList.find(p => p.productId === +productId);
    if(product === undefined){
        return res.json({status: 'false', message: `No product found for id ${productId}`});    
    }
    return res.json({status: 'true', message: '', products: product});
}


exports.updateProductItem = async (req, res) => {
    var productId = req.body.productId;
    var productName = req.body.productName;
    var productDesc = req.body.prodcutDescription === undefined ? '': req.body.prodcutDescription;
    var catId = req.body.category;
    var productPrice = req.body.price;

    if(productName !== undefined && productName === 'string') {
        return res.json({status: 'false', message: 'Product name is required'});
    }

    var saveResponse = await productService.updateProduct(productId, productName, productDesc, catId, productPrice);
    
    if(saveResponse.status){
        return res.json({status: 'true', message: '', result: saveResponse.result});
    }
    return res.json({status: 'false', message: saveResponse.message });    
    
}

exports.getCategory = async (req, res) => {

    const categoryId = req.params.id === undefined ? req.query.id: req.params.Id;

    var getResponse = await productService.fetchCategory(categoryId);
    
    // var category = [
    //     {id: 1, categorname: 'Electronics'},
    //     {id: 2, categorname: 'Wearable'},
    //     {id: 3, categorname: 'Grocery'},
    //     {id: 4, categorname: 'Automobile'},
    //     {id: 5, categorname: 'Accesssories'},
    // ];

    // return res.json({status: 'true', message: '', result: category});
    
    if(getResponse.status){
        return res.json({status: 'true', message: '', result: getResponse.result});
    }
    return res.json({status: 'false', message: saveResponse.message });    
    
}
