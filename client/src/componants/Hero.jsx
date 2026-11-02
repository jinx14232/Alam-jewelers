import '../style.css'

function Hero(){

    const images= [
        '/hero/img_1',
        '/hero/img_1',
        '/hero/img_1'
    ]

    return(
        <section className='hero-section'>
            <div className="hero-img"></div>
            <div className="container">
                <h1>Gold, part of nature</h1>
                <p>Traditional designs in 21K and 22K gold. Browse, then send us your query on WhatsApp.</p>
                <a className="btn" href="#catelog">View Collections</a>
            </div>
        </section>
    )
}

export default Hero