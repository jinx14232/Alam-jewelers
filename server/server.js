import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import db from './config/db.js'
import { getGoldRates } from './getRates.js'
import adminRoutes from './routes/admin/adminRoutes.js'
import clientRoutes from './routes/client/clientRoutes.js'

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: ['http://localhost:5173',
        'http://localhost:5174',
        'https://0mlxmjxd-5173.inc1.devtunnels.ms',
        'https://0mlxmjxd-5174.inc1.devtunnels.ms'
    ]
}))

app.get('/', (req, res) => {
    res.send(`<h1>Server</>`)
})

app.use('/admin', adminRoutes)
app.use('/client', clientRoutes)

app.get('/goldRates', async (req, res) => {
    try {
        const rates = await getGoldRates();
        res.json(rates);
    } catch (error) {
        console.error('Gold rates error:', error.message);
        res.status(500).json({
            message: 'Unable to fetch gold rates'
        });
    }
})

app.get('/rawCategories', (req, res) => {

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



//for cards--------------------




app.listen(PORT, () => {
    console.log("server is active")
})