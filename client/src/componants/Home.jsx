import react from 'react'
import Loader from './Loader'
import { useNavigate, NavLink } from 'react-router-dom';

export default function () {

    const [recents, setRecents] = react.useState({})
    const [loading, setLoading] = react.useState(true)
    const navigate = useNavigate()

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
                                            <button className="card" key={id}  onClick={() => navigate('/collection')}>

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
                                            <button className="card" key={id}  onClick={() => navigate('/bars')}>

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
                            <NavLink to='/collection' className='btn'>
                                Explore
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
                            <h1>Golden Silver Bars</h1>
                            <p>Take a look at Bars collection.</p>
                           <NavLink to='/bars' className='btn'>
                                Bars
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