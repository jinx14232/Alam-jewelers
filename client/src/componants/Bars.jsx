import Shop from './collection/Shop.jsx'
import { useOutletContext } from 'react-router-dom'
import react from 'react'
import { tabsText } from '../Utility.js'

export default function Bars() {
    
    const {
        addItemInCart,
        removeItemInCart,
        cartItems
    } = useOutletContext()

    //tabs
    const TABS = ['Gold', 'Silver']
    const [currentTab, setCurrentTab] = react.useState(tabsText[TABS[0]])

    //category
    const [categories, setCategories] = react.useState([{name: 'Bars', id: -1}])
    

    //bars
    const [bars, setBars] = react.useState([])
    //get products
    react.useEffect(() => {
        async function getBars() {
            try {
                const response = await fetch(
                    'http://localhost:5000/bars'
                )

                if (!response.ok) {
                    throw new Error('Failed to fetch bars')
                }

                const data = await response.json()
                console.log('recieved bars: ', data)
                setBars(data)

            } catch (error) {
                console.error(error)
                alert('Error occured')
            }
            finally {
                setLoadingPro(false)
            }
        }

        getBars()

    }, [])

    //loading
    const [loadingPro, setLoadingPro] = react.useState(true)

    return (
        <Shop

            loadingPro={loadingPro}
            loadingCat={null}
            setLoadingPro={setLoadingPro}
            setLoadingCat={null}

            TABS={TABS}
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}

            categories={categories}
            products={bars}
            metals={null}

            allowFilter={false}
            filters={null}

            onAddItem={addItemInCart}
            removeItem={removeItemInCart}
            cartItems={cartItems.map(i => i.id)}
        />
    )

}