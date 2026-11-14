
import { useEffect, useState } from 'react';

export default function ProductGallery({ images = [] }) {

    const [activeImage, setActiveImage] = useState(0);
    const [isViewerOpen, setIsViewerOpen] = useState(false);
    const [zoom, setZoom] = useState(1);

    const closeViewer = () => {
        setIsViewerOpen(false);
        setZoom(1);
    };

    const updateZoom = (amount) => {
        setZoom((currentZoom) =>
            Math.min(3, Math.max(1, Number((currentZoom + amount).toFixed(1))))
        );
    };

    useEffect(() => {
        if (!isViewerOpen) {
            return undefined;
        }

        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                setIsViewerOpen(false);
                setZoom(1);
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isViewerOpen]);

    if (!images.length) {
        return <p>No images available.</p>;
    }

    return (
        <div className="product-gallery">

            <button
                type="button"
                className="gallery-primary"
                onClick={() => {
                    setZoom(1);
                    setIsViewerOpen(true);
                }}
                aria-label="Open product image for a closer look"
            >
                <img
                    src={images[activeImage].image_url}
                    alt="Product"
                />
                <span className="gallery-zoom-hint">Click to inspect</span>
            </button>

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

            {isViewerOpen && (
                <div
                    className="gallery-viewer"
                    role="dialog"
                    aria-modal="true"
                    aria-label="Product image viewer"
                    onClick={closeViewer}
                >
                    <div
                        className="gallery-viewer-content"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <button
                            type="button"
                            className="x"
                            onClick={closeViewer}
                            aria-label="Close image viewer"
                        >
                            ×
                        </button>

                        <div
                            className="gallery-viewer-image"
                            onWheel={(event) => {
                                event.preventDefault();
                                updateZoom(event.deltaY < 0 ? 0.2 : -0.2);
                            }}
                        >
                            <img
                                src={images[activeImage].image_url}
                                alt="Product enlarged"
                                style={{ transform: `scale(${zoom})` }}
                            />
                        </div>

                        <div className="gallery-viewer-controls" aria-label="Image zoom controls">
                            <button type="button" onClick={() => updateZoom(-0.2)} disabled={zoom === 1}>
                                −
                            </button>
                            <span>{Math.round(zoom * 100)}%</span>
                            <button type="button" onClick={() => updateZoom(0.2)} disabled={zoom === 3}>
                                +
                            </button>
                            <button className='reset' type="button" onClick={() => setZoom(1)} disabled={zoom === 1}>
                                Reset
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}
