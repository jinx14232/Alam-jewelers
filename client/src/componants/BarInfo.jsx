import { useOutletContext } from 'react-router-dom'

export default function BarInfo({ bar }) {

    const {
        addItemInCart,
        removeItemInCart,
        cartItems
    } = useOutletContext()

    const isInCart = cartItems.some(
        item => item.code === bar.code
    )

    const whatsappNumber = "923135452115"
    const handleWhatsAppCheckout = () => {
        console.log('sending')
        const productUrl = `${window.location.origin}/bar/${bar.id}`;
        const message = `
                Assalam-o-Alaikum!      
                I would like to inquire about the following bar:
                ${bar.name}
                ${productUrl}
                Please share the details. Thank you!
            `

        const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
        window.open(url, '_blank')

    };

    return (
        <div className="product-info">

            <div className="product-meta">
                <span>{bar.metal} Bar</span>
            </div>

            <div className="product-heading bar-name">
                <h1>{bar.name}</h1>

                <h2>
                    {bar.code}
                </h2>
            </div>

            <div className="metal-details">
                <h2>Bar Details</h2>
                <div className="spec-container">
                     <table className="info">

                        <tbody>

                            {bar.metal == 'gold' &&
                                <tr>
                                    <td>Purity: </td>
                                    <td>{bar.karat}K</td>
                                </tr>
                            }
                            <tr>
                                <td>Weight: </td>
                                <td>{bar.weight} {bar.weight_unit}</td>
                            </tr>
                            <tr>
                                <td>Fineness: </td>
                                <td>{bar.fineness}</td>
                            </tr>
                            <tr>
                                <td>Brand: </td>
                                <td>{bar.brand}</td>
                            </tr>

                        </tbody>

                    </table>

                </div>

            </div>

            <div className="product-actions">

                <div className="buttons">
                    <button
                        className="action-btn add-cart"
                        onClick={
                            () => {
                                isInCart ?
                                    removeItemInCart(bar.code) :
                                    addItemInCart(bar)
                            }
                        }
                    >
                        {
                            isInCart ?
                                'Remove from cart' :
                                'Add to cart'
                        }
                    </button>

                    <button
                        className="action-btn whatsapp"
                        onClick={handleWhatsAppCheckout}
                    >
                        Ask On Whatsapp
                    </button>
                </div>

                <p>
                    Interested in this piece? Contact us on WhatsApp
                    for further details.
                </p>

            </div>

        </div>
    );
}
