/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import FiltersMenu from "./FiltersMenu";
import LoginMenu from "./LoginMenu";

export default function MenuButton(props) {
  const [filtersMenu, setFiltersMenu] = useState(false);
  const [loginMenu, setLoginMenu] = useState(false);

  function toggleMenu(menu) {
    if (menu === "menu") {
      setFiltersMenu(!filtersMenu);
    } else if (menu === "login") {
      setLoginMenu(!loginMenu);
    } else {
      console.log(menu);
    }
  }

  useEffect(() => {
    const handleResize = () => {
      setFiltersMenu(window.innerWidth >= 800);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <span className="menu" onClick={() => toggleMenu(props.menu)}>
        <FontAwesomeIcon
          icon={
            filtersMenu && props.menu === "menu"
              ? "fa-solid fa-xmark"
              : props.icon
          }
          fixedWidth
          className={props.icon === "fa-solid fa-bars" ? "bars" : ""}
        />
        {props.content && props.content}
      </span>
      {filtersMenu && props.menu === "menu" && (
        <FiltersMenu setFiltersMenu={setFiltersMenu} />
      )}
      {loginMenu && props.menu === "login" && <LoginMenu />}
    </>
  );
}
