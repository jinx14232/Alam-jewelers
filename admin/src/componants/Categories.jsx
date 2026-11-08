import Header from "./Header"
import react from "react"

export default function () {

    const Audience = {
        'women': 'Women',
        'men': 'Men',
        'newBorn': 'New Born'
    }

    function handleSubmit(e) {
        e.preventDefault()
        setLoading(true)
        const formData = new FormData(e.target)
        const categories = Object.fromEntries(formData)

        async function addCategory() {
            try {
                const res = await fetch(
                    'http://localhost:5000/categories',
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(categories)
                    }
                );

                const data = await res.json();

                if (!res.ok) {
                    throw new Error(data.message);
                }

                alert(data.message);

                // Refresh categories
                window.location.reload()

            } catch (err) {
                alert(err.message);
            }
            finally {
                setLoading(false)
            }
        }
        addCategory()

    }

    const [loading, setLoading] = react.useState(true)
    const [currentCategories, setCurrentCategories] = react.useState({})

    react.useEffect(() => {
        async function getCategory() {
            try {
                const response = await fetch(
                    `http://localhost:5000/categories`
                )

                if (!response.ok) {
                    throw new Error('Failed to fetch products')
                }

                const data = await response.json()

                const groupedCategories = data.reduce((acc, cat) => {
                    if (!acc[cat.audience]) {
                        acc[cat.audience] = [];
                    }

                    acc[cat.audience].push(cat);

                    return acc;
                }, {});

                setCurrentCategories(groupedCategories)

            } catch (error) {
                console.error(error)
            }
            finally {
                setLoading(false)
            }
        }

        setLoading(true)
        getCategory()


    }, [])



    return (
        <>
            <div className="admin-page">
                <Header
                    heading='Add New Categories'
                    subHeading='Give Women, Men and New borns some new collection'
                />
                <form className="add-form" onSubmit={handleSubmit} >

                    <section className="form-section">
                        <h2>Add Category</h2>
                        <section className="form-grid">
                            <div className="form-field">

                                <label htmlFor="category">
                                    Category Name <span className="required">*</span>
                                </label>

                                <input
                                    id="category"
                                    name="name"
                                    type="text"
                                    placeholder="e.g. Necklaces"
                                    required
                                />
                            </div>
                            <div className="form-field">

                                <label htmlFor="audience">
                                    Audience <span className="required">*</span>
                                </label>

                                <select
                                    id="audience"
                                    name="audience"
                                    required
                                >
                                    <option value="">Select Audience</option>
                                    <option value="women">Women</option>
                                    <option value="men">Men</option>
                                    <option value="newBorn">New Born</option>
                                </select>

                            </div>
                        </section>

                        <button className="btn filled" type="submit" style={{ marginTop: '20px' }} >+ Add</button>

                    </section>
                </form>
                <section className="add-form">

                    {!loading &&
                        <section className="form-section">
                            <h2>Current Categories</h2>
                            {Object.entries(currentCategories).map(([audience, cats]) => (
                                <div className="category-group" key={audience}>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>{Audience[audience]}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {cats.map(cat => (
                                                <tr key={cat.id}>
                                                    <td>{cat.name}</td>

                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ))}
                        </section>
                    }
                </section>


            </div>

        </>
    )
}