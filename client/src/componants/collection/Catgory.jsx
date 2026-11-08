import Card from './Card.jsx'
import Model from './Model.jsx'
import { useState, useEffect } from 'react'
import Loader from '../Loader.jsx'

function Catgory(props) {

    const [openedItem, setOpenedItem] = useState(null)

    return (
        <>
            <section className='catelog' id='catelog'>

                {props.allowFilter &&

                    <div className="filters">
                        {props.filters.map((filter, idx) => (

                            <div className="filter-cont" key={idx}>

                                <label htmlFor="filter-select">
                                    Select {filter.text}
                                </label>
                                <select
                                    className="filter-select"
                                    name="filter"
                                    value={filter.value}
                                    onChange={(e) => filter.setFilter(e.currentTarget.value)}
                                >
                                    <option value="all">All</option>

                                    {
                                        filter.options.map((opt, id) => (
                                            <option
                                                key={id + idx}
                                                value={opt.name}
                                            >
                                                {opt.name}
                                            </option>
                                        ))

                                    }

                                </select>
                            </div>

                        ))}

                    </div>
                }


                {!props.loadingCat ? props.categories.map((cat) => {

                    //filter items of specific category and metal
                    let items = props.products

                    if (props.allowFilter) {

                        //filters can be applied...
                        //only product has filterd for now

                        items = items.filter(p =>

                            p.category_id == cat.id &&
                            p.gender == props.currentTab &&
                            //category filter
                            (
                                props.filters[1].value === 'all' ||
                                p.category == props.filters[1].value
                            ) &&
                            //metal filter
                            (
                                props.filters[0].value === 'all' ||
                                p.metals.some(metal => metal.name === props.filters[0].value)
                            )
                        )
                    }
                    else{
                        //take bars of current tab
                        items = items.filter(p=> p.metal == props.currentTab)
                    }

                    if (props.allowFilter) {
                        if (props.filters[1].value != 'all' && cat.name != props.filters[1].value)
                            return <></>
                    }

                    return (
                        <section className="category" key={cat.id}>
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