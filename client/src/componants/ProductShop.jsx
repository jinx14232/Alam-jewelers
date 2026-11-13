import Tabs from './Tabs.jsx'
import react from 'react'
import ProductCatelog from './ProductCatelog.jsx'
import { tabsText } from '../Utility.js'

function ProductShop(props) {

    //tabs
    const TABS = ['Women', 'Men', 'New Born']
    const [currentTab, setCurrentTab] = react.useState(tabsText[TABS[0]])

    
    return (
        <section className='shop'>

            <Tabs
                tabs={TABS}
                currentTab={currentTab}
                handleClick={(e) => {
                    if (currentTab == tabsText[e.currentTarget.innerText])
                        return
                    setCurrentTab(tabsText[e.currentTarget.innerText])
                }
                }
            />

            <ProductCatelog
                currentTab={currentTab}
                onAddItem={props.onAddItem}
                removeItem={props.removeItem}
                cartItems={props.cartItems}
            />

        </section>
    )
}

export default ProductShop