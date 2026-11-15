import { Link } from 'react-router-dom';
import ProductGallery from '../componants/ProductGallery.jsx';
import ProductInfo from '../componants/ProductInfo.jsx';
import React from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../componants/Loader.jsx';
import { apiFetch } from '../api.js';

export default function ProductDetail() {

    const { id } = useParams();
    const [product, setProduct] = React.useState({})
    const [loading, setLoading] = React.useState(true)

    React.useEffect(() => {

        async function getProduct() {
            try {
                
                const response = await apiFetch(`/product/${id}`)

                if (!response.ok) {
                    throw new Error('Failed to fetch bars')
                }

                const data = await response.json()
                console.log('recieved product: ', data)
                setProduct(data)

            } catch (error) {
                console.error(error)
                alert('Error occured')
            }
            finally {
                setLoading(false)
            }
        }
        getProduct()

    }, [id])

    const audience = {
        women: 'Women',
        men: 'Men',
        newBorn: 'New Born'
    }

    return (
        <section className="product-details">

            <div className="breadcrumbs">

                <Link to="/">Home</Link>
                <span>/</span>

                <Link to={`/collection?tab=${product.gender}`}>
                    {audience[product.gender]}
                </Link>
                <span>/</span>

                <Link to={`/collection?tab=${product.gender}`}>
                    {product.category}
                 </Link>
                 <span>/</span>

                <span className="current">{product.name}</span>
            </div>

            <div className="product-layout">

                {loading ? <Loader /> :
                    <>
                        <ProductGallery
                            images={product['images']}
                        />

                        <ProductInfo
                            product={product}
                        />
                    </>
                }

            </div>

        </section>
    );
}