import { Link } from 'react-router-dom';
import ProductGallery from '../componants/ProductGallery.jsx'
import BarInfo from '../componants/BarInfo.jsx';
import React from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../componants/Loader.jsx';
import { apiFetch } from '../api.js';

export default function BarDetail() {

    const { id } = useParams();
    const [bar, setBar] = React.useState({})
    const [loading, setLoading] = React.useState(true)

    React.useEffect(() => {

        async function getBar() {
            try {
                
                const response = await apiFetch(`/client/bar/${id}`)

                if (!response.ok) {
                    throw new Error('Failed to fetch bars')
                }

                const data = await response.json()
                console.log('recieved bar: ', data)
                setBar(data)

            } catch (error) {
                console.error(error)
                alert('Error occured')
            }
            finally {
                setLoading(false)
            }
        }
        getBar()

    }, [id])

    return (
        <section className="product-details">

            <div className="breadcrumbs">

                <Link to="/">Home</Link>
                <span>/</span>

                <Link to={`/bars`}>
                    Bars
                </Link>
                <span>/</span>

                <Link to={`/bars?tab=${bar.metal}`}>
                    {bar.metal}
                 </Link>
                 <span>/</span>

                <span className="current bar-name">{bar.code}</span>
            </div>

            <div className="product-layout">

                {loading ? <Loader /> :
                    <>
                        <ProductGallery
                            images={[{image_url: bar.image_url}]}
                        />

                        <BarInfo
                            bar={bar}
                        />
                    </>
                }

            </div>

        </section>
    );
}