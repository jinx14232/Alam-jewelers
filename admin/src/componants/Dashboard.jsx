import Header from "./Header"
import react from "react"
import Loader from "./Loader"
import Inventory from "./Inventory"
import { apiFetch } from "../api"
import Overview from "./Overview"
import Featured from "./Featured"

export default function () {


    const [loadingInv, setLoadingInv] = react.useState(true)
    const [loadingFeat, setLoadingFeat] = react.useState(true)

    const [featureProducts, setFeatureProducts] = react.useState({})
    const [products, setProducts] = react.useState({})
    const [bars, setBras] = react.useState({})

    const [tracker, setTracker] = react.useState(0)

    const [featureIds, setFeatureIds] = react.useState([])

    react.useEffect(() => {
        async function getFeatureProducts() {

            try {

                const response = await apiFetch('/admin/featured')

                if (!response.ok) {
                    throw new Error('Failed to fetch featured products')
                }

                const res = await response.json()
                setFeatureProducts(res.featuredProducts)
                setFeatureIds(res.ids)
                console.log(res, featureIds)

            } catch (error) {
                console.error(error)
                alert('Error occored in featured')
            } finally {
                setLoadingFeat(false)
            }

        }
        getFeatureProducts()
    }, [tracker])

    react.useEffect(() => {
        async function gettInv() {

            try {

                const response = await apiFetch(
                    '/admin/inventory?limit=5'
                )

                if (!response.ok) {
                    throw new Error('Something went wrong in request! Failed to get inventory')
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



    return (
        <>
            <div className="admin-page">

                <Header
                    heading='Dashboard'
                    subHeading='Recent Activities!'
                />

                <Overview tracker={tracker} />

                {!loadingFeat ?
                    <Featured
                        products={featureProducts}
                    />
                    : <Loader />
                }

                {!loadingInv ?
                    <Inventory
                        products={products}
                        bars={bars}
                        featureIds={featureIds}
                        setTracker={setTracker}
                    />
                    : <Loader />}

            </div>
        </>
    )
}