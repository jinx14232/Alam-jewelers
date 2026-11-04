import Header from './componants/Header.jsx'
import Hero from './componants/Hero.jsx'
import Shop from './componants/Shop.jsx'
import Footer from './componants/Footer.jsx'
import Cart from './componants/Cart.jsx'
import Splash from './componants/Splash.jsx'
import Sidebar from './componants/Sidebar.jsx'
import react, { useEffect } from 'react'

function App() {

  const [showCart, setShowCart] = react.useState(false)
  const [cartItems, setCartItems] = react.useState([])

  function addItemInCart(product){

    setCartItems(prevItems=>{
      return [...prevItems, product]
    })

    setShowCart(true)

  }
  function removeItemInCart(productID){

    setCartItems(prevItems=>
        prevItems.filter(item=>
          item.id != productID
        )
    )

  }

  const [menuOpen, setMenuOpen] = react.useState(false)

  return (
    <>
    <Splash/>
    <Header
        onCartClick = {()=> setShowCart(true)}
        setMenuOpen={setMenuOpen}
     />
     <main>
        <Hero/>
        <Shop
          onAddItem = {addItemInCart}
          removeItem = {removeItemInCart}
          cartItems = {cartItems.map(i=> i.id)}
        />
     </main>
     <Footer/>

     {menuOpen && 
     <>
        <div className="ov" style={{ zIndex: 45 }} onClick={() => setMenuOpen(false)} />
        <Sidebar setMenuOpen = {()=>setMenuOpen(false)}/>
      </>
     }

     {showCart && 
     <>
        <div className="ov" style={{ zIndex: 45 }} onClick={() => setShowCart(false)} />
        <Cart
          handleCloseCart = {()=> setShowCart(false)}
          cartItems = {cartItems}
          removeItem = {removeItemInCart}
        />
      </>
     }

    </>
  )
}

export default App


