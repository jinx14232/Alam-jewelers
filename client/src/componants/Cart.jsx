import { useNavigate } from "react-router-dom";
import { titleCase } from "../Utility"
function Cart(props) {

    const navigate = useNavigate()
    const whatsappNumber = "923333867934";
    const generateWhatsAppMessage = () => {

        const items = props.cartItems.map((item, index) => {

            return `${index + 1}. ${item.name}
        Collection: ${item.gender} Category: ${item.category} 
        Price: Rs. ${item.price}
        url: ${window.location.origin}/product/${item.id}     `
            }).join('\n');

        const message = `Assalam-o-Alaikum! 
I would like to inquire about the following products:

${items}

Please provide further details about availability and ordering.

Thank you!
Alam Jewelers`;

        return encodeURIComponent(message);
    };


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

                    <div className="item" key={i.id + idx} onClick={() => {props.handleCloseCart(); navigate(`/product/${i.id}`)}}>

                        <img src={i.images[0].image_url} alt={i.name} className="cover img" />

                        <div>
                            <strong>{titleCase(i.name)}</strong>
                            <div className="meta">{i.price} -/Rs</div>
                            <button className="remove-item" onClick={(e) => {e.stopPropagation(); props.removeItem(i.id)}}>Remove</button>
                        </div>
                    </div>

                ))}

            </div>

            {props.cartItems.length > 0 && (

                <footer>
                    <button className="btn whatsapp" onClick={
                        () => {
                            const message = generateWhatsAppMessage()
                            const url = `https://wa.me/${whatsappNumber}?text=${message}`;
                            window.open(url, '_blank');
                        }
                    }>
                        Ask on WhatsApp
                    </button>
                    <p>No payment is taken here. We will reply with availability and price.</p>
                </footer>

            )}

        </section>
    )
}
export default Cart