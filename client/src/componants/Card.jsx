import {titleCase} from '../Utility.js'
import { Link } from 'react-router-dom';

function Card(props) {

    return (

        <Link className="card" to={props.link}>
            
            <img src={props.product.image_url} alt={props.product.name} className='cover' /> 

            <div className="data">
                <h3 className={!props.product.gender? 'bar-name': ''}>{titleCase(props.product.name)}</h3>
                {
                    props.product.metal?
                    <div className="meta">{props.product.brand} . {props.product.weight} {props.product.unit}</div> :
                    <div className="meta">{props.product.gender} . {props.product.category}</div> 
                }
            </div>
        </Link>
    )
}

export default Card
