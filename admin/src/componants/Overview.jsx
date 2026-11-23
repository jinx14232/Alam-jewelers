import react from "react"
import Loader from "./Loader"
import { apiFetch } from "../api"

export default function Overview({tracker}) {

    const [data, setData] = react.useState({})
    const [loading, setLoading] = react.useState(true)

    react.useEffect(() => {
            async function gettData() {
                try {
    
                    const response = await apiFetch(
                        '/admin/overview'
                    )
    
                    if (!response.ok) {
                        throw new Error('Something went wrong in request! Failed to get overview')
                    }
    
                    const res = await response.json()
                    setData(res)
    
                } catch (error) {
                    console.error(error)
                    alert('Something went wrong! Failed to get overview')
                } finally {
                    setLoading(false)
                }
    
            }
            gettData()
        }, [tracker])

        const labels = {
        women: 'Women',
        men: 'Men',
        newBorn: 'New Born'
    }

    return (
        <>
            <section className="add-form">
                <section className="form-section">
                    <h2>Overview</h2>
                    {!loading ?
                        <section className="form-grid">
                            <div className="overview">
                                <h1>{data['totalProducts'][0].totalProducts}</h1>
                                <p>Total Products</p>
                            </div>
                            <div className="overview">
                                <h1>{data['totalBars'][0].totalBars}</h1>
                                <p>Total Bars</p>
                            </div>
                            <div className="overview">
                                <h1>{data['totalCat'][0].totalCat}</h1>
                                <p>Categories across Audiences</p>
                            </div>
                            <div className="overview">
                                <h1>{data['totalMetals'][0].totalMetals}</h1>
                                <p>Metals</p>
                            </div>
                        </section>
                        : <Loader />}

                </section>
                <section className="form-section">
                    <h2>Products By categories</h2>
                    {!loading ?
                        <>
                            {
                                data['categoryGroup'].map(item => (
                                    <div className="chart-item" key={item.audience}>

                                        <div className="chart-info">
                                            <span>{labels[item.audience]}</span>
                                            <span>{item.total}</span>
                                        </div>

                                        <div className="chart-track">
                                            <div
                                                className="chart-bar"
                                                style={{
                                                    width: `${(item.total / data['totalProducts'][0].totalProducts) * 100}%`
                                                }}
                                            />
                                        </div>

                                    </div>

                                ))
                            }
                        </>
                        : <Loader />}

                </section>
            </section>
        </>
    )
}