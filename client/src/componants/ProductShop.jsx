import Tabs from './Tabs.jsx'
import react from 'react'
import ProductCatelog from './ProductCatelog.jsx'
import { tabsText } from '../Utility.js'
import { useSearchParams } from 'react-router-dom'

function ProductShop() {

    const [searchParams, setSearchParams] = useSearchParams();

    //tabs
    const TABS = ['Women', 'Men', 'New Born']
    const currentTab = searchParams.get('tab') || tabsText[TABS[0]]
    console.log('current tab' ,currentTab)

    return (
        <section className='shop'>

            <Tabs
                tabs={TABS}
                currentTab={currentTab}
                handleClick={(e) => {
                    if (currentTab == tabsText[e.currentTarget.innerText])
                        return
                    console.log('setting tab ', e.currentTarget.innerText, tabsText[e.currentTarget.innerText])
                    setSearchParams({ tab: tabsText[e.currentTarget.innerText]})
                }
                }
            />

            <ProductCatelog
                currentTab={currentTab}
            />

        </section>
    )
}

export default ProductShop