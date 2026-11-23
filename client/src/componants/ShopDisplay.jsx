import { useState, useEffect } from "react"
export default function ShopDisplay() {

    const videos = [
        './shop/video1.mp4',
        './shop/video2.mp4',
        './shop/video3.mp4',
        './shop/video4.mp4',
        './shop/video5.mp4',
        './shop/video6.mp4',
        './shop/video7.mp4',
        './shop/video8.mp4',
        './shop/video9.mp4',
        './shop/video10.mp4',
        './shop/video11.mp4',
        './shop/video12.mp4',
        './shop/video13.mp4',
        './shop/video14.mp4'
    ]

    const [activeVideo, setActiveVideo] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveVideo(prev =>
                (prev + 1) % videos.length
            )
        }, 5000)

        return () => clearInterval(interval)

    }, [])

    const video = videos[activeVideo]

    return (
        <section className='shop-display home-section'>
            <h2>Our Shop</h2>

            <div className="text">
                <p>Take a look at our location</p>
            </div>

            <div className="video-container">
                <video 
                    src={video}
                    autoPlay={true}
                    muted
                    playsInline
                >
                </video>
            </div>

        </section>
    )
}