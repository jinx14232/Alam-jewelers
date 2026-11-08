import Tabs from './Tabs.jsx'
import react from 'react'
import Catgory from './Catgory.jsx'
import { tabsText } from '../../Utility.js'

function Shop(props) {

    
    return (
        <section className='shop'>

            <Tabs
                tabs={props.TABS}
                currentTab={props.currentTab}
                handleClick={(e) => {
                    if (props.currentTab == tabsText[e.currentTarget.innerText])
                        return
                    if(props.setLoadingCat)props.setLoadingCat(true)
                    props.setCurrentTab(tabsText[e.currentTarget.innerText])
                }
                }
            />

            <Catgory

                currentTab={props.currentTab}

                categories={props.categories}
                products={props.products}

                allowFilter={props.allowFilter}
                filters={props.filters}

                loadingPro={props.loadingPro}
                loadingCat={props.loadingCat}

                onAddItem={props.onAddItem}
                removeItem={props.removeItem}
                cartItems={props.cartItems}
            />

        </section>
    )
}

export default Shop