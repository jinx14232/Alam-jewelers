import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'
import Layout from './Layout.jsx'
import Collection from './componants/collection/Collection.jsx'
import Bars from './componants/Bars.jsx'
import LiveRates from './componants/LiveRates.jsx'
import Home from './componants/Home.jsx'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>

          <Route element={<Layout />} >

            <Route
              path='/'
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

            
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )

}
export default App



