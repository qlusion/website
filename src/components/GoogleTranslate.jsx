"use client";

import React from "react";

const GoogleTranslate = () => {
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
          includedLanguages:
            "en,es,fr,de,ja,ko,zh,vi,ar,tl,ru,pt,it,pl,hi,ur,fa",
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
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

  return <div id="google_translate_element">Translate the page:</div>;
};

export default GoogleTranslate;
