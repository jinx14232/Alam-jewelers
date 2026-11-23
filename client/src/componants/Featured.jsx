import Loader from './Loader'
import DetailProductCard from './DetailProductCard'
import DetailBarCard from './DetailBarCard'
import { apiFetch } from '../api'
import react from 'react'


export default function Featured() {

    const [recents, setRecents] = react.useState({})
    const [loading, setLoading] = react.useState(true)

    react.useEffect(() => {
        async function gettInv() {

            try {

                const response = await apiFetch('/client/featured')

                if (!response.ok) {
                    throw new Error('Failed to fetch products')
                }

                const res = await response.json()
                setRecents(res)

            } catch (error) {
                console.error(error)
                alert('Error occored in inventory')
            } finally {
                setLoading(false)
            }

        }
        gettInv()
    }, [])

    console.log('recents ',recents)

    return (
        <>
            <section className="home-section">
                <h2>Latest Uploads</h2>
                {loading ? <Loader /> :
                    <div className="grid-wrap">
                        {
                            (recents.bars?.length == 0 &&
                                recents.products.length == 0) ? <p>No recents upload</p> :

                                <div className="home-grid">
                                    {recents.products?.map((product, id) => (
                                        <DetailProductCard
                                            key={id}
                                            product={product}

                                        />
                                    ))}
                                    {recents.bars?.map((bar, id) => (
                                        <DetailBarCard
                                            key={id}
                                            bar={bar}
                                        />
                                    ))}

                                </div>
                        }

                    </div>
                }

            </section>
        </>
    )
}