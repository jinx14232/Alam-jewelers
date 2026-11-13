import Card from './Card.jsx'
import Model from './Model.jsx'
import Loader from './Loader.jsx'
import React from 'react'

function BarCatelog(props) {

    const [openedItem, setOpenedItem] = React.useState(null)
    //loading
    const [loadingBars, setLoadingBars] = React.useState(true)

    //bars
    const [bars, setBars] = React.useState([])
    //get bars
    React.useEffect(() => {
        async function getBars() {
            try {
                const response = await fetch(
                    'http://localhost:5000/bars'
                )

                if (!response.ok) {
                    throw new Error('Failed to fetch bars')
                }

                const data = await response.json()
                console.log('recieved bars: ', data)
                setBars(data)

            } catch (error) {
                console.error(error)
                alert('Error occured')
            }
            finally {
                setLoadingBars(false)
            }
        }
        getBars()
    }, [])

    console.log('filtering bars')
    const filteredBars = bars.filter(bar => bar.metal == props.currentTab)

    return (
        <>
            <section className='catelog' id='catelog'>
                <section className="category">
                    <h2>Bars</h2>
                    <div className="orn" />

                    {loadingBars ? <Loader /> :

                        <div className="grid-wrap">

                            {filteredBars.length == 0 && <p>No item found!</p>}

                            <div className="grid">
                                {filteredBars.map((bar, idx) =>
                                    <Card
                                        key={idx}
                                        product={bar}
                                    />
                                )}
                            </div>

                        </div>


                    }

                </section>

            </section>

            {/* {openedItem != null &&

                <>
                    <div className="ov" onClick={() => setOpenedItem(null)}>
                        <Model
                            product={openedItem}
                            onAddItem={props.onAddItem}
                            removeItem={props.removeItem}
                            onClose={() => setOpenedItem(null)}
                            cartItems={props.cartItems}
                        />
                    </div>
                </>
            } */}

        </>

    )
}

export default BarCatelog



