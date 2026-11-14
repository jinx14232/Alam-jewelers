import Card from './Card.jsx'
import Model from './Model.jsx'
import Loader from './Loader.jsx'
import React from 'react'
import Filter from './Filter.jsx'

function ProductCatelog(props) {

    //loading
    const [loadingPro, setLoadingPro] = React.useState(true)
    const [loadingCat, setLoadingCat] = React.useState(true)

    //category
    const [categories, setCategories] = React.useState([])

    //get categories(ring etc) based on tab (gender)
    React.useEffect(() => {
        async function getCategory() {
            try {
                const response = await fetch(
                    `http://localhost:5000/genderCategories?gender=${props.currentTab}`
                )

                if (!response.ok) {
                    throw new Error('Failed to fetch products')
                }

                const data = await response.json()
                // console.log('gender Categories ', data)
                setCategories(data) // [{name, id}, ..]

            } catch (error) {
                console.error(error)
            }
            finally {
                setLoadingCat(false)
            }
        }

        setLoadingCat(true)
        getCategory()

    }, [props.currentTab])

    //metals
    const [metals, setMetals] = React.useState([])
    //get metals
    React.useEffect(() => {

        async function getMetals() {
            try {
                const responce = await fetch('http://localhost:5000/metals')
                const data = await responce.json()
                // console.log('all metals ', data)
                setMetals(data) // [{name, id}, ..]
            }
            catch (e) {
                console.log('error mateials', e)
            }
        }

        getMetals()

    }, [])

    //products
    const [products, setProducts] = React.useState([])
    //get products
    React.useEffect(() => {
        async function getProducts() {
            try {
                const response = await fetch(
                    'http://localhost:5000/products'
                )

                if (!response.ok) {
                    throw new Error('Failed to fetch products')
                }

                const data = await response.json()
                // console.log('recieved products: ', data)
                setProducts(data)


            } catch (error) {
                console.error(error)
                alert('Error occured')
            }
            finally {
                setLoadingPro(false)
            }
        }

        getProducts()

    }, [])

    //filters, -1 = all
    const [metalFilter, setMetalFilter] = React.useState(-1)
    const [catFilter, setCatFilter] = React.useState(-1)

    //reset filters when tab changes
    React.useEffect(() => {
        setCatFilter(-1)
        setMetalFilter(-1)
    }, [props.currentTab])

    return (
        <>
            <section className='catelog' id='catelog'>

                <Filter
                    filters={[
                        {
                            name: 'Category',
                            value: catFilter,
                            setFilter: setCatFilter,
                            options: categories
                        },
                        {
                            name: 'Metal',
                            value: metalFilter,
                            setFilter: setMetalFilter,
                            options: metals
                        }
                    ]}
                />

                {!loadingCat ? categories.map((cat) => {

                    //filter items of specific category and metal
                    let items = products.filter(p => (
                        p.gender == props.currentTab &&
                        (catFilter != '-1' ? p.category_id == catFilter : p.category_id == cat.id) &&
                        //metal filter
                        (
                            metalFilter != -1 ?
                                p.metals.some(id => id == metalFilter) :
                                true
                        )
                    )
                    )

                    if (catFilter != -1 && cat.id != catFilter)
                        return <></>

                    return (
                        <section className="category" key={cat.id}>
                            <h2>{cat.name}</h2>
                            <div className="orn" />

                            {loadingPro ? <Loader /> :

                                <div className="grid-wrap">
                                    {items.length == 0 && <p>No item found!</p>}
                                    <div className="grid">
                                        {items.map((p, idx) =>
                                            <Card
                                                key={idx}
                                                product={p}
            
                                            />
                                        )}
                                    </div>
                                </div>
                            }

                        </section>

                    )

                }) : <Loader />}

            </section>
            

        </>

    )
}

export default ProductCatelog
