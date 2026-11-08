import Shop from './Shop.jsx'
import { useOutletContext } from 'react-router-dom'
import react from 'react'
import { tabsText } from '../../Utility.js'

export default function Collection() {

    const {
        addItemInCart,
        removeItemInCart,
        cartItems
    } = useOutletContext()

    //tabs
    const TABS = ['Women', 'Men', 'New Born']
    const [currentTab, setCurrentTab] = react.useState(tabsText[TABS[0]])

    //loading
    const [loadingPro, setLoadingPro] = react.useState(true)
    const [loadingCat, setLoadingCat] = react.useState(true)


    //category
    const [categories, setCategories] = react.useState([])
    //get categories(ring etc) based on tab (gender)
    react.useEffect(() => {
        async function getCategory() {
            try {
                const response = await fetch(
                    `http://localhost:5000/genderCategories?gender=${currentTab}`
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

        getCategory()

    }, [currentTab])

    //metals
    const [metals, setMetals] = react.useState([])
    //get metals
    react.useEffect(() => {

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

    //products
    const [products, setProducts] = react.useState([])
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

        getProducts()

    }, [])

    //filters
    const [metalFilter, setMetalFilter] = react.useState('all')
    const [catFilter, setCatFilter] = react.useState('all')

    //reset filters when tab changes
    react.useEffect(() => {
        setCatFilter('all')
        setMetalFilter('all')
    }, [currentTab])


    return (
        <Shop

            loadingPro={loadingPro}
            loadingCat={loadingCat}
            setLoadingPro={setLoadingPro}
            setLoadingCat={setLoadingCat}

            TABS={TABS}
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}

            categories={categories}
            products={products}
            metals={metals}

            allowFilter={true}
            filters={[
                {
                    text: "Metal",
                    options: metals,
                    value: metalFilter,
                    setFilter: setMetalFilter
                },
                {
                    text: "Category",
                    options: categories,
                    value: catFilter,
                    setFilter: setCatFilter
                }

            ]}

            onAddItem={addItemInCart}
            removeItem={removeItemInCart}
            cartItems={cartItems.map(i => i.id)}
        />
    )

}