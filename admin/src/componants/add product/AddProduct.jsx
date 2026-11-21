
import { useState, useEffect } from 'react'
import Header from '../Header.jsx'
import Form from './Form.jsx'
import { apiFetch } from '../../api.js'

export default function AddProduct() {


    const [metals, setMetals] = useState([])
    useEffect(() => {

        async function getMetals() {
            try {
                const responce = await apiFetch('/metals')
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
            <div className="admin-page">
                <Header
                    heading='Add New Product'
                    subHeading='Add a new piece to your jewelry collection.'
                />
                <Form
                    metals={metals}
                />
            </div>
        </>
    )
}



