import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

const DEFAULT_BORDER = "#d1d5db"; // 
const FOCUS_BORDER = "#0ea5e9";   
const ERROR_BORDER = "#ef4444";

const BLUE_RING = "0 0 0 4px rgba(14,165,233,.15)";
const RED_RING = "0 0 0 4px rgba(239,68,68,.15)";
const NO_RING = "0 0 0 0 rgba(0,0,0,0)";

export const useAnimatedFormErrors = ({
  errors,
  inputRefs,
  errorRefs,
  fields,
}) => {
  const previousErrors = useRef({});

  // Attach focus/blur listeners once
  useLayoutEffect(() => {
    const cleanups = [];

    fields.forEach((field) => {
      const input = inputRefs.current[field];
      if (!input) return;

     const handleFocus = () => {
       if (errors[field]) return;

       gsap.to(input, {
         borderColor: FOCUS_BORDER,
         boxShadow: BLUE_RING,
         duration: 0.2,
         overwrite: "auto",
       });
     };
      const handleBlur = () => {
        if (errors[field]) return;

        gsap.to(input, {
          borderColor: DEFAULT_BORDER,
          boxShadow: NO_RING,
          duration: 0.2,
          overwrite: "auto",
        });
      };

      input.addEventListener("focus", handleFocus);
      input.addEventListener("blur", handleBlur);

      cleanups.push(() => {
        input.removeEventListener("focus", handleFocus);
        input.removeEventListener("blur", handleBlur);
      });
    });

    return () => {
      cleanups.forEach((cleanup) => cleanup());
    };
  }, [fields]);

  // React to error changes
  useLayoutEffect(() => {
    fields.forEach((field) => {
      const input = inputRefs.current[field];
      const error = errorRefs.current[field];

      if (!input || !error) return;

      const hasError = !!errors[field];
      const hadError = previousErrors.current[field];
      const isFocused = document.activeElement === input;

      // Animate input
      gsap.to(input, {
        borderColor: hasError
  ? ERROR_BORDER
  : isFocused
    ? FOCUS_BORDER
    : DEFAULT_BORDER,
        boxShadow: hasError ? RED_RING : isFocused ? BLUE_RING : NO_RING,
        duration: 0.2,
        overwrite: "auto",
      });

      // Skip if error visibility didn't change
      if (hasError === hadError) {
        previousErrors.current[field] = hasError;
        return;
      }

      gsap.killTweensOf(error);

      if (hasError) {
        gsap.set(error, {
          display: "block",
          overflow: "hidden",
        });

        gsap.fromTo(
          error,
          {
            autoAlpha: 0,
            height: 0,
            y: -8,
          },
          {
            autoAlpha: 1,
            height: "auto",
            y: 0,
            duration: 0.25,
            ease: "power2.out",
            overwrite: "auto",
          },
        );
      } else {
        gsap.to(error, {
          autoAlpha: 0,
          height: 0,
          y: -8,
          duration: 0.2,
          ease: "power2.in",
          overwrite: "auto",
          onComplete: () => {
            gsap.set(error, {
              display: "none",
            });
          },
        });
      }

      previousErrors.current[field] = hasError;
    });
  }, [errors, fields]);
};
