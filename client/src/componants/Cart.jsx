
import { titleCase } from "../Utility"
function Cart(props) {

    return (

        <section className="cart-drawer">

            <header>
                <h2>Your Cart</h2>
                <button className="x" style={{ position: "static" }} onClick={props.handleCloseCart}>×</button>
            </header>

            <div className="cart-count">
                <p>You current have {props.cartItems.length} items</p>
            </div>

            <div className="items">
                {props.cartItems.length == 0 && <p className="empty">Your cart is empty.</p>}
                
                {props.cartItems.map((i, idx) => (

                    <div className="item" key={i.id + idx} onClick={()=> console.log('clicked')}>

                        <img src={i.images[0].image_url} alt={i.name} className="cover img" /> 

                        <div>
                            <strong>{titleCase(i.name)}</strong>
                            <div className="meta">{i.gold_purity} · {i.weight_grams}g</div>
                            <button className="remove-item" onClick={()=>props.removeItem(i.id)}>Remove</button>
                        </div>
                    </div>

                ))}
                
            </div>

            {props.cartItems.length > 0 && (

                <footer>
                    <a className="btn whatsapp" >
                        Send Query on WhatsApp
                    </a>
                    <p>No payment is taken here. We will reply with availability and price.</p>
                </footer>

            )}

        </section>
    )
}
export default Cart