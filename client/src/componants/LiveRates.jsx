
import { useEffect, useState } from 'react';
import { apiFetch } from '../api';
import Loader from './Loader';

function LiveRates() {
    const [rates, setRates] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    async function loadRates() {
        try {
            setLoading(true)
            setError('');

            const res = await apiFetch('/goldRates')

            if (!res.ok) throw new Error('Failed to load rates');

            const data = await res.json();
            setRates(data);

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {

        loadRates()
        const interval = setInterval(loadRates, 5 * 60 * 1000)
        return () => clearInterval(interval)

    }, [])

    const formatPrice = (price) =>
        Number(price).toLocaleString('en-PK');

    return (
        <section className='rate-section'>

            <section className="disclaimer">
                <h2>Rate Disclaimer</h2>
                <p>
                    The gold prices displayed below are 
                    indicative estimates calculated using 
                    international gold prices and USD/PKR 
                    exchange rates. Actual market rates may 
                    vary depending on local Sarafa market 
                    conditions, dealer premiums, and currency 
                    fluctuations.
                </p>
                <a href="https://www.pakgold.net/" target="_blank" >Get latest gold rate from Pak Gold</a>

            </section>

            <section className="live-rates">

                <div className="rates-heading">
                    <div>
                        <h2>Today's Gold Rates</h2>
                        <p>International market-based estimates</p>
                    </div>

                    <button
                        className="refresh-btn"
                        onClick={loadRates}
                        disabled={loading}
                    >
                        ↻ Refresh
                    </button>
                </div>

                {loading && !rates && (
                    <Loader />
                )}

                {error && (
                    <p className="rates-error">{error}</p>
                )}

                {rates && (
                    <>
                        <div className="gold-rate-grid">

                            <div className="gold-rate-card primary-rate">
                                <span>24K GOLD</span>
                                <h3>
                                    Rs. {formatPrice(rates.gold24K)}
                                </h3>
                                <small>Per Tola</small>
                            </div>

                            <div className="gold-rate-card">
                                <span>22K GOLD</span>
                                <h3>
                                    Rs. {formatPrice(rates.gold22K)}
                                </h3>
                                <small>Per Tola</small>
                            </div>

                        </div>

                        <div className="market-details">
                            <div>
                                <span>International Gold</span>
                                <strong>${rates.internationalGold} / oz</strong>
                            </div>

                            <div>
                                <span>USD / PKR</span>
                                <strong>Rs. {formatPrice(rates.dollarRate)}</strong>
                            </div>
                        </div>

                        <div className="rates-footer">
                            <span>Estimated rates</span>
                            <span>
                                Updated: {new Date(rates.updatedAt).toLocaleString()}
                            </span>
                        </div>
                    </>
                )}

            </section>

        </section>

    )
}

export default LiveRates;
