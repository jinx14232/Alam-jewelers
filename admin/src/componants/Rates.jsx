import React from "react"
export default function Rates() {

    const [form, setForm] = React.useState({
        purity: 0,
        rate: ''
    })

    async function handleSubmit(formData) {

        const purity = formData.get('purity')
        const rate = formData.get('rate')
    }

    return (
        <>
            <section className="add-form">
                <section className="form-section">
                    <h2>Current Rates</h2>
                    <section className="form-grid">
                        <div className="overview rate-card">
                            <span>24K GOLD</span>
                            <h3>
                                Rs. 12000
                            </h3>
                            <small>Per Tola</small>
                        </div>
                        <div className="overview rate-card">
                            <span>22K GOLD</span>
                            <h3>
                                Rs. 12000
                            </h3>
                            <small>Per Tola</small>
                        </div>
                        <div className="overview rate-card">
                            <span>20K GOLD</span>
                            <h3>
                                Rs. 12000
                            </h3>
                            <small>Per Tola</small>
                        </div>
                        <div className="overview rate-card">
                            <span>18K GOLD</span>
                            <h3>
                                Rs. 12000
                            </h3>
                            <small>Per Tola</small>
                        </div>
                        <div className="overview rate-card">
                            <span>International Gold</span>
                            <h3>
                                $12000
                            </h3>
                            <small>Per ounze</small>
                        </div>
                        <div className="overview rate-card">
                            <span>Dollar Rate</span>
                            <h3>
                                Rs. 12000
                            </h3>
                            <small>USK / PKR</small>
                        </div>

                    </section>
                </section>

                <form className="form-section" action={handleSubmit}>
                    <h2>Change Gold Rate</h2>
                    <section className="form-grid">
                        <div className="form-field">

                            <label htmlFor="purity">
                                Gold Purity (k)<span className="required">*</span>
                            </label>

                            <select
                                id="purity"
                                name="purity"
                                required
                            >
                                <option value="">Select Purity</option>
                                <option value="18">18k</option>
                                <option value="20">20k</option>
                                <option value="22">22k</option>
                                <option value="24">24k</option>

                            </select>
                        </div>
                        <div className="form-field">

                            <label htmlFor="rate">
                                Rate Per Tola (PKR) <span className="required">*</span>
                            </label>

                            <input
                                id="rate"
                                name="rate"
                                type="number"
                                min="0"
                                placeholder="e.g. 4100000"
                                required
                            />

                        </div>
                    </section>
                    <button className="btn filled" type="submit" style={{ marginTop: '20px' }} >Change Gold Rate</button>

                </form>

                <form className="form-section" action={handleSubmit}>
                    <h2>Change International Gold Rate</h2>
                    <section className="form-grid">

                        <div className="form-field">

                            <label htmlFor="rate">
                                Rate Per Ounze ($) <span className="required">*</span>
                            </label>

                            <input
                                id="rate"
                                name="rate"
                                type="number"
                                min="0"
                                placeholder="e.g. 4100000"
                                required
                            />

                        </div>
                    </section>
                    <button className="btn filled" type="submit" style={{ marginTop: '20px' }} >Change International Gold Rate</button>

                </form>

                <form className="form-section" action={handleSubmit}>
                    <h2>Change Dollar exchange Rate</h2>
                    <section className="form-grid">

                        <div className="form-field">

                            <label htmlFor="rate">
                                Dollar Rate (PKR) <span className="required">*</span>
                            </label>

                            <input
                                id="rate"
                                name="rate"
                                type="number"
                                min="0"
                                placeholder="e.g. 4100000"
                                required
                            />

                        </div>
                    </section>
                    <button className="btn filled" type="submit" style={{ marginTop: '20px' }} >Change Dollar Exchnage Rate</button>

                </form>


            </section>
        </>
    )
}