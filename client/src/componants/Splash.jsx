import { useEffect, useState } from "react";
import "../splash.css";
import logoImg from '../assets/logo.png'


export default function SplashScreen() {

  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 50000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
    {visible && 
    <div className="splash-screen">
      <div className="splash-content">
        <img
          src={logoImg}
          alt="Logo"
          className="splash-logo"
        />

        <h1>ALAM JEWELLERS</h1>

        <div className="splash-divider"></div>

        <p>
          Shop #7A, Block #7, Bahria Town Phase 7–8,
          Islamabad
        </p>

        <p className="splash-phone">
          0333 3867934 · 0313 5452115
        </p>
      </div>
    </div>
    }
    </>
  );
}