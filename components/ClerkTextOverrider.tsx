"use client";

import { useEffect } from "react";

const ClerkTextOverrider = () => {
  useEffect(() => {
    const overrideClerkText = () => {
      const paragraphs = document.querySelectorAll('p');
      let targetTextElement: HTMLParagraphElement | null = null;

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
            targetTextElement = p;
          }
        }
      });

      if (targetTextElement) {
        targetTextElement.textContent = "Developed by Christ Son Alloso";
      }
    };

    const overrideClerkLink = () => {
      const clerkLogoLink = document.querySelector<HTMLAnchorElement>(
        'a[aria-label="Clerk logo"][href="https://go.clerk.com/components"]'
      );

      if (clerkLogoLink) {
        clerkLogoLink.href = "https://facebook.com/ejjaysz";
      } else {
      }
    };

    // Run both override functions initially
    overrideClerkText();
    overrideClerkLink();

    const observer = new MutationObserver((mutationsList) => {
      overrideClerkText();
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
