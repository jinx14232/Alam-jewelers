import '../style.css'
import Card from './Card.jsx'
import Model from './Model.jsx'
import { useState, useEffect } from 'react'
import Loader from './Loader.jsx'

function Catgory(props) {

    const [openedItem, setOpenedItem] = useState(null)
    const { currentTab, categories, products } = props

    const [metalFilter, setMetalFilter] = useState('all')
    const [catFilter, setCatFilter] = useState('all')

    //catFilter
    useEffect(()=>{
        setCatFilter('all')
        setMetalFilter('all')
    },[currentTab])

    return (
        <>
            <section className='catelog' id='catelog'>

                <div className="filters">
                    <div className="metal-select-cont">
                        <label htmlFor="metal-select">
                            Select Metal
                        </label>
                        <select
                            id="metal-select"
                            name="metal"
                            value={metalFilter}
                            onChange={(e) => setMetalFilter(e.currentTarget.value)}
                        >
                            <option value="all">All</option>

                            {
                                props.metals.map(metal => (
                                    <option
                                        key={metal.id}
                                        value={metal.name}
                                    >
                                        {metal.name}
                                    </option>
                                ))

                            }

                        </select>
                    </div>
                    <div className="metal-select-cont">
                        <label htmlFor="metal-select">
                            Select Category
                        </label>
                        <select
                            id="metal-select"
                            name="Category"
                            value={catFilter}
                            onChange={(e) => setCatFilter(e.currentTarget.value)}
                        >
                            <option value="all">All</option>

                            {
                                categories.map(cat => (
                                    <option
                                        key={cat.id}
                                        value={cat.name}
                                    >
                                        {cat.name}
                                    </option>
                                ))

                            }

                        </select>
                    </div>
                </div>


                {!props.loadingCat ? categories.map((cat) => {

                    //filter items of specific category and metal
                    const items = products.filter(p =>

                        p.category_id == cat.id &&
                        p.gender == currentTab &&
                        (
                            catFilter === 'all' ||
                            p.category == catFilter
                        ) &&
                        (
                            metalFilter === 'all' ||
                            p.metals.some(metal => metal.name === metalFilter)
                        )
                    )
                    {console.log("about to render category, catFilter ", catFilter, " cat.name ", cat.name)}
                    if (catFilter != 'all' && cat.name != catFilter)
                        return <></>
                    return (
                        <section className="category" key={cat.id}>
                            {console.log('rendered ', cat.name)}
                            <h2>{cat.name}</h2>
                            <div className="orn" />

                            {props.loadingPro ? <Loader /> :
                                <>

                                    <div className="grid-wrap">
                                        {items.length == 0 && <p>No item found!</p>}
                                        <div className="grid">
                                            {items.map((p, idx) =>
                                                <Card
                                                    key={p.id}
                                                    product={p}
                                                    onOpen={(product) => setOpenedItem(product)}
                                                />
                                            )}
                                        </div>
                                    </div>
                                </>
                            }

                        </section>

                    )

                }) : <Loader />}

            </section>

            {openedItem != null &&

                <>
                    <div className="ov" onClick={() => setOpenedItem(null)}>
                        <Model
                            product={openedItem}
                            onAddItem={props.onAddItem}
                            removeItem={props.removeItem}
                            onClose={() => setOpenedItem(null)}
                            cartItems={props.cartItems}
                        />
                    </div>
                </>
            }

        </>

    )
}

export default Catgory

// const [products, setProducts] = useState([])
// const [categories, setCategories] = useState([])


// useEffect(() => {

//     async function getProducts() {
//         try {
//             const response = await fetch(
//                 'http://localhost:5000/products'
//             )

//             if (!response.ok) {
//                 throw new Error('Failed to fetch products')
//             }

//             const data = await response.json()
//             setProducts(data)

//         } catch (error) {
//             console.error(error)
//             alert('Error occured')
//         }
//     }

//     getProducts()

// }, [])

// useEffect(() => {
//     async function getCategory() {
//         try {
//             const response = await fetch(
//                 `http://localhost:5000/productCategories?gender=${props.currentTab}`
//             )

//             if (!response.ok) {
//                 throw new Error('Failed to fetch products')
//             }

//             const data = await response.json()
//             setCategories(data)

//         } catch (error) {
//             console.error(error)
//         }
//     }
//     getCategory()
// }, [props.currentTab])