import {titleCase} from '../Utility.js'
import { Link } from 'react-router-dom';

function Card(props) {

    return (

        <Link className="card" to={`/product/${props.product.id}`}>
            
            <img src={props.product.image_url} alt={props.product.name} className='cover' /> 

            <div className="data">
                <h3 className={!props.product.gender? 'bar-name': ''}>{titleCase(props.product.name)}</h3>
                <div className="meta">Price {props.product.price} -/Rs</div>
            </div>

        </Link>
    )
}

export default Card
