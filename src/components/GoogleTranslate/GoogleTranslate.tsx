"use client";

import { useEffect } from "react";

const GoogleTranslate = () => {
  useEffect(() => {
    // Google Translate scriptini DOMga qo‘shamiz
    const addGoogleTranslateScript = () => {
      const script = document.createElement("script");
      script.src =
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    };

    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          //   includedLanguages: "en,ru,uz,tr,ar,de,fr,zh-CN",
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
        },
        "google_translate_element"
      );
    };

    addGoogleTranslateScript();
  }, []);

  return (
    <div
      id="google_translate_element"
    />
  );
};

export default GoogleTranslate;
