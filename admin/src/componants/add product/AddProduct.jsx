
import { useState} from 'react'
import Header from './Header.jsx'
import Form from '../Form.jsx'

export default function AddProduct({ metals }) {


        

    return (
        <>

            <div className="add-product-page">
                <Header />
                <Form
                    metals={metals}
                />
            </div>
        </>
    )
}



