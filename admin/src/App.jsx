import AddProduct from "./componants/add product/AddProduct.jsx"
import './style.css'
import { useEffect, useState } from 'react'

export default function App() {
  const [metals, setMetals] = useState([])


  useEffect(() => {

    async function getMetals() {
      try {
        const responce = await fetch('http://localhost:5000/metals')
        const data = await responce.json()
        setMetals(data)
      }
      catch (e) {
        console.log('error mateials', e)
      }
    }

    getMetals()

  }, [])

  return (
    <>


      <AddProduct
        metals= {metals}
      />


    </>
  )
}
