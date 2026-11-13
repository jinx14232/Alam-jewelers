import { Link } from 'react-router-dom';


export default function ({ product }) {

    return (
        <Link className="card" to={`/product/${product.id}`}>
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

        </Link>
    )
}