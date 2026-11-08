import react from 'react'
import Loader from './Loader'

export default function () {

    const [recents, setRecents] = react.useState({})
    const [loading, setLoading] = react.useState(true)

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

    console.log(recents)

    return (
        <>
            <section className="home">
                <section className="home-section">
                    <h2>Latest Uploads</h2>

                    {loading ? <Loader /> :
                        <div className="grid-wrap">
                            {
                                (recents.bars.length == 0 &&
                                    recents.products.length == 0) ? <p>No recents upload</p> :
                                    <div className="home-grid">
                                        {recents.products.map((product, id) => (
                                            <button className="card" key={id}>

                                                <img src={product.image_url} className='cover' />

                                                <div className="data">
                                                    <h3
                                                        style={{ marginBottom: '10px' }}
                                                    >{product.name}</h3>

                                                    <div className="meta">Price {product.price} -/Rs</div>


                                                    <p className="meta">
                                                        {product.audience} · {product.category}
                                                    </p>
                                                    <p className="meta">
                                                        {product.metals}
                                                    </p>

                                                </div>

                                            </button>
                                        ))}
                                        {recents.bars.map((product, id) => (
                                            <button className="card" key={id}>

                                                <img src={product.image_url} className='cover' />

                                                <div className="data">
                                                    <h3
                                                        className='bar-name'
                                                    >{product.name}</h3>

                                                    <div className="meta">Price {product.price} -/Rs</div>

                                                </div>

                                            </button>
                                        ))}

                                    </div>
                            }

                        </div>
                    }


                </section>
                <section className="home-section">
                    <div className="poster-con">
                        <div className="content">
                            <h1>Finest Collection</h1>
                            <p>Explore out top rated collection with ratings</p>
                            <a className="btn">
                                Explore
                            </a>
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
                        <div className="box" style={{ backgroundImage: 'url("../public/men.jpeg")' }}>
                            <h2>Men</h2>
                        </div>
                        <div className="box" style={{ backgroundImage: 'url("../public/women.jpeg")' }}>
                            <h2>Women</h2>
                        </div>
                        <div className="box" style={{ backgroundImage: 'url("../public/baby.jpeg")' }}>
                            <h2>New Born</h2>
                        </div>
                    </div>

                </section>

                <section className="home-section">
                    <div className="poster-con">
                        <div className="content">
                            <h1>Golden Silver Bars</h1>
                            <p>Take a look at Bars collection.</p>
                            <a className="btn">
                                Bars
                            </a>
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