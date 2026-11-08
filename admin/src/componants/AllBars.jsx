
import { NavLink } from 'react-router-dom'
import Header from './Header'
import react from 'react'
import Loader from './Loader'


export default function () {

    const [bars, setBars] = react.useState([])
    const [loading, setLoading] = react.useState(true)

    react.useEffect(() => {

        async function getBars() {
            try {
                const response = await fetch(`http://localhost:5000/allBars`)

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
                                            bars.map(item => (
                                                <div>
                                                    <div className="card" key={item.id}>

                                                        <img src={item.image_url} className='cover' />

                                                        <div className="data">
                                                            <h3
                                                                className='bar-name'
                                                            >{item.name}</h3>

                                                            <div className="meta">Price {item.price} -/Rs</div>

                                                        </div>

                                                        <button className="delete" onClick={() => handleDelete(item.id)}>Delete</button>

                                                    </div>
                                                    <p className='time'>{item.time}</p>
                                                </div>

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