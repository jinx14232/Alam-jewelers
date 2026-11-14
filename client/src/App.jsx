import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'
import Layout from './Layout.jsx'
import Collection from './pages/Collection.jsx'
import Bars from './pages/Bars.jsx'
import LiveRates from './componants/LiveRates.jsx'
import Home from './pages/Home.jsx'
import ProductDetail from './pages/ProductDetail.jsx'
import BarDetail from './componants/BarDetail.jsx'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>

          <Route element={<Layout />} >

            <Route
              index
              element={<Home />}
            />
            <Route
              path='/collection'
              element={<Collection />}
            />

             <Route
              path='/bars'
              element={<Bars />}
            />
            <Route
              path='/liverates'
              element={<LiveRates />}
            />
            <Route
              path='/product/:id'
              element={<ProductDetail />}
            />
            <Route
              path='/bar/:id'
              element={<BarDetail />}
            />

          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )

}
export default App



