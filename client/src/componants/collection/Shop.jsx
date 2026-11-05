import Tabs from './Tabs.jsx'
import react from 'react'
import Catgory from './Catgory.jsx'
import { tabsText } from '../../Utility.js'
import { useEffect } from 'react'

function Shop(props) {


    const TABS = ['Women', 'Men', 'New Born']
    const [currentTab, setCurrentTab] = react.useState(tabsText[TABS[0]])

    const [products, setProducts] = react.useState([])
    const [categories, setCategories] = react.useState([])
    const [metals, setMetals] = react.useState([])

    const [loadingPro, setLoadingPro] = react.useState(true)
    const [loadingCat, setLoadingCat] = react.useState(true)

    //get categories(ring etc) based on tab (gender)
    react.useEffect(() => {
        async function getCategory() {
            try {
                const response = await fetch(
                    `http://localhost:5000/productCategories?gender=${currentTab}`
                )

                if (!response.ok) {
                    throw new Error('Failed to fetch products')
                }

                const data = await response.json()
                setCategories(data)

            } catch (error) {
                console.error(error)
            }
            finally {
                setLoadingCat(false)
            }
        }

        // setTimeout(() => {
        //     getCategory()
        // }, 5000)
        getCategory()


    }, [currentTab])

    //get metals
    useEffect(() => {

        async function getMetals() {
            try {
                const responce = await fetch('http://localhost:5000/metals')
                const data = await responce.json()
                setMetals(data)
            }
            catch (e) {
                console.log('error mateials', e)
            }
        }

        getMetals()

    }, [])

    //get products
    react.useEffect(() => {
        async function getProducts() {
            try {
                const response = await fetch(
                    'http://localhost:5000/products'
                )

                if (!response.ok) {
                    throw new Error('Failed to fetch products')
                }

                const data = await response.json()
                console.log('recieved products: ', data)
                setProducts(data)

            } catch (error) {
                console.error(error)
                alert('Error occured')
            }
            finally {
                setLoadingPro(false)
            }
        }

        // setTimeout(() => {
        //     getProducts()
        // }, 7000)
        getProducts()

    }, [])


    return (
        <section className='shop'>

            <Tabs
                tabs={TABS}
                currentTab={currentTab}
                handleClick={(e) => {
                    if (currentTab == tabsText[e.currentTarget.innerText])
                        return
                    setLoadingCat(true)
                    setCurrentTab(tabsText[e.currentTarget.innerText])
                }
                }
            />
            <Catgory
                currentTab={currentTab}
                categories={categories}
                products={products}
                metals= {metals}
                filter = {setMetals}
                loadingPro={loadingPro}
                loadingCat={loadingCat}
                onAddItem={props.onAddItem}
                removeItem={props.removeItem}
                cartItems={props.cartItems}
            />

        </section>
    )
}

export default Shop