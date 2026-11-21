
import { NavLink } from 'react-router-dom'
import Header from './Header'
import react from 'react'
import Loader from './Loader'
import InventoryCard from './InventoryCard'
import { apiFetch } from '../api'


export default function () {

    const [bars, setBars] = react.useState([])
    const [loading, setLoading] = react.useState(true)

    react.useEffect(() => {

        async function getBars() {
            try {
                const response = await apiFetch(`/admin/allBars`)

                if (!response.ok) {
                    alert('Error occoured')
                    throw new Error('Failed to fetch bars')
                }

                const res = await response.json()
                setBars(res.bars)

            } catch (e) {
                console.log(error)
                alert('Error occoured')
            } finally {
                setLoading(false)
            }
        }
        getBars()

    }, [])

    return (
        <>
            <div className="admin-page">
                <div className="bread-crumbs">
                    <NavLink to="/admin" end>
                        Dashboard
                    </NavLink>
                    <span> / </span>
                    <NavLink to="/admin/inventory/bars" end>
                        All Bars
                    </NavLink>
                </div>
                <Header
                    heading='All Bars'
                    subHeading='Show Case of all uploaded gold and silver bars'
                />
                <section className="add-form">
                    <section className="form-section">
                        <h2>Gold/Silver Bars</h2>

                        {loading ? <Loader /> :
                            <>
                                {bars.length > 0 ?
                                    <div className="grid">

                                        {
                                            bars.map((item, id) => (
                                                <InventoryCard
                                                    key={id}
                                                    item={item}
                                                    activeTab="bars"
                                                />

                                            ))
                                        }

                                    </div>
                                    :
                                    <p className="empty-inventory">
                                        No items found.
                                    </p>
                                }
                            </>
                        }

                    </section>
                </section>

            </div>

        </>
    )
}