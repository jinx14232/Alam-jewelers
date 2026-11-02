import '../style.css'
import logoImg from '../assets/logo.png'

function Footer(){

    const BRAND = "Alam Jewellers";
    const ADDRESS = "Shop #7A, Block #7, Bahria Town Phase 7–8, Islamabad";
    const PHONES = ["0333 3867934", "0313 5452115"];

    return(
        <footer className="foot" id="contact">
        <div className="wrap">
            <img src={logoImg} className='logo-img' alt="logo"/>
          <h3>{BRAND}</h3>
          <p>{ADDRESS}</p>
          <p>{PHONES.join("  ·  ")}</p>
          <p style={{ marginTop: 10 }}>Prices follow the live gold rate, so please confirm on WhatsApp.<br />Making charges and polish are quoted separately.</p>
        </div>
      </footer>
    )
}

export default Footer
