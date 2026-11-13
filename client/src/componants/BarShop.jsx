import Tabs from './Tabs.jsx'
import react from 'react'
import BarCatelog from './BarCatelog.jsx'
import { tabsText } from '../Utility.js'

function BarShop(props) {

    //tabs
    const TABS = ['Gold', 'Silver']
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

            <BarCatelog
                currentTab={currentTab}
                onAddItem={props.onAddItem}
                removeItem={props.removeItem}
                cartItems={props.cartItems}
            />

        </section>
    )
}

export default BarShop