import { Link } from 'react-router-dom';


export default function ({ bar }) {


    return (
        <Link className="card" to={`/product/${bar.id}`}>

            <img src={bar.image_url} className='cover' />

            <div className="data">
                <h3
                    className='bar-name'
                >{bar.name}</h3>

                <p className="meta">Price {bar.price} -/Rs</p>
                <p className="meta">{bar.metal}</p>

            </div>

        </Link>
    )
}