import { useEffect, useState } from "react"


function Hero() {

    const slides = [
        
        {
            image: '/hero6.png',
            title: 'Elegance in every detail',
            description: 'Discover timeless rings crafted to make every moment special.',
            button: 'View Collections',
            link: '/'
        },
        {
            image: '/hero2.png',
            title: 'Elegance in every detail',
            description: 'Discover timeless rings crafted to make every moment special.',
            button: 'View Collections',
            link: '/'
        },
        
        {
            image: '/hero.png',
            title: 'Elegance in every detail',
            description: 'Discover timeless rings crafted to make every moment special.',
            button: 'View Collections',
            link: '/'
        },
        {
            image: '/hero3.png',
            title: 'Gold, part of nature',
            description: 'Traditional designs in 21K and 22K gold.',
            button: 'Explore Rings',
            link: '/'
        },
        {
            image: '/hero4.png',
            title: 'A timeless investment',
            description: 'Explore our collection of gold and silver bars.',
            button: 'Explore Bars',
            link: '/bars'
        },
        {
            image: '/hero5.png',
            title: 'A timeless investment',
            description: 'Explore our collection of gold and silver bars.',
            button: 'Explore Bars',
            link: '/bars'
        }
        
    ]

    const [activeSlide, setActiveSlide] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveSlide(prev =>
                (prev + 1) % slides.length
            )
        }, 5000)

        return () => clearInterval(interval)

    }, [])

    const slide = slides[activeSlide]

    return (
        <section className="hero-section">

            <div
                className="hero-img"
                style={{
                    backgroundImage: `url(${slide.image})`
                }}
            />

            <div className="markers">
                {slides.map((_, i) => (
                    <div className={`marker ${activeSlide== i? 'on': ''} `} key={i}></div>
                ))}
            </div>

            <div className="container" key={activeSlide}>
                <h1>{slide.title}</h1>
                <p>{slide.description}</p>
                <a className="btn" href={slide.link}>
                    {slide.button}
                </a>
            </div>

        </section>
    )
}

export default Hero