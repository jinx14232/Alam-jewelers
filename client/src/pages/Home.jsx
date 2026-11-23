import { NavLink } from 'react-router-dom'
import Hero from '../componants/Hero'
import Poster from '../componants/Poster'
import ShopDisplay from '../componants/ShopDisplay'
import LatestUploads from '../componants/LatestUploads'
import Featured from '../componants/Featured'
export default function () {

    

    return (
        <>
            <Hero/>
            <section className="home">
                
                <LatestUploads/>

                <ShopDisplay/>

                <Featured/>
               
                <Poster
                    heading="Finest Collection"
                    para="Explore out top rated collection with ratings"
                    button="Explore"
                    link="/collection"
                    video="/video.mp4"
                />

                <section className="home-section">
                    <h2>Categories</h2>
                    <div className="text">
                        <p>Want a ring for a new born? Perhaps a gift of rings?</p>
                        <p>Find what you want with easy distributions</p>
                    </div>
                    <div className="wrap">
                        <div className="box">
                            <NavLink to='/collection?tab=men'>
                                Men
                            </NavLink>
                            <img src="/men.jpeg" alt="image" />

                        </div>
                        <div className="box">
                            <NavLink to='/collection?tab=women'>
                                Women
                            </NavLink>
                            <img src="/women.jpeg" alt="image" />

                        </div>
                        <div className="box">
                            <NavLink to='/collection?tab=newBorn'>
                                New Born
                            </NavLink>
                            <img src="/baby.jpeg" alt="image" />
                        </div>
                    </div>

                </section>

                <Poster
                    heading="Gold Silver Bars"
                    para="Take a look at Bars collection."
                    button="Bars"
                    link="/bars"
                    video="/video2.mp4"
                />

            </section>
        </>
    )
}