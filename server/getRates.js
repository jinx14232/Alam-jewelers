
const GOLD_API = 'https://api.goldprice.dev/v1/prices?symbol=XAU-USD-SPOT';
const CURRENCY_API = 'https://open.er-api.com/v6/latest/USD';

const GRAMS_PER_TOLA = 11.6638;
const GRAMS_PER_OUNCE = 31.1035;

export async function getGoldRates() {

    const [goldRes, currencyRes] = await Promise.all([
        fetch(GOLD_API),
        fetch(CURRENCY_API)
    ])

    if (!goldRes.ok || !currencyRes.ok) {
        throw new Error('Failed to fetch market rates')
    }

    const goldData = await goldRes.json()
    const currencyData = await currencyRes.json()

    // Extract prices
    const gold = goldData.symbols?.find(item => item.symbol === 'XAU')
    const dollarRate = currencyData.rates?.PKR

    if (!gold || gold.is_stale || !gold.price || !dollarRate) {
        throw new Error('Invalid or stale market data')
    }

    // Convert USD per ounce to PKR per tola
    const gold24K = (
        (Number(gold.price) *
        dollarRate)/
        GRAMS_PER_OUNCE
    ) * GRAMS_PER_TOLA

    const gold22K = gold24K * (22 / 24)

    return {
        internationalGold: Number(gold.price),
        dollarRate,
        gold24K: Math.round(gold24K),
        gold22K: Math.round(gold22K),
        currency: 'PKR',
        unit: 'tola',
        updatedAt: gold.computed_at
    }
}
