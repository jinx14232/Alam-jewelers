import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'
import Layout from './Layout.jsx'
import Collection from './componants/collection/Collection.jsx'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>

          <Route element={<Layout />} >

            <Route
              path='/'
              element={<Collection />}
            />
            
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )

}
export default App

// <>
//  <main>
//     <Shop
//       onAddItem = {addItemInCart}
//       removeItem = {removeItemInCart}
//       cartItems = {cartItems.map(i=> i.id)}
//     />
//  </main>
// </>


