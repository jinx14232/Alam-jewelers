
import { useEffect, useState } from 'react'

export default function VideoUpload({ heading, video, onVideoChange, previewVideo, setPreviewVideo }) {


    useEffect(() => {
        if(!video) return
        const url = URL.createObjectURL(video)

        setPreviewVideo(url)

        return () => {
            url => URL.revokeObjectURL(url)
        }
    }, [video])

    function handleVideoChange(e) {

        const selected = e.target.files[0]
        const validVideo = selected.type.startsWith('video/')
        
        if(validVideo)
            onVideoChange(selected)

    }

    function removeVideo() {
        onVideoChange(null)
    }

    return (
        <section className="form-section">
            <h2>{heading}</h2>

            <div className="image-upload">
                <label className="upload-box">
                    <span className="upload-icon">＋</span>

                    <strong>Click to upload a video</strong>

                    <span className="upload-description">
                        Select 1 video from your device
                    </span>

                    <span className="upload-formats">
                        video/mp4, video/webm · Up to 1 video
                    </span>

                    <input
                        type="file"
                        accept="video/mp4,video/webm"
                        hidden
                        onChange={handleVideoChange}
                        disabled={!!video}
                    />
                </label>

                {video && (
                    <div className="video-preview-grid">

                        <div className='image-preview primary-image'>
                        
                            <video
                                src={previewVideo}
                                controls
                                width="100%"
                            />

                            <button
                                type="button"
                                className="remove-image"
                                onClick={removeVideo}
                            >
                                ×
                            </button>

                        </div>
                    </div>
                )}
            </div>
        </section>

    )
}
