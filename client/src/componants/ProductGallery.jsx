
import { useState } from 'react';

export default function ProductGallery({ images = [] }) {

    const [activeImage, setActiveImage] = useState(0);

    if (!images.length) {
        return <p>No images available.</p>;
    }

    return (
        <div className="product-gallery">

            <div className="gallery-primary">
                <img
                    src={images[activeImage].image_url}
                    alt="Product"
                />
            </div>

            {images.length > 1 && (
                <div className="gallery-more">

                    <p>Take a deeper look</p>

                    <div className="gallery-thumbnails">

                        {images.map((image, index) => (
                            <div
                                key={index}
                                className={`gallery-thumbnail ${
                                    activeImage === index ? 'active' : ''
                                }`}
                                onClick={() => setActiveImage(index)}
                            >
                                <img
                                    src={image.image_url}
                                    alt={`Product view ${index + 1}`}
                                />
                            </div>
                        ))}

                    </div>
                </div>
            )}

        </div>
    );
}
