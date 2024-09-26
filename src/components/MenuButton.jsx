"use client";

import { React, useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { AppContext } from "@/lib/Providers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export default function MenuButton(props) {
  const [showText, setShowText] = useState(false);
  const { setMainContent, filtersMenu, setFiltersMenu } =
    useContext(AppContext);

  useEffect(() => {
    const handleResize = () => {
      setFiltersMenu(window.innerWidth >= 800);
      setShowText(window.innerWidth >= 475);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [setFiltersMenu, setShowText]);

  useEffect(() => {
    const disableScroll = filtersMenu && window.innerWidth < 800;

    if (disableScroll) {
      document.body.style.overflow = "hidden";
      document.body.style.height = "100vh";
      document.querySelector("main .content .events").style.display = "none";
      setFiltersMenu(true);
    }

    return () => {
      if (disableScroll) {
        document.body.style.overflow = "auto";
        document.body.style.height = "auto";
        document.querySelector("main .content .events").style.display = "grid";
        setFiltersMenu(false);
      }
    };
  }, [filtersMenu, setFiltersMenu]);

  return (
    <>
      <span
        className="menu"
        onClick={() => {
          if (props.menu) {
            setFiltersMenu(!filtersMenu);
          } else if (props.content) {
            setMainContent(props.content);
          }
        }}
      >
        <FontAwesomeIcon
          icon={filtersMenu && props.menu ? faXmark : props.icon}
          fixedWidth
          className={props.menu ? "bars" : ""}
        />
        {props.content && showText && props.content}
      </span>
    </>
  );
}

MenuButton.propTypes = {
  icon: PropTypes.string.isRequired,
  content: PropTypes.string,
  menu: PropTypes.bool,
};
