"use client";

import { useEffect } from "react";

const ClerkTextOverrider = () => {
  useEffect(() => {
    const overrideClerkTextAndMakeClickable = () => {
      const paragraphs = document.querySelectorAll('p');
      let targetTextElement: HTMLParagraphElement | null = null;

      paragraphs.forEach(p => {
        // Initial check for "Development mode" or if it was already changed by this script
        if (p.textContent === "Development mode" || 
            (p.firstChild && p.firstChild.nodeName === 'A' && (p.firstChild as HTMLAnchorElement).href === "https://facebook.com/ejjaysz") ||
            p.textContent === "Developed by EJ Alloso" // Check for the text if it was previously set without a link
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
        // Check if the link is already set to avoid redundant operations
        const existingAnchor = targetTextElement.querySelector('a[href="https://facebook.com/ejjaysz"]');
        if (!existingAnchor) {
          targetTextElement.innerHTML = ''; // Clear existing content

          const newAnchor = document.createElement('a');
          newAnchor.href = "https://facebook.com/ejjaysz";
          newAnchor.textContent = "Developed by EJ Alloso";
          newAnchor.target = "_blank"; // Open in a new tab
          newAnchor.rel = "noopener noreferrer"; // Security best practice for external links
          
          // Optional: Add some basic link styling if needed, or use CSS classes
          newAnchor.style.color = "inherit"; // Inherit color from parent, or set your own
          newAnchor.style.textDecoration = "underline";
          newAnchor.style.cursor = "pointer";

          targetTextElement.appendChild(newAnchor);
          // console.log("Clerk text overridden and made clickable.");
        }
      }
    };

    const overrideClerkLink = () => {
      const clerkLogoLink = document.querySelector<HTMLAnchorElement>(
        'a[aria-label="Clerk logo"][href="https://go.clerk.com/components"]'
      );

      if (clerkLogoLink && clerkLogoLink.href !== "https://facebook.com/ejjaysz") {
        clerkLogoLink.href = "https://facebook.com/ejjaysz";
        // console.log("Clerk logo link overridden.");
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
