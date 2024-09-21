const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// insert one product
const createProduct = async (req, res) => {
    const { product_id, name, description, price, category, image_url } = req.body;
    try {
        const product = await prisma.products.create({
            data: {
                product_id,
                name,
                description,
                price,
                category,
                image_url
            }
        });
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json(err);as
    }
};

// update one product
const updateProduct = async (req, res) => {
    const { name, description, price, category, image_url } = req.body;
    const { id } = req.params; 
    const data = {};
    if (name) data.name = name;
    if (description) data.description = description;
    if (price) data.price = price;
    if (category) data.category = category;
    if (image_url) data.image_url = image_url;

    if (Object.keys(data).length === 0) {
        return res.status(400).json({ 
            status: 'error',
            message: 'No data provided for update.'
        });
    }

     try {
        const prod = await prisma.products.update({
            data,
            where: { product_id: Number(id) } // Use the ID from the URL
        });
        res.status(200).json({
            status: 'ok',
            message: `Product with ID = ${id} is updated`,
            user: prod
        });
    } catch (err) {
        if (err.code === 'P2025') {
            // Record not found
            res.status(404).json({ 
                status: 'error',
                message: `Product with ID = ${id} not found.` 
            });
        } else {
            // Handle other unexpected errors
            console.error('Update Product error: ', err);
            res.status(500).json({ 
                status: 'error',
                message: 'An unexpected error occurred.' 
            });
        }
    }
};

// delete product by product_id
const deleteProduct = async (req, res) => {
    const id = req.params.id;
  
    try {
      // ตรวจสอบว่าลูกค้ามีอยู่หรือไม่
      const existingProduct = await prisma.products.findUnique({
        where: {
          product_id: Number(id),  // ตรวจสอบว่า customer_id เป็นตัวเลข
        },
      });
  
      // ถ้าไม่พบลูกค้า
      if (!existingProduct) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      // ลบลูกค้า
      await prisma.products.delete({
        where: {
          product_id: Number(id),
        },
      });
  
      // ส่งข้อความเมื่อทำการลบสำเร็จ
      res.status(200).json({
        status: "ok",
        message: `Product with ID = ${id} is deleted`  // แสดง ID ที่ถูกลบ
      });
    } catch (err) {
      console.error('Delete Product error: ', err);  // แสดงข้อผิดพลาดใน console
      res.status(500).json({ error: err.message });  // ส่งข้อความข้อผิดพลาดกลับไปที่ client
    
    }
};

// get all products
const getProducts = async (req, res) => {
    const products = await prisma.products.findMany();
    res.json(products);
};

// get only one product by product_id
const getProduct = async (req, res) => {
    const id = req.params.id;
    try {
        const product = await prisma.products.findUnique({
            where: { product_id: Number(id) },
        });
        if (!product) {
            res.status(404).json({ 'message': 'Product not found!' });
        } else {
            res.status(200).json(product);
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

// search any product by name or category
const getProductsByTerm = async (req, res) => {
    const searchString = req.params.term;
    try {
        const products = await prisma.products.findMany({
            where: {
                OR: [
                    {
                        name: {
                            contains: searchString
                        }
                    },
                    {
                        category: {
                            contains: searchString
                        }
                    }
                ]
            },
        });
        if (!products || products.length == 0) {
            res.status(404).json({ 'message': 'Product not found!' });
        } else {
            res.status(200).json(products);
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

module.exports = {
    createProduct, getProduct, getProducts,
    updateProduct, deleteProduct, getProductsByTerm
};