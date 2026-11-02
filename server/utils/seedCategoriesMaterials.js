import db from '../config/db.js'

const categories = {
    women: ['Rings',
        'Necklaces',
        'Earrings',
        'Bracelets',
        'Bangles',
        'Pendants'],

    men: ['Rings',
        'Bracelets',
        'Chains'],

    newBorn: ['Rings',
        'Earrings',
        'Bracelets',]
}
const materials = ['gold', 'silver', 'diamond', 'platinum', 'palladium']

const insertCat = db.prepare(`
    INSERT OR IGNORE INTO categories (name, audience)
    VALUES (?, ?)
`)

const insertMat = db.prepare(`
    INSERT OR IGNORE INTO metals (name)
    VALUES (?)
`)

for(const [gender, names] of Object.entries(categories)){
    for(const name of names)
        insertCat.run(name, gender)
}

materials.forEach(mat=>{
    insertMat.run(mat)
})

console.log('Categories and materials seeded successfully!')
