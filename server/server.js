import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import multer from 'multer'
import { uploadImage, deleteImage } from './utils/uploadImage.js'
import db from './config/db.js'

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174', 'https://0mlxmjxd-5174.inc1.devtunnels.ms', 'https://0mlxmjxd-5173.inc1.devtunnels.ms']
}))
const upload = multer({
    storage: multer.memoryStorage()
})

app.get('/', (req, res) => {
    res.send(`<h1>Server</>`)
})

//add products and bar----------------------------

app.post('/addbar', upload.array('image', 1), async (req, res) => {

    const {
        metal,
        weight,
        weight_unit,
        brand,
        fineness,
        price,
        karat
    } = req.body

    const name = weight + ' ' + weight_unit + ' ' + brand + ' ' + metal + ' bar'

    try {

        const imageData = await Promise.all(
            req.files.map(file => uploadImage(file))
        )

        db.prepare(`
            INSERT INTO bars(name, metal, weight, weight_unit, brand, fineness, karat, price, image_url, public_id) VALUES 
            (?,?,?,?,?,?,?,?,?, ?)
        `).run(name, metal, weight, weight_unit, brand, fineness, karat, price, imageData[0].image_url, imageData[0].public_id)

        res.json({
            message: 'success',
        })

    } catch (e) {
        console.error(e)
        res.status(500).json({ error: 'bar upload failed' })
    }

})

app.post('/addproduct', upload.array('images', 5), async (req, res) => {

    const {
        name,
        description,
        gender,
        category_id,
        price,
        metalInfo
    } = req.body

    const metals = JSON.parse(metalInfo);

    try {

        const imagesData = await Promise.all(
            req.files.map(file => uploadImage(file))
        )

        insertData({ name, description, gender, category_id, price }, metals, imagesData)

        res.json({
            message: 'success',
        })

    } catch (e) {
        console.error(e)
        res.status(500).json({ error: 'Image upload failed' })
    }

})


function insertData(product, metals, imageData) {

    const result = db.prepare(
        `INSERT INTO products(name, description, category_id, gender, price) 
        VALUES (?,?,?,?,?)
        `
    ).run(
        product.name, product.description, product.category_id, product.gender, product.price
    )

    const lastRowID = result.lastInsertRowid;

    const insertImages = db.prepare(
        `INSERT INTO product_images(product_id, image_url, public_id, is_primary) 
        VALUES (?, ?, ?, ?)
        `
    )

    imageData.forEach((image, idx) => {
        insertImages.run(lastRowID, image.image_url, image.public_id, idx == 0 ? 1 : 0)
    })

    const insertMetalInfo = db.prepare(
        `INSERT INTO product_metal(product_id, metal_id, details) 
        VALUES (?,?,?)
        `
    )
    metals.forEach(metal => {
        insertMetalInfo.run(lastRowID, metal.metal_id, JSON.stringify(metal.details))
    })

    console.log('inserted into database')
}


//-------------------------------------------------


app.get('/categories', (req, res) => {

    const categories = db.prepare(`
        SELECT * FROM categories
    `).all()

    res.json(categories)
})

app.get('/genderCategories', (req, res) => {

    const audience = req.query.gender

    const categories = db.prepare(`
        SELECT name, id FROM categories where audience = ?
    `).all(audience)

    res.json(categories)
})

app.get('/overview', (req, res) => {

    //total product
    const totalProducts = db.prepare(`
            SELECT COUNT(*) AS totalProducts FROM products
    `).all()

    //total bars
    const totalBars = db.prepare(`
            SELECT COUNT(*) AS totalBars FROM bars
    `).all()

    //total cats
    const totalCat = db.prepare(`
            SELECT COUNT(*) AS totalCat FROM categories
    `).all()

    //total metals
    const totalMetals = db.prepare(`
            SELECT COUNT(*) AS totalMetals FROM metals
    `).all()

    const categoryGroup = db.prepare(`
        SELECT
        a.audience,
        COUNT(p.id) AS total
        FROM (
            SELECT 'women' AS audience
            UNION ALL SELECT 'men'
            UNION ALL SELECT 'newBorn'
        )a
        LEFT JOIN products p
        ON p.gender = a.audience
        GROUP BY a.audience;
    `).all()

    res.json({
        totalProducts,
        totalBars,
        totalCat,
        totalMetals,
        categoryGroup
    })

})

app.post('/categories', (req, res) => {
    const { name, audience } = req.body;

    try {
        const result = db.prepare(`
            INSERT INTO categories (name, audience)
            VALUES (?, ?)
        `).run(name, audience);

        res.status(201).json({
            message: 'Category added successfully',
            id: result.lastInsertRowid
        });

    } catch (err) {

        if (err.code === 'SQLITE_CONSTRAINT_UNIQUE') {
            return res.status(409).json({
                message: 'This category already exists for this audience'
            });
        }

        console.error(err);

        res.status(500).json({
            message: 'Something went wrong'
        });
    }
});

app.delete('/product/:id', async (req, res) => {
    const { id } = req.params

    try {

        const imagesID = db.prepare(`
            SELECT public_id
            FROM product_images
            WHERE product_id = ?
        `).all(id);

        const result = db.prepare(`
            DELETE FROM products
            WHERE id = ?
        `).run(id);

        for (const image of imagesID) {
            if (image.public_id) {
                await deleteImage(image.public_id);
            }
        }

        if (result.changes === 0) {
            return res.status(404).json({
                message: 'Product not found'
            });
        }

        res.json({
            message: 'Product deleted successfully'
        });

    } catch (err) {
        console.error(err);

        res.status(500).json({
            message: 'Failed to delete product'
        });
    }

})

app.get('/metals', (req, res) => {
    try {

        const metals = db.prepare(`
            SELECT * FROM metals
        `).all()

        res.json(metals)

    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: 'Failed to retrieve metals'
        })
    }
})

app.get('/bars', (req, res) => {
    const bars = db.prepare(`
        SELECT * FROM bars
    `).all()
    res.send(bars)
})

function getAllProducts(limit) {


    const products = db.prepare(`
        SELECT
            p.id,
            p.name,
            p.price,
            p.gender AS audience,
            c.name AS category,
            created_at AS time,

        (SELECT GROUP_CONCAT(m.name, ', ')
        FROM product_metal pm
        JOIN metals m ON m.id = pm.metal_id
        WHERE pm.product_id = p.id) AS metals,

        (SELECT pi.image_url
        FROM product_images pi
        WHERE pi.product_id = p.id
        ORDER BY pi.is_primary DESC
        LIMIT 1) AS image_url

        FROM products p
        JOIN categories c
        ON c.id = p.category_id

        ORDER BY p.id DESC
        LIMIT ?;
        `).all(limit)

    return products


}

function getAllBars(limit) {
    const bars = db.prepare(`
            SELECT
                id,
                name,
                image_url,
                price,
                created_at AS time
            FROM bars
            ORDER BY id DESC
            LIMIT ?;
        `).all(limit)

    return bars

}

app.get('/allProducts', (req, res) => {
    try {

        const products = getAllProducts(-1)
        res.json({ products })

    } catch (e) {
        console.log(error)
        res.status(500).json({
            message: 'Failed to retrieve jewellery'
        })
    }
})

app.get('/allBars', (req, res) => {
    try {

        const bars = getAllBars(-1)
        res.json({ bars })

    } catch (e) {
        console.log(error)
        res.status(500).json({
            message: 'Failed to retrieve bars'
        })
    }
})


app.get('/inventory', (req, res) => {

    try {
        const limit = req.query.limit
            ? Number(req.query.limit)
            : -1

        const products = getAllProducts(limit)
        const bars = getAllBars(limit)

        res.json({
            products,
            bars
        })

    } catch (e) {
        console.error(e)

        res.status(500).json({
            message: 'Failed to retrieve inventory'
        })
    }

})

app.get('/products', (req, res) => {

    try {
        const products = db.prepare(`
            SELECT 
                p.*,
                c.name AS category
            FROM products p
            JOIN categories c
                ON p.category_id = c.id
            ORDER BY p.id DESC
        `).all()

        const images = db.prepare(`
            SELECT *
            FROM product_images
        `).all()

        const metals = db.prepare(`
            SELECT
            pm.product_id,
            m.id,
            m.name,
            pm.details
            FROM product_metal pm
            JOIN metals m
            ON pm.metal_id = m.id
        `).all();

        // Group images by product ID
        const imagesByProduct = new Map()

        images.forEach(image => {
            if (!imagesByProduct.has(image.product_id)) {
                imagesByProduct.set(image.product_id, [])
            }

            imagesByProduct.get(image.product_id).push(image)
        })

        const metal_product = new Map()
        metals.forEach(metal => {
            if (!metal_product.has(metal.product_id))
                metal_product.set(metal.product_id, [])

            metal_product.get(metal.product_id).push({
                id: metal.id,
                name: metal.name,
                details: JSON.parse(metal.details)
            })
        })

        // Attach images to their respective products
        const result = products.map(product => ({
            ...product,
            metals: metal_product.get(product.id) || [],
            images: imagesByProduct.get(product.id) || []
        }))

        res.json(result)

    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: 'Failed to retrieve products'
        })

    }

})


app.listen(PORT, () => {
    console.log("server is active")
})