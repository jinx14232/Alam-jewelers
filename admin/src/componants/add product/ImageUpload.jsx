
import { useEffect, useState } from 'react'

export default function ImageUpload({ images, previewImages, setPreviewImages, onImagesChange }) {


    useEffect(() => {
        const urls = images.map(file => URL.createObjectURL(file))

        setPreviewImages(urls)

        return () => {
            urls.forEach(url => URL.revokeObjectURL(url))
        }
    }, [images])

    function handleImageChange(e) {

        const selected = Array.from(e.target.files || [])

        const validImages = selected.filter(file =>
            file.type.startsWith('image/')
        )

        onImagesChange(prev => {
            const combined = [...prev, ...validImages]
            return combined.slice(0, 5)
        })

        e.target.value = ''
    }

    function removeImage(index) {
        onImagesChange(prev =>
            prev.filter((_, i) => i !== index)
        )
    }

    function makePrimary(index) {
        onImagesChange(prev => {
            const updated = [...prev]
            const [selected] = updated.splice(index, 1)
            updated.unshift(selected)
            return updated
        })
    }

    return (
        <section className="form-section">
            <h2>Product Images</h2>
            <div className="image-upload">
                <label className="upload-box">
                    <span className="upload-icon">＋</span>

                    <strong>Click to upload images</strong>

                    <span className="upload-description">
                        Select multiple images from your device
                    </span>

                    <span className="upload-formats">
                        PNG, JPG, WEBP · Up to 5 images
                    </span>

                    <input
                        type="file"
                        accept="image/png,image/jpeg,image/webp"
                        multiple
                        hidden
                        onChange={handleImageChange}
                        disabled={images.length > 5}
                    />
                </label>

                {images.length > 0 && (
                    <div className="image-preview-grid">
                        {images.map((image, index) => (
                            <div
                                className={`image-preview ${index === 0 ? 'primary-image' : ''
                                    }`}
                                key={`${image.name}-${index}`}
                            >
                                <img
                                    src={previewImages[index]}
                                    alt={image.name}
                                />

                                {index === 0 && (
                                    <span className="primary-badge">
                                        Primary
                                    </span>
                                )}

                                <button
                                    type="button"
                                    className="remove-image"
                                    aria-label={`Remove ${image.name}`}
                                    onClick={() => removeImage(index)}
                                >
                                    ×
                                </button>

                                {index !== 0 && (
                                    <button
                                        type="button"
                                        className="make-primary"
                                        onClick={() => makePrimary(index)}
                                    >
                                        Set primary
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>

    )
}
