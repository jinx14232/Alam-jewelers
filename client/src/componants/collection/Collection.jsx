import Shop from './Shop.jsx'
import { useOutletContext } from 'react-router-dom'

export default function Collection (){
    const {
        addItemInCart,
        removeItemInCart,
        cartItems
    } = useOutletContext()
    
    return(
        <Shop
          onAddItem = {addItemInCart}
          removeItem = {removeItemInCart}
          cartItems = {cartItems.map(i=> i.id)}
        />
    )

}