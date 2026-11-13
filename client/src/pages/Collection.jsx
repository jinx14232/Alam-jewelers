import { useOutletContext } from 'react-router-dom'
import Hero from '../componants/Hero.jsx'
import ProductShop from '../componants/ProductShop.jsx'

export default function Collection() {

    const {
        addItemInCart,
        removeItemInCart,
        cartItems
    } = useOutletContext()


    return (
        <>
        <Hero/>
        <ProductShop
            onAddItem={addItemInCart}
            removeItem={removeItemInCart}
            cartItemsID={cartItems.map(i => i.id)}
        />
        </>
    )

}