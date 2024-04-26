const asyncHandler = require('../middleware/asyncHandler');
const Product = require('../models/productModel')


// @desc Fetch all products
// @route GET /api/products
// @access Public
const getProducts = asyncHandler(async (req,res) => {

    const pageSize = process.env.PAGINATION_LIMIT;
    const page = Number(req.query.pageNumber) || 1;
    const  keyword = req.query.keyword ?  {name: {$regex: req.query.keyword, $options:'i'}} : {};
    const count = await Product.countDocuments({...keyword});


    const products = await Product.find({...keyword}).limit(pageSize).skip(pageSize*(page-1));
    res.json({products,page,pages:Math.ceil(count/pageSize)});

})


// @desc Fetch a product
// @route GET /api/products/:id
// @access Public
const getAllProducts = asyncHandler(async(req,res) =>{
    const product = await Product.findById(req.params.id) 
    if(product){
        
        return res.json(product);
    }
    res.status(404)
    throw new Error('Resource not found!')
})

// @desc Create a products
// @route POST /api/products
// @access Private/Admin
const createProduct = asyncHandler(async (req,res) => {
    const product = new Product({
        name: 'Sample name',
        proce: 0,
        user: req.user._id,
        image:'/images/sample.jpg',
        brand:'Sample brand',
        category: 'Sample Category',
        countInStock: 0,
        numReviews:0,
        description:'Sample desc' 
    })

    const createdProduct = await product.save();
    res.status(201).json(createProduct);

})

// @desc Update a products
// @route PUT /api/products/:id
// @access Private/Admin
const updateProduct = asyncHandler(async (req,res) => {
    const {name, price, description, image, brand, category,countInStock} = req.body;
    const product = await Product.findById(req.params.id);
    if(product){
        product.name = name
        product.price = price
        product.description = description
        product.image = image
        product.brand = brand
        product.category = category
        product.countInStock = countInStock
        const createdProduct = await product.save();
        res.status(201).json(createProduct);

    }else{
        throw new Error("404 Product not Found")
    }

    

})


// @desc Delete a products
// @route DELETE /api/products/:id
// @access Private/Admin
const deleteProduct = asyncHandler(async (req,res) => {
    const product = await Product.findById(req.params.id);
    if(product){
        await Product.deleteOne({_id:product._id});
        res.status(201).json(createProduct);

    }else{
        throw new Error("404 Product not Found")
    }

})


// @desc Create a Review
// @route POST /api/products/:id/review
// @access Private
const createProductReview = asyncHandler(async (req,res) => {
    console.log(req.body)
    const {rating, comment} = req.body;
    const product = await Product.findById(req.params.id);
    if(product){
       const alreadyExist = product.reviews.find(
        (review) => review.user.toString() === req.user._id.toString()
       )

       if(alreadyExist){
        res.status(400);
        throw new Error('Product already Reviewed')
       }

        const newReview = {
        name: req.body.name,
        rating:Number(rating),
        comment,
        user:req.user._id
       }

       product.reviews.push(newReview);

       product.numReviews = product.reviews.length;

       product.rating = product.reviews.reduce((acc,review)=>acc+review.rating,0)/ product.reviews.length;

       await product.save();
       res.status(201).json({message:'Review added'})
    }else{
        res.status(404)
        throw new Error("404 Product not Found")
    }

})


// @desc Get top products
// @route GET /api/products/top
// @access Public
const getTopProducts = asyncHandler(async(req,res) =>{
    const products = await Product.find({}).sort({rating:-1}).limit(3); 
    if(products){
        
        return res.status(200).json(products);
    }
    res.status(404)
    throw new Error('Resource not found!')
})




module.exports = { getProducts, getAllProducts,createProduct, updateProduct, deleteProduct, createProductReview, getTopProducts }