import { DatabaseSync } from 'node:sqlite'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const dbPath = path.join(__dirname, 'products.db')

const db = new DatabaseSync(dbPath)

db.exec(`

    PRAGMA foreign_keys = ON;

    CREATE TABLE IF NOT EXISTS categories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        audience TEXT NOT NULL,
        UNIQUE(name, audience)
    );

    CREATE TABLE IF NOT EXISTS metals (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE
    );


    CREATE TABLE IF NOT EXISTS products (

        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT,
        category_id INTEGER NOT NULL,
        gender TEXT NOT NULL
            CHECK (gender IN ('women', 'men', 'newBorn')),
        price REAL NOT NULL CHECK (price >= 0),
        created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,

        FOREIGN KEY (category_id) REFERENCES categories(id)

    );

    CREATE TABLE IF NOT EXISTS product_metal(
        id INTEGER PRIMARY KEY AUTOINCREMENT,

        product_id INTEGER NOT NULL,
        metal_id INTEGER NOT NULL,

        details TEXT NOT NULL,

        FOREIGN KEY (product_id)
            REFERENCES products(id)
            ON DELETE CASCADE,

        FOREIGN KEY (metal_id)
            REFERENCES metals(id),

        UNIQUE(product_id, metal_id)

    );

    CREATE TABLE IF NOT EXISTS product_images (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        product_id INTEGER NOT NULL,
        image_url TEXT NOT NULL,
        public_id TEXT NOT NULL,
        is_primary INTEGER NOT NULL DEFAULT 0
            CHECK (is_primary IN (0, 1)),
        
        FOREIGN KEY (product_id)
            REFERENCES products(id)
            ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS bars (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT DEFAULT 'Bar',
        metal TEXT NOT NULL 
            CHECK(metal IN ('gold', 'silver')),
        weight REAL NOT NULL,
        weight_unit TEXT NOT NULL DEFAULT 'grams',
        brand TEXT NOT NULL DEFAULT 'ARY',
        fineness REAL,
        karat INT,
        price REAL NOT NULL,
        image_url TEXT NOT NULL , 
        public_id TEXT NOT NULL,
        created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  
    );

`)

export default db
