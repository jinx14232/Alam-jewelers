import '../style.css'
import logoImg from '../assets/logo.png'

function Footer() {

  const BRAND = "Alam Jewellers";
  const ADDRESS = "Shop #7A, Block #7, Bahria Town Phase 7–8, Islamabad";
  const PHONES = ["0333 3867934", "0313 5452115"];

  return (
    <footer className="foot" id="contact">
      <div className="wrap">
        <img src={logoImg} className='logo-img' alt="logo" />
        <h3>{BRAND}</h3>
        <p>{ADDRESS}</p>
        <p>{PHONES.join("  ·  ")}</p>
        <p style={{ margin: '10px 0' }}>Prices follow the live gold rate, so please confirm on WhatsApp.<br />Making charges and polish are quoted separately.</p>
        
        <iframe
         src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3326.3164217987396!2d73.0877318!3d33.5191579!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38df93855724c5dd%3A0x2bfc832defe20179!2sAlam%20Jewellers!5e0!3m2!1sen!2s!4v1794309904453!5m2!1sen!2s" 
         style={{ border: 0 }}
         allowFullScreen="" 
         loading="lazy" 
         referrerPolicy="strict-origin-when-cross-origin">
         </iframe>

      </div>
    </footer>
  )
}

export default Footer
