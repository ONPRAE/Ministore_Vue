const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();

// search any customer by name
const getProductsByTerm = async (req, res) => {
    const  searchString  = req.params.term;
    try {
        const prod = await prisma.products.findMany({
            where: { 
                OR: [
                    {
                        name: {
                            contains: searchString
                        }
                    },
                    {
                        description: {
                            contains: searchString
                        }
                    },
                    {
                        price: {
                            contains: searchString
                        }
                    },
                    {
                        category: {
                            contains: searchString
                        }
                    },
                    {
                        image_url: {
                            contains: searchString
                        }
                    },
                ]
            },
        });
        if (!prod || prod.length == 0) {
            res.status(404).json({ 'message': 'Product not found!' });
        } else {
            res.status(200).json(prod);
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

module.exports = { getProductsByTerm };