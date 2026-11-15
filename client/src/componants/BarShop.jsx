import Tabs from './Tabs.jsx'
import react from 'react'
import BarCatelog from './BarCatelog.jsx'
import { tabsText } from '../Utility.js'
import { useSearchParams } from 'react-router-dom'

function BarShop() {

    const [searchParams, setSearchParams] = useSearchParams();

    //tabs
    const TABS = ['Gold', 'Silver']
    const currentTab = searchParams.get('tab') || tabsText[TABS[0]]

    return (
        <section className='shop'>

            <Tabs
                tabs={TABS}
                currentTab={currentTab}
                handleClick={(e) => {
                    if (currentTab == tabsText[e.currentTarget.innerText])
                        return
                    setSearchParams({ tab: tabsText[e.currentTarget.innerText]})
                }
                }
            />

            <BarCatelog
                currentTab={currentTab}
            />

        </section>
    )
}

export default BarShop