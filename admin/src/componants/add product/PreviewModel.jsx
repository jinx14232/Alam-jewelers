import ProductDetails from "../../../../shared/ProductDetails"

export default function ({
    basicInfo,
    category,
    metals,
    images,
    video_url
}) {
    const product = {
        ...basicInfo,
        category,
        images,
        video_url,
        metals
    }
    const breadCrumbs = [
        {
            name: 'Home',
            link: ''
        },
        {
            name: product.gender,
            link: ''
        },
        {
            name: product.category,
            link: ''
        },
        {
            name: product.code,
            link: ''
        }

    ]
    console.log(product)
    return (
        <>
            <ProductDetails
                loading={false}
                breadCrumbs={breadCrumbs}
                product={product}
                preview = {true}
            />
        </>
    )
}