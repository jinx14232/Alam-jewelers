import express from "express"
import db from "../../config/db.js"
import multer from 'multer'
import { uploadMedia, deleteMedia } from '../../utils/uploadImage.js'

const rounter = express.Router()

const upload = multer({
    storage: multer.memoryStorage()
})


rounter.post('/addproduct', upload.fields([
    { name: 'images', maxCount: 5 },
    { name: 'video', maxCount: 1 }
]), async (req, res) => {

    const {
        name,
        code,
        description,
        gender,
        category_id,
        metalInfo
    } = req.body

    const metals = JSON.parse(metalInfo);

    try {

        console.log('images and video uploading')

        const imagesData = await Promise.all(
            req.files.images.map(file => uploadMedia(file))
        )
        console.log('images done')

        const videoData = req.files.video ?
            await uploadMedia(req.files.video[0], 'video') :
            null

        console.log('video uploaded')
        insertProduct({ name, code, description, gender, category_id }, metals, imagesData, videoData)

        res.json({
            message: 'Product Added',
        })

    } catch (e) {
        console.error(e)
        res.status(500).json({ error: 'Upload failed! Check internet connection!' })
    }

})

rounter.post('/addbar', upload.array('image', 1), async (req, res) => {

    const {
        metal,
        weight,
        weight_unit,
        brand,
        fineness,
        code,
        karat
    } = req.body

    const name = weight + ' ' + weight_unit + ' ' + brand + ' ' + metal + ' bar'

    try {

        const imageData = await Promise.all(
            req.files.map(file => uploadMedia(file))
        )

        db.prepare(`
            INSERT INTO bars(name, metal, weight, weight_unit, brand, fineness, karat, bar_code, image_url, public_id) VALUES 
            (?,?,?,?,?,?,?,?,?, ?)
        `).run(name, metal, weight, weight_unit, brand, fineness, karat, code, imageData[0].url, imageData[0].public_id)

        res.json({
            message: 'Bar Added',
        })

    } catch (e) {
        console.error(e)
        res.status(500).json({ error: 'Upload failed! Check internet connection!' })
    }

})

rounter.get('/overview', (req, res) => {

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

rounter.get('/allProducts', (_, res) => {
    try {
        const products = getInventoryProducts(-1)
        res.json({ products })

    } catch (e) {
        console.log(error)
        res.status(500).json({
            message: 'Failed to retrieve jewellery'
        })
    }
})

rounter.get('/allBars', (req, res) => {
    try {

        const bars = getInventoryBars(-1)
        res.json({ bars })

    } catch (e) {
        console.log(error)
        res.status(500).json({
            message: 'Failed to retrieve bars'
        })
    }
})

rounter.post('/featureProduct/:id', (req, res) => {

    const { id } = req.params
    try {

        const result = db.prepare(`
            INSERT INTO featured_products (product_id) VALUES (?)
        `).run(id)

        if(result.changes == 0)
            return res.json({message: 'Could not feature Product'})
        else
            return res.json({message: 'Featured Product'})

    } catch (error) {
        console.log(error)
        return res.json({message: 'Database error, Could not feature Product'})
    }

})

rounter.delete('/product/:id', async (req, res) => {
    const { id } = req.params

    try {

        const imagesID = db.prepare(`
            SELECT public_id
            FROM product_images
            WHERE product_id = ?
        `).all(id)

        const videoID = db.prepare(`
            SELECT video_public_id
            FROM products
            WHERE id = ?
        `).all(id)

        const result = db.prepare(`
            DELETE FROM products
            WHERE id = ?
        `).run(id)

        if (result.changes === 0) {
            return res.status(404).json({
                message: 'Product not found'
            });
        }

        for (const image of imagesID) {
            if (image.public_id) {
                await deleteMedia(image.public_id);
            }
        }

        if (videoID && videoID.video_public_id)
            await deleteMedia(videoID.video_public_id);

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
rounter.delete('/bar/:id', async (req, res) => {
    const { id } = req.params

    try {

        const imagesID = db.prepare(`
            SELECT public_id
            FROM bars
            WHERE id = ?
        `).get(id)

        const result = db.prepare(`
            DELETE FROM bars
            WHERE id = ?
        `).run(id)

        const responce = await deleteImage(imagesID.public_id).catch((error) => {
            console.log('cannot delete', error)
            return null;
        })

        if (result.changes === 0 || responce == null) {
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

rounter.get('/inventory', (req, res) => {

    try {
        const limit = req.query.limit
            ? Number(req.query.limit)
            : -1

        const products = getInventoryProducts(limit)
        const bars = getInventoryBars(limit)

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

rounter.post('/addCategory', (req, res) => {
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
})
rounter.delete('/category/:id', (req, res) => {

    const { id } = req.params

    try {
        const result = db.prepare(`
            DELETE FROM categories WHERE id = ?
        `).run(id);

        res.status(201).json({
            message: 'Category deleted successfully',
            id: result.lastInsertRowid
        });

    } catch (err) {

        if (result.changes === 0) {
            return res.status(404).json({
                message: 'category not found'
            });
        }

        console.error(err);

        res.status(500).json({
            message: 'Something went wrong'
        });
    }
})


function getInventoryProducts(limit) {

    const products = db.prepare(`
        SELECT
            p.id,
            p.name,
            p.product_code AS code,
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

function getInventoryBars(limit) {
    const bars = db.prepare(`
            SELECT
                id,
                name,
                image_url,
                bar_code AS code,
                metal,
                brand,
                weight,
                weight_unit AS unit,
                created_at AS time
            FROM bars
            ORDER BY id DESC
            LIMIT ?;
        `).all(limit)

    return bars

}


function insertProduct(product, metals, imageData, videoData) {

    const result = db.prepare(
        `INSERT INTO products(name, product_code, description, category_id, gender, video_url, video_public_id) 
        VALUES (?,?,?,?,?,?,?)
        `
    ).run(
        product.name, product.code, product.description, product.category_id, product.gender, videoData?.url || null, videoData?.public_id || null
    )

    const lastRowID = result.lastInsertRowid;

    const insertImages = db.prepare(
        `INSERT INTO product_images(product_id, image_url, public_id, is_primary) 
        VALUES (?, ?, ?, ?)
        `
    )

    imageData.forEach((image, idx) => {
        insertImages.run(lastRowID, image.url, image.public_id, idx == 0 ? 1 : 0)
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

export default rounter