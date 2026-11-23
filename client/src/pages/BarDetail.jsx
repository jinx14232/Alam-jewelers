import ProductGallery from '../../../shared/ProductGallery.jsx'
import BarInfo from '../componants/BarInfo.jsx';
import React from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../componants/Loader.jsx';
import { apiFetch } from '../api.js';
import BreadCrumbs from '../../../shared/BreadCrumbs.jsx';

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

    const breadCrumbs = [
        {
            name: 'Home',
            link: '/'
        },
        {
            name: 'Bars',
            link: `/bars`
        },
        {
            name: bar.metal,
            link: `/bars?tab=${bar.metal}`
        },
        {
            name: bar.code,
            link: ''
        }

    ]

    return (
        <section className="product-details">

            <BreadCrumbs
                breadCrumbs={breadCrumbs}
            />

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