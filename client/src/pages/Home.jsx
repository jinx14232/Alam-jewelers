import react from 'react'
import Loader from '../componants/Loader'
import DetailProductCard from '../componants/DetailProductCard';
import DetailBarCard from '../componants/DetailBarCard';
import { NavLink } from 'react-router-dom';
import Hero from '../componants/Hero';


export default function () {

    const [recents, setRecents] = react.useState({})
    const [loading, setLoading] = react.useState(true)

    react.useEffect(() => {
        async function gettInv() {

            try {

                const response = await fetch(
                    'http://localhost:5000/inventory?limit=3'
                )

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
            <Hero/>
            <section className="home">
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
                <section className="home-section">
                    <div className="poster-con">
                        <div className="content">

                            <NavLink to='/collection'>
                                <h1>Finest Collection</h1>
                                <p>Explore out top rated collection with ratings</p>
                                <div className="btn">Explore</div>
                            </NavLink>
                        </div>
                        <video autoPlay
                            muted
                            loop
                            playsInline src="/video.mp4" />
                    </div>
                </section>

                <section className="home-section">
                    <h2>Categories</h2>
                    <div className="text">
                        <p>Want a ring for a new born? Perhaps a gift of rings?</p>
                        <p>Find what you want with easy distributions</p>
                    </div>
                    <div className="wrap">
                        <div className="box">
                            <NavLink to='/collection'>
                                Men
                            </NavLink>
                            <img src="../public/men.jpeg" alt="image" />

                        </div>
                        <div className="box">
                            <NavLink to='/collection'>
                                Women
                            </NavLink>
                            <img src="../public/women.jpeg" alt="image" />

                        </div>
                        <div className="box">
                            <NavLink to='/collection'>
                                New Born
                            </NavLink>
                            <img src="../public/baby.jpeg" alt="image" />
                        </div>
                    </div>

                </section>

                <section className="home-section">
                    <div className="poster-con">
                        <div className="content">
                            <NavLink to='/bars'>
                                <h1>Golden Silver Bars</h1>
                                <p>Take a look at Bars collection.</p>
                                <div className="btn">Bars</div>
                            </NavLink>
                        </div>
                        <video autoPlay
                            muted
                            loop
                            playsInline src="/video2.mp4" />
                    </div>
                </section>

            </section>
        </>
    )
}