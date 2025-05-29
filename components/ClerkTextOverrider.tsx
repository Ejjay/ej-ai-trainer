"use client";

import { useEffect } from "react";

const ClerkTextOverrider = () => {
  useEffect(() => {
    const overrideClerkTextAndMakeClickable = () => {
      const paragraphs = document.querySelectorAll('p');
      let targetTextElement: HTMLParagraphElement | null = null;

      paragraphs.forEach(p => {
        if (p.textContent === "Development mode" || 
            p.getAttribute("data-overridden-by") === "ejalloso-link" || 
            p.textContent === "Developed by EJ Alloso" 
           ) {
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
            targetTextElement = p;
          }
        }
      });

      if (targetTextElement) {

        if (targetTextElement.getAttribute("data-overridden-by") !== "ejalloso-link") {
          targetTextElement.innerHTML = ''; 

          const newAnchor = document.createElement('a');
          newAnchor.textContent = "Developed by EJ Alloso";
          newAnchor.href = "#"; 

          targetTextElement.setAttribute("data-overridden-by", "ejalloso-link");

          newAnchor.style.color = "inherit"; 
          newAnchor.style.textDecoration = "underline";
          newAnchor.style.cursor = "pointer";

          newAnchor.addEventListener('click', function(event) {
            event.preventDefault(); 

            const fbAppUrl = "fb://profile/share/1EXwUUJpvR"; 

            const fbWebUrl = "https://www.facebook.com/share/1EXwUUJpvR";

            window.location.href = fbAppUrl;

            setTimeout(function() {

              if (document.visibilityState === 'visible' && document.hasFocus()) {
                window.location.href = fbWebUrl;
              }
            }, 2500); 
          });

          targetTextElement.appendChild(newAnchor);

        }
      }
    };

    const overrideClerkLink = () => {
      const clerkLogoLink = document.querySelector<HTMLAnchorElement>(
        'a[aria-label="Clerk logo"][href="https://go.clerk.com/components"]'
      );

      if (clerkLogoLink && clerkLogoLink.href !== "https://facebook.com/ejjaysz") {
        clerkLogoLink.href = "https://facebook.com/ejjaysz";

      }
    };

    overrideClerkTextAndMakeClickable();
    overrideClerkLink();

    const observer = new MutationObserver((mutationsList) => {

      overrideClerkTextAndMakeClickable();
      overrideClerkLink();
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