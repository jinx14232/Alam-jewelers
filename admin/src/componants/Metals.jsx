import Header from "./Header"
import react from 'react'

export default function () {

    const [currentMetals, setCurrentMetals] = react.useState([])

    react.useEffect(() => {

        async function getMetals() {
            try {
                const response = await fetch(
                    `http://localhost:5000/metals`
                )

                if (!response.ok) {
                    throw new Error('Failed to fetch products')
                }

                const data = await response.json()
                console.log(data)
                setCurrentMetals(data)

            } catch (error) {
                console.error(error)
            }

        }

        getMetals()

    }, [])


    return (
        <>
            <div className="admin-page">
                <Header
                    heading='Metals'
                    subHeading='Take a look at current Metlas'
                />

                <section className="add-form">
                    <section className="form-section">
                        <h2>Current Metals</h2>
                        {currentMetals.map(metal => (
                            <div className="category-group" key={metal.id}>
                                <table>
                                    <tbody>

                                        <tr>
                                            <td>{metal.name}</td>

                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        ))}
                    </section>
                </section>


            </div>

        </>
    )
}