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
            p.textContent === "Developed by EJ Alloso" // Check for text if previously set without full link
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
        // Check if we've already set up this specific link to avoid re-adding listeners
        if (targetTextElement.getAttribute("data-overridden-by") !== "ejalloso-link") {
          targetTextElement.innerHTML = ''; // Clear existing content

          const newAnchor = document.createElement('a');
          newAnchor.textContent = "Developed by EJ Alloso";
          newAnchor.href = "#"; // Set href to # or javascript:void(0) as navigation is handled by click listener
          
          // Mark this element as modified by our script
          targetTextElement.setAttribute("data-overridden-by", "ejalloso-link");

          // Basic styling (adjust as needed or use CSS classes)
          newAnchor.style.color = "inherit"; 
          newAnchor.style.textDecoration = "underline";
          newAnchor.style.cursor = "pointer";

          newAnchor.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default anchor action

            const fbAppUrl = "fb://profile/ejjaysz"; 
            // Note: "fb://profile/ejjaysz" assumes 'ejjaysz' is a numeric ID or a username that your device's Facebook app can resolve.
            // If 'ejjaysz' is a username and this doesn't work, you might need to use your numeric Facebook ID,
            // or try a different scheme like "fb://facewebmodal/f?href=https://www.facebook.com/ejjaysz".
            const fbWebUrl = "https://www.facebook.com/ejjaysz";

            // Attempt to open the Facebook app
            window.location.href = fbAppUrl;

            // Fallback to web URL after a delay
            setTimeout(function() {
              // Only redirect if the current window/tab still has focus,
              // suggesting the app didn't open or take over.
              if (document.visibilityState === 'visible' && document.hasFocus()) {
                window.location.href = fbWebUrl;
              }
            }, 2500); // 2.5 seconds delay for fallback
          });

          targetTextElement.appendChild(newAnchor);
          // console.log("Clerk text overridden and made clickable with Facebook app-first logic.");
        }
      }
    };

    const overrideClerkLink = () => {
      const clerkLogoLink = document.querySelector<HTMLAnchorElement>(
        'a[aria-label="Clerk logo"][href="https://go.clerk.com/components"]'
      );

      // Ensure we don't override it if it's already pointing to the Facebook link
      if (clerkLogoLink && clerkLogoLink.href !== "https://facebook.com/ejjaysz") {
        clerkLogoLink.href = "https://facebook.com/ejjaysz";
        // console.log("Clerk logo link overridden to Facebook web URL.");
      }
    };

    // Run both override functions initially
    overrideClerkTextAndMakeClickable();
    overrideClerkLink();

    const observer = new MutationObserver((mutationsList) => {
      // On any DOM change, re-attempt both overrides.
      overrideClerkTextAndMakeClickable();
      overrideClerkLink();
    });

    // Observe changes in the entire document body and its subtree.
    const config = { childList: true, subtree: true };
    observer.observe(document.body, config);

    // Cleanup observer when the component unmounts
    return () => {
      observer.disconnect();
    };
  }, []); // Empty dependency array ensures this effect runs once on mount and cleans up on unmount

  return null; // This component doesn't render any visible UI itself
};

export default ClerkTextOverrider;
