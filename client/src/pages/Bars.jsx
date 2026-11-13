import { useOutletContext } from 'react-router-dom'
import BarShop from '../componants/BarShop.jsx'
import Hero from '../componants/Hero.jsx'

export default function Bars() {
    
    const {
        addItemInCart,
        removeItemInCart,
        cartItems
    } = useOutletContext()
    

    return (
        <>
        <Hero/>
        <BarShop
            onAddItem={addItemInCart}
            removeItem={removeItemInCart}
            cartItems={cartItems.map(i => i.id)}
        />
        </>
    )

}