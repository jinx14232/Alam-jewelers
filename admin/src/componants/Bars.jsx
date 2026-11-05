import Header from "./Header"
import { useState } from "react"
import ImageUpload from "./ImageUpload"
import Actions from "./Actions"
import Loader from "./Loader"
export default function () {

    const [selectedMetal, setSelectedMetal] = useState('gold')
    const [images, setImages] = useState([])
    const [previewImages, setPreviewImages] = useState([])
    const [showPreview, setShowPreview] = useState(false)
    const [loading, setLoading] = useState(false)

    const [form, setForm] = useState({
        weight: '',
        weight_unit: 'grams',
        brand: 'ARY',
        fineness: '9000.9',
        price: 0,
        karat: selectedMetal == 'gold' ? 24 : 0
    })

    function handleChange(e) {
        const { name, value } = e.target

        setForm(prev => ({
            ...prev,
            [name]: value
        }))
    }
    function handleCancel() {
        setForm({
            weight: '',
            weight_unit: 'grams',
            brand: 'ARY',
            fineness: '9000.9',
            price: 0,
            karat: selectedMetal == 'gold' ? 24 : 0
        })
        setSelectedMetal('gold')
        setImages([])
        setPreviewImages([])
        setShowPreview(false)
    }
    async function handleSubmit(e) {

        e.preventDefault()
        setShowPreview(false)
        setLoading(true)

        if (images.length === 0) {
            setLoading(false)
            alert('Please select at least one product image.')
            return
        }

        const data = new FormData()
        data.append('metal', selectedMetal)
        Object.entries(form).forEach(([key, value]) => {
            data.append(key, value)
        })
        data.append('image', images[0])

        try {
            const responce = await fetch('http://localhost:5000/addbar',
                {
                    method: 'POST',
                    body: data
                }
            )

            const suc = await responce.json()

            if (suc.message == 'success') {
                alert('Bar Added')
                handleCancel()
            } else {
                alert('Bar failed')
            }

        } catch {
            console.log('error sending product')
            alert('Bar failed')
        } finally {
            setLoading(false)
        }

    }
    return (
        <>
            {loading && <Loader />}
            <div className="admin-page">
                <Header
                    heading='Add New Bar'
                    subHeading='Add a new bar to your jewelry collection.'
                />

                <form className="add-form bar-form" onSubmit={handleSubmit}>

                    <div className="metal-select">
                        <button className={`btn ${selectedMetal == 'gold' ? "filled" : 'simple'}`} onClick={(e) => { e.preventDefault(); setSelectedMetal('gold') }}>Gold</button>
                        <button className={`btn ${selectedMetal == 'silver' ? "filled" : 'simple'}`} onClick={(e) => { e.preventDefault(); setSelectedMetal('silver') }}>Silver</button>
                    </div>

                    <section className="form-section">
                        <h2>Basic Information</h2>
                        {selectedMetal == 'gold' &&
                            <div className="form-field">

                                <label htmlFor="karat">
                                    Karat <span className="required">*</span>
                                </label>
                                <select
                                    id="karat"
                                    name="karat"
                                    value={form.karat}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="24">24k</option>
                                    <option value="22">22k</option>

                                </select>

                            </div>
                        }
                        <div className="form-field">

                            <label htmlFor="fineness">
                                Fineness <span className="required">*</span>
                            </label>
                            <select
                                id="fineness"
                                name="fineness"
                                value={form.fineness}
                                onChange={handleChange}
                                required
                            >
                                <option value="9000.9">9000.9</option>
                                <option value="9000.0">9000.0</option>

                            </select>

                        </div>
                        <div className="form-field">

                            <label htmlFor="weight">
                                Bar Weight <span className="required">*</span>
                            </label>

                            <input
                                id="weight"
                                name="weight"
                                type="number"
                                min={0}
                                onChange={handleChange}
                                value={form.weight}
                                placeholder="e.g. 2.4"
                                required
                            />
                        </div>

                        <div className="form-field">

                            <label htmlFor="unit">
                                Bar Weight Unit <span className="required">*</span>
                            </label>
                            <select
                                id="unit"
                                name="weight_unit"
                                onChange={handleChange}
                                value={form.weight_unit}
                                required
                            >
                                <option value="grams">Grams</option>
                                <option value="tola">Tola</option>

                            </select>

                        </div>
                        <div className="form-field">

                            <label htmlFor="brand">
                                Bar Brand <span className="required">*</span>
                            </label>
                            <select
                                id="brand"
                                name="brand"
                                onChange={handleChange}
                                value={form.brand}
                            >
                                <option value="ARY">ARY</option>
                                <option value="Valcambi">Valcambi</option>

                            </select>

                        </div>
                        <div className="form-field">

                            <label htmlFor="price">
                                Bar Price <span className="required">*</span>
                            </label>

                            <input
                                id="price"
                                name="price"
                                type="number"
                                min={0}
                                onChange={handleChange}
                                value={form.price}
                                placeholder="e.g. 2400000"
                                required
                            />
                        </div>
                    </section>

                    <ImageUpload
                        heading="Bar Image"
                        maxUploads={1}
                        images={images}
                        onImagesChange={setImages}
                        previewImages={previewImages}
                        setPreviewImages={setPreviewImages}
                    />

                    <Actions
                        handleCancel={() => handleCancel()}
                        handlePreview={() => setShowPreview(prev => !prev)}
                    />

                    {showPreview &&

                        <div className="modal">

                            <button className="x">×</button>

                            <div className="tag">{selectedMetal} BAR</div>

                            <div className="model-img">

                                <img src={previewImages[0]} alt='bar Image' className='open-img cover preview' />

                            </div>

                            <div className="model-body bar-model">

                                <h2 className="bar-name">{form.weight} {form.weight_unit} {form.brand != '' ? form.brand : ''} {selectedMetal} bar </h2>
                                <h3 className="price" >Price: {form.price} -/Rs</h3>
                                <h2>Bar Details</h2>

                                <table className="info">

                                    <tbody>

                                        {selectedMetal == 'gold' &&
                                            <tr>
                                                <td>Purity: </td>
                                                <td>{form.karat}K</td>
                                            </tr>
                                        }
                                        <tr>
                                            <td>Weight: </td>
                                            <td>{form.weight} {form.weight_unit}</td>
                                        </tr>
                                        <tr>
                                            <td>Fineness: </td>
                                            <td>{form.fineness}</td>
                                        </tr>
                                        <tr>
                                            <td>Brand: </td>
                                            <td>{form.brand}</td>
                                        </tr>

                                    </tbody>

                                </table>


                                <div className="row">
                                    <button className="btn">
                                        Add to cart
                                    </button>
                                    <a className="btn whatsapp">Ask on WhatsApp</a>
                                </div>

                            </div>
                        </div>

                    }

                </form>
            </div>
        </>
    )
}