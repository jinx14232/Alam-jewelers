import './details.css'
import BreadCrumbs from './BreadCrumbs.jsx';
import ProductGallery from './ProductGallery.jsx';
import ProductInfo from './ProductInfo.jsx';
import Loader from '../client/src/componants/Loader.jsx';
export default function ProductDetails({
    loading,
    breadCrumbs,
    product,
    preview = false
}){
    return(
        <>
        <section className={`${preview? 'preview-details': 'product-details'}`}>

            <BreadCrumbs
                breadCrumbs= {breadCrumbs}
            />

            <div className="product-layout">

                {loading ? <Loader /> :
                    <>
                        <ProductGallery
                            images={product['images']}
                            videoUrl={product['video_url']}
                            preview={preview}
                        />

                        <ProductInfo
                            product={product}
                            preview={preview}
                        />
                    </>
                }

            </div>

        </section>
        </>
    )
} 