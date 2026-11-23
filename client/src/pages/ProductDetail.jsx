
import React from 'react';
import { useParams } from 'react-router-dom';
import { apiFetch } from '../api.js';
import ProductDetails from '../../../shared/ProductDetails.jsx';

export default function ProductDetail() {

    const { id } = useParams();
    const [product, setProduct] = React.useState({})
    const [loading, setLoading] = React.useState(true)

    React.useEffect(() => {

        async function getProduct() {
            try {
                
                const response = await apiFetch(`/client/product/${id}`)

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

    const breadCrumbs = [
        {
            name: 'Home',
            link: '/'
        },
        {
            name: audience[product.gender],
            link: `/collection?tab=${product.gender}`
        },
        {
            name: product.category,
            link: `/collection?tab=${product.gender}`
        },
        {
            name: product.code,
            link: ''
        }

    ]
    return (
        <ProductDetails
            loading = {loading}
            breadCrumbs ={breadCrumbs}
            product={product}
        />
    )
}