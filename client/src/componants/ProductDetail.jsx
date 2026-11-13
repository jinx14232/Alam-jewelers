import { Link } from 'react-router-dom';
import ProductGallery from './ProductGallery.jsx';
import ProductInfo from './ProductInfo.jsx';
import React from 'react';
import { useParams } from 'react-router-dom';
import Loader from './Loader.jsx';

export default function ProductDetail() {

    const { id } = useParams();
    const [product, setProduct] = React.useState({})
    const [loading, setLoading] = React.useState(true)

    React.useEffect(() => {

        async function getProduct() {
            try {
                const response = await fetch(
                    `http://localhost:5000/product/${id}`
                )

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

    return (
        <section className="product-details">

            <div className="breadcrumbs">
                <Link to="/">Home</Link>
                <span>/</span>
                <Link to="/collection">Shop</Link>
                <span>/</span>
                <span>Bangles</span>
                <span>/</span>
                <span className="current">Bangles 001</span>
            </div>

            <div className="product-layout">

                {loading ? <Loader /> :
                    <>
                        <ProductGallery
                            images={product['images']}
                        />

                        <ProductInfo
                            product={product}
                            onAddToCart={() => console.log('cart')}
                        />
                    </>
                }

            </div>

        </section>
    );
}