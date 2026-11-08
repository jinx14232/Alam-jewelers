import Header from "./Header"
import react from "react"
import Loader from "./Loader"
import Inventory from "./Inventory"

export default function () {

    const [data, setData] = react.useState({})
    const [loading, setLoading] = react.useState(true)
    const [loadingInv, setLoadingInv] = react.useState(true)

    const [products, setProducts] = react.useState({})
    const [bars, setBras] = react.useState({})

    const [tracker, setTracker] = react.useState(0)

    react.useEffect(() => {
        async function gettData() {

            try {

                const response = await fetch(
                    'http://localhost:5000/overview'
                )

                if (!response.ok) {
                    throw new Error('Failed to fetch products')
                }

                const res = await response.json()
                setData(res)

            } catch (error) {
                console.error(error)
                alert('Error occored')
            } finally {
                setLoading(false)
            }

        }
        gettData()
    }, [tracker])

    react.useEffect(() => {
        async function gettInv() {

            try {

                const response = await fetch(
                    'http://localhost:5000/inventory?limit=5'
                )

                if (!response.ok) {
                    throw new Error('Failed to fetch products')
                }

                const res = await response.json()
                console.log('recieved data: ', res)
                setProducts(res.products)
                setBras(res.bars)

            } catch (error) {
                console.error(error)
                alert('Error occored in inventory')
            } finally {
                setLoadingInv(false)
            }

        }
        gettInv()
    }, [tracker])



    const labels = {
        women: 'Women',
        men: 'Men',
        newBorn: 'New Born'
    }

    return (
        <>
            <div className="admin-page">
                <Header
                    heading='Dashboard'
                    subHeading='Recent Activities!'
                />

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

                {!loadingInv ?
                    <Inventory
                        products={products}
                        bars={bars}
                        onViewAll={(type) => {
                            // Navigate to the relevant inventory page
                        }}
                        setTracker={setTracker}
                    />
                    : <Loader />}


            </div>
        </>
    )
}