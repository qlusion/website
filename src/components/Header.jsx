import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Menu from "./Menu";
import { useState, useEffect } from "react";

export default function Header() {
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 600) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const MobileHeader = () => (
    <nav>
      <Menu icon="fa-solid fa-bars" menu="menu" />
      <h1>
        <FontAwesomeIcon icon="fa-solid fa-rocket" />
        Qlusion
      </h1>
      <Menu icon="fa-solid fa-user" menu="user" />
    </nav>
  );

  const DesktopHeader = () => (
    <nav>
      <h1>
        <FontAwesomeIcon icon="fa-solid fa-rocket" />
        Qlusion
      </h1>
      <section className="navMenus">
        <Menu icon="fa-solid fa-pen" menu="register" content="Register" />
        <Menu icon="fa-solid fa-right-to-bracket" menu="user" content="Login" />
        <Menu icon="fa-solid fa-bars" menu="menu" />
      </section>
    </nav>
  );

  return <header>{isMobile ? <MobileHeader /> : <DesktopHeader />}</header>;
}
