import Header from "./Header"
import react from "react"
import Loader from "./Loader"
import Inventory from "./Inventory"
import { apiFetch } from "../api"
import Overview from "./Overview"
import Featured from "./Featured"
import { useState } from "react"

export default function () {

    const [loadingInv, setLoadingInv] = react.useState(true)
    const [featuring, setFeaturing] = useState(false)

    const [products, setProducts] = react.useState([])
    const [bars, setBras] = react.useState([])

    const [invTracker, setInvTracker] = react.useState(0)

    react.useEffect(() => {
        setLoadingInv(true)
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
    }, [invTracker])

    async function handleFeature(id, isFeatured, isProduct) {

        setFeaturing(true)

        try {

            const response = isProduct? await apiFetch(`/admin/updateFeatureProduct`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id,
                    isFeatured: !isFeatured
                })
            }) :
            await apiFetch(`/admin/updateFeatureBar`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id,
                    isFeatured: !isFeatured
                })
            })
               
            if (!response.ok) {
                alert('Error occoured')
                throw new Error('Failed to feature product')
            }

            const res = await response.json()
            alert(res.message)

            onFeature(id, isProduct, !isFeatured)

        } catch (error) {

            console.log(error)
            alert('Error occoured')

        } finally {
            setFeaturing(false)
        }
    }

    function onFeature(id, isProduct, isFeatured) {

        if (isProduct)
            setProducts(prev =>
                prev.map(product =>
                    product.id === id
                        ? { ...product, isFeatured: isFeatured }
                        : product
                )
            )
        else
            setBras(prev =>
                prev.map(product =>
                    product.id === id
                        ? { ...product, isFeatured: isFeatured }
                        : product
                )
            )
    }


    const featuredProducts = products.filter(
        product => product.isFeatured
    )

    const featuredBars = bars.filter(
        bar => bar.isFeatured
    )
    console.log(featuredProducts)

    return (
        <>
            {featuring && <Loader />}
            <div className="admin-page">

                <Header
                    heading='Dashboard'
                    subHeading='Recent Activities!'
                />

                <Overview tracker={invTracker} />

                <Featured
                    products={featuredProducts}
                    bars={featuredBars}
                    onFeature={handleFeature}
                />

                <Inventory
                    products={products}
                    bars={bars}
                    loadingItems={loadingInv}
                    setInvTracker={setInvTracker}
                    onFeature={handleFeature}
                />

            </div>
        </>
    )
}

// const [featureTracker, setFeatureTracker] = react.useState(0)
// const [loadingFeat, setLoadingFeat] = react.useState(true)
// const [featureIds, setFeatureIds] = react.useState([])

// react.useEffect(() => {
//     setLoadingFeat(true)
//     async function getFeatureProducts() {

//         try {

//             const response = await apiFetch('/admin/featured')

//             if (!response.ok) {
//                 throw new Error('Failed to fetch featured products')
//             }

//             const res = await response.json()
//             setFeatureProducts(res.featuredProducts)
//             setFeatureIds(res.ids)
//             console.log(res, featureIds)

//         } catch (error) {
//             console.error(error)
//             alert('Error occored in featured')
//         } finally {
//             setLoadingFeat(false)
//         }

//     }
//     getFeatureProducts()
// }, [featureTracker])