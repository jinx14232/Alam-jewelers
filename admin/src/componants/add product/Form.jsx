import BasicInfo from './BasicInfo.jsx'
import MaterialInfo from './MaterialInfo.jsx'
import ImageUpload from './ImageUpload.jsx'
import Actions from './Actions.jsx'
import PreviewModel from './PreviewModel.jsx'
import Loader from './Loader.jsx'

import {useState, useEffect} from 'react'

export default function ({ metals }) {

    const [loading, setLoading] = useState(false)

    // ------forms-------

    const [selectedMetals, setSelectedMetals] = useState([])

    const [basicInfo, setBasicInfo] = useState({
        name: '',
        description: '',
        gender: '',
        category_id: '',
        price: ''
    })

    const [metalInfo, setMetalInfo] = useState([])
    //initialize metal info with ids
    useEffect(() => {
        setMetalInfo(prev => {
            return selectedMetals.map(metal => {
                const existing = prev.find(
                    item => item.metal_id === metal.id
                );

                return existing || {
                    metal_id: metal.id,
                    details: [{field: '', value: ''}]
                };
            });
        });
    }, [selectedMetals])

    const [images, setImages] = useState([])

    //------------------------------------------------

    //------------get categories-----------------
    const [categoriesGroup, setCategories] = useState({})

    useEffect(() => {

        async function getCategories() {
            try {

                const responce = await fetch('http://localhost:5000/categories', {
                    method: 'GET',
                })

                if (!responce.ok) {
                    console.log('responce is incorrect')
                    return {}
                }

                const categoriesData = await responce.json()

                const _categories = Object.groupBy(
                    categoriesData,
                    data => data.audience
                )

                setCategories(_categories)

            } catch {
                console.log('error getting categories by group')
            }
        }
        getCategories()

    }, [])

    //--------------------------
    //---------------preview--------------------

    const [previewImages, setPreviewImages] = useState([])
    const [showPreview, setShowPreview] = useState(false)

    function createProductData() {

        const data = new FormData()

        Object.entries(basicInfo).forEach(([key, value]) => {
            data.append(key, value)
        })
        data.append('metalInfo', JSON.stringify(metalInfo));
        images.forEach(image => {
            data.append('images', image)
        })

        return data
    }


    //---------------------------

    async function handleSubmit(e) {
        e.preventDefault()
        setShowPreview(false)

        setLoading(true)

        if (images.length === 0) {
            setLoading(false)
            alert('Please select at least one product image.')
            return
        }

        const data = createProductData()

        console.log([...data.entries()])

        try {
            const responce = await fetch('http://localhost:5000/addproduct',
                {
                    method: 'POST',
                    body: data
                }
            )

            const suc = await responce.json()

            if (suc.message == 'success') {
                alert('Product Added')
                handleCancel()
            } else {
                alert('Product failed')
            }

        } catch {
            console.log('error sending product')
            alert('Product failed')
        } finally {
            setLoading(false)
        }
    }

    function handleCancel() {
        setBasicInfo({
            name: '',
            description: '',
            gender: '',
            category_id: ''
        })
        setMetalInfo([])
        setImages([])
    }

    return (
        <>
            {loading && <Loader />}
            <form className="product-form surfaced-bg" onSubmit={handleSubmit}>

                <BasicInfo
                    form={basicInfo}
                    setForm={setBasicInfo}
                    categoriesGroup={categoriesGroup}
                />

                <MaterialInfo
                    form={metalInfo}
                    setForm={setMetalInfo}
                    metals={metals}
                    selectedMetals={selectedMetals}
                    changeSelectedMetals={setSelectedMetals}
                />

                <ImageUpload
                    images={images}
                    previewImages={previewImages}
                    setPreviewImages={setPreviewImages}
                    onImagesChange={setImages}
                />


                <Actions
                    handleCancel={handleCancel}
                    handlePreview={() => setShowPreview(prev => !prev)}
                />

                {showPreview &&
                    <PreviewModel
                        basicInfo={basicInfo}
                        metalInfo={metalInfo}
                        previewImages={previewImages}
                        selectedMetal={selectedMetals}
                    />
                }


            </form>
        </>
    )
}