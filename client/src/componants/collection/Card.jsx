import {titleCase} from '../../Utility.js'

function Card(props) {

    return (

        <button className="card" onClick={()=> props.onOpen(props.product)}>
            
            <img src={props.product.images?props.product.images[0].image_url:props.product.image_url} alt={props.product.name} className='cover' /> 

            <div className="data">
                <h3 className={props.product.metal? 'bar-name': ''}>{titleCase(props.product.name)}</h3>
                <div className="meta">Price {props.product.price} -/Rs</div>
            </div>

        </button>
    )
}

export default Card
