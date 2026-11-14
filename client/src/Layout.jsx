import { Outlet } from 'react-router-dom'
import react from 'react'
import Header from './componants/Header.jsx'
import Footer from './componants/Footer.jsx'
import SplashScreen from './componants/Splash.jsx'
import Cart from './componants/Cart.jsx'
import Sidebar from './componants/Sidebar.jsx'
import { useEffect, useState } from 'react'

export default function () {

    const [showCart, setShowCart] = react.useState(false)

    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem('cart');

        return savedCart ? JSON.parse(savedCart) : [];
    })

    function addItemInCart(product) {

        setCartItems(prevItems => {
            return [...prevItems, product]
        })

        setShowCart(true)

    }

    function removeItemInCart(productID) {

        setCartItems(prevItems =>
            prevItems.filter(item =>
                item.id != productID
            )
        )

    }

    const [menuOpen, setMenuOpen] = react.useState(false)

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems])

    return (
        <>
            <SplashScreen />
            <Header
                onCartClick={() => setShowCart(true)}
                setMenuOpen={setMenuOpen}
            />
            <main>
                <Outlet context={
                    {
                        addItemInCart,
                        removeItemInCart,
                        cartItems
                    }
                } />
            </main>

            <Footer />

            {menuOpen &&
                <>
                    <div className="ov" style={{ zIndex: 45 }} onClick={() => setMenuOpen(false)} />
                    <Sidebar setMenuOpen={() => setMenuOpen(false)} />
                </>
            }

            {showCart &&
                <>
                    <div className="ov" style={{ zIndex: 45 }} onClick={() => setShowCart(false)} />
                    <Cart
                        handleCloseCart={() => setShowCart(false)}
                        cartItems={cartItems}
                        removeItem={removeItemInCart}
                    />
                </>
            }

        </>
    )
}