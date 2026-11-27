import express from "express"
import db from "../../config/db.js"

const router = express.Router()

router.get('/barCard', (req, res) => {
    const bars = db.prepare(`
        SELECT 
            id, 
            name, 
            image_url, 
            metal,
            brand,
            weight,
            weight_unit as unit
        FROM bars
    `).all()
    res.send(bars)
})

router.get('/productCard', (req, res) => {

    try {
        const products = db.prepare(`
            SELECT
                p.id,
                p.name,
                p.gender,
                p.category_id,
                c.name as category,
                (
                    SELECT pi.image_url
                    FROM product_images pi
                    WHERE pi.product_id = p.id
                    ORDER BY pi.is_primary DESC
                    LIMIT 1
                ) AS image_url

            FROM products p
            JOIN categories c
                ON p.category_id = c.id

            ORDER BY p.id DESC
        `).all()

        const metals = db.prepare(`
            SELECT
                product_id,
                metal_id
            FROM product_metal
        `).all()

        const metal_product = new Map()

        metals.forEach(metal => {
            if (!metal_product.has(metal.product_id)) {
                metal_product.set(metal.product_id, []);
            }

            metal_product.get(metal.product_id).push(metal.metal_id);
        })

        const result = products.map(product => ({
            ...product,
            metals: metal_product.get(product.id) || []
        }))


        res.json(result)

    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: 'Failed to retrieve products'
        })
    }

})

router.get('/home', (req, res) => {
   try {
        const limit = 3
        const products = getDetailCardProducts(limit)
        const bars = getDetailCardBars(limit)

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

router.get('/featured', (req, res) => {
   try {
        const limit = 3
        const products = getFeatureProducts()
        const bars = getFeatureBars()

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

router.get('/product/:id', (req, res) => {

    try {
        const { id } = req.params;

        // Get the product
        const product = db.prepare(`
            SELECT 
                p.id,
                p.name,
                p.description,
                p.gender,
                p.video_url,
                p.product_code AS code,
                c.name AS category
            FROM products p
            JOIN categories c ON p.category_id = c.id
            WHERE p.id = ?
        `).get(id);

        // Check if product exists
        if (!product) {
            return res.status(404).json({
                message: 'Product not found'
            });
        }

        // Get product images
        const images = db.prepare(`
            SELECT image_url
            FROM product_images
            WHERE product_id = ?
            ORDER BY id ASC
        `).all(id);

        // Get product metals
        const metals = db.prepare(`
            SELECT
                m.id,
                m.name,
                pm.details
            FROM product_metal pm
            JOIN metals m ON pm.metal_id = m.id
            WHERE pm.product_id = ?
        `).all(id);

        // Attach related data
        const result = {
            ...product,
            images,
            metals: metals.map(metal => ({
                id: metal.id,
                name: metal.name,
                details: JSON.parse(metal.details)
            }))
        };

        res.json(result);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: 'Failed to retrieve product'
        });
    }

})

router.get('/bar/:id', (req, res) => {
    
    try {
        const { id } = req.params;

        // Get the product
        const bar = db.prepare(`
            SELECT 
                id, name, metal, weight,
                weight_unit, brand, fineness,
                karat, bar_code AS code, image_url
            FROM bars
            WHERE id = ?
        `).get(id);

        // Check if product exists
        if (!bar) {
            return res.status(404).json({
                message: 'Bar not found'
            });
        }

        res.json(bar);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: 'Failed to retrieve bar'
        });
    }

})

function getDetailCardProducts(limit) {

    const products = db.prepare(`
        SELECT
            p.id,
            p.name,
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

function getDetailCardBars(limit) {
    const bars = db.prepare(`
            SELECT
                id,
                name,
                image_url,
                metal,
                brand
            FROM bars
            ORDER BY id DESC
            LIMIT ?;
        `).all(limit)

    return bars

}
function getFeatureBars() {
    const bars = db.prepare(`
            SELECT
                id,
                name,
                image_url,
                metal,
                brand
            FROM bars
            WHERE is_featured = 1
            ORDER BY id DESC
        `).all()

    return bars

}

function getFeatureProducts() {

    const products = db.prepare(`
        SELECT
            p.id,
            p.name,
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

        WHERE p.is_featured = 1
        ORDER BY p.id DESC;
        `).all()

    return products
}

// router.get('/productCard', (req, res) => {

//     try {
//         const products = db.prepare(`
//             SELECT
//                 p.id,
//                 p.name,
//                 p.product_code AS code,
//                 p.gender,
//                 p.category_id,

//                 (
//                     SELECT pi.image_url
//                     FROM product_images pi
//                     WHERE pi.product_id = p.id
//                     ORDER BY pi.is_primary DESC
//                     LIMIT 1
//                 ) AS image_url

//             FROM products p
//             JOIN categories c
//                 ON p.category_id = c.id

//             ORDER BY p.id DESC
//         `).all();

//         const metals = db.prepare(`
//             SELECT
//                 product_id,
//                 metal_id
//             FROM product_metal
//         `).all();

//         const metal_product = new Map();

//         metals.forEach(metal => {
//             if (!metal_product.has(metal.product_id)) {
//                 metal_product.set(metal.product_id, []);
//             }

//             metal_product.get(metal.product_id).push(metal.metal_id);
//         });

//         const result = products.map(product => ({
//             ...product,
//             metals: metal_product.get(product.id) || []
//         }));

//         console.log('products ', result)

//         res.json(result)

//     } catch (error) {
//         console.error(error)
//         res.status(500).json({
//             message: 'Failed to retrieve products'
//         })

//     }

// })


export default router