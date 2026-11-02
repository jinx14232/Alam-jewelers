import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import multer from 'multer'
import uploadImage from './utils/uploadImage.js'
import db from './config/db.js'

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174']
}))
const upload = multer({
    storage: multer.memoryStorage()
})

app.get('/', (req, res) => {
    res.send(`<h1>Server</>`)
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

        const imageUrls = await Promise.all(
            req.files.map(file => uploadImage(file))
        )

        insertData({ name, description, gender, category_id, price }, metals, imageUrls)

        res.json({
            message: 'success',
        })

    } catch (e) {
        console.error(e)
        res.status(500).json({ error: 'Image upload failed' })
    }

})


function insertData(product, metals, imageUrls) {

    const result = db.prepare(
        `INSERT INTO products(name, description, category_id, gender, price) 
        VALUES (?,?,?,?,?)
        `
    ).run(
        product.name, product.description, product.category_id, product.gender, product.price
    )

    const lastRowID = result.lastInsertRowid;

    const insertImages = db.prepare(
        `INSERT INTO product_images(product_id, image_url, is_primary) 
        VALUES (?, ?, ?)
        `
    )

    imageUrls.forEach((url, idx) => {
        insertImages.run(lastRowID, url, idx == 0 ? 1 : 0)
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

app.get('/categories', (req, res) => {
    console.log('getting categories')

    const categories = db.prepare(`
        SELECT * FROM categories
    `).all()

    res.json(categories)
})

app.get('/productCategories', (req, res) => {

    const audience = req.query.gender

    const categories = db.prepare(`
        SELECT name, id FROM categories where audience = ?
    `).all(audience)

    res.json(categories)
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
            message: 'Failed to retrieve products'
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

        console.log(result)
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