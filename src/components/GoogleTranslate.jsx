"use client";

import React from "react";
import PropTypes from "prop-types";

const GoogleTranslate = ({ children }) => {
  React.useEffect(() => {
    const addGoogleTranslateScript = () => {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src =
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      document.body.appendChild(script);
    };

    window.googleTranslateElementInit = function() {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
        },
        "google_translate_element",
      );
    };

    addGoogleTranslateScript();

    return () => {
      const script = document.querySelector(
        'script[src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"]',
      );
      if (script) script.remove();
    };
  }, []);

  return <label id="google_translate_element">{children}</label>;
};

GoogleTranslate.propTypes = {
  children: PropTypes.node,
};

export default GoogleTranslate;
