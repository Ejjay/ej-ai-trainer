"use client";

import { useEffect } from "react";

const ClerkTextOverrider = () => {
  useEffect(() => {
    const overrideClerkText = () => {
      const paragraphs = document.querySelectorAll('p');
      let targetElement: HTMLParagraphElement | null = null;

      paragraphs.forEach(p => {
        if (p.textContent === "Development mode") {
          let parent = p.parentElement;
          let isLikelyClerkComponent = false;
          for (let i = 0; i < 5 && parent; i++) {
            if (parent.className && typeof parent.className === 'string' && parent.className.startsWith('cl-')) {
              isLikelyClerkComponent = true;
              break;
            }
            parent = parent.parentElement;
          }
          if (isLikelyClerkComponent) {
            targetElement = p;
          }
        }
      });

      if (targetElement) {
        targetElement.textContent = "Alloso mode";
      } else {
      }
    };

    overrideClerkText();

    const observer = new MutationObserver((mutationsList) => {
        overrideClerkText();
    });

    const config = { childList: true, subtree: true };
    observer.observe(document.body, config);

    return () => {
      observer.disconnect();
    };
  }, []); 

  return null; 
};

export default ClerkTextOverrider;
