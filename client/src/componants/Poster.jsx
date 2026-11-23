import { NavLink } from 'react-router-dom'

export default function Poster({
    heading,
    para,
    button,
    link,
    video
}){
    return(
        <>
         <section className="home-section">
                    <div className="poster-con">
                        <div className="content">

                            <NavLink to={link}>
                                <h1>{heading}</h1>
                                <p>{para}</p>
                                <div className="btn">{button}</div>
                            </NavLink>
                        </div>
                        <video autoPlay
                            muted
                            loop
                            playsInline src={video}
                        />
                    </div>
                </section>
        </>
    )
}