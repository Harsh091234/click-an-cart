  import { useLayoutEffect, useRef } from "react";
  import gsap from "gsap";

  const DEFAULT_BORDER = "#0ea5e9";
  const ERROR_BORDER = "#ef4444";

  export const useAnimatedFormErrors = ({
    errors,
    inputRefs,
    errorRefs,
    fields,
  }) => {
    const previousState = useRef({});

    useLayoutEffect(() => {
      fields.forEach((field) => {
        const input = inputRefs.current[field];
        const error = errorRefs.current[field];

        if (!input || !error) return;

        const hasError = !!errors[field];
        const hadError = previousState.current[field];

        // Always keep input border in sync
       gsap.to(input, {
         borderColor: hasError ? ERROR_BORDER : DEFAULT_BORDER,
         boxShadow: hasError
           ? "0 0 0 4px rgba(239,68,68,0.15)"
           : "0 0 0 4px rgba(14,165,233,0.15)",
         duration: 0.2,
         overwrite: "auto",
       });

        // Skip if the error state didn't change
        if (hasError === hadError) return;

        gsap.killTweensOf(error);

        if (hasError) {
          gsap.set(error, {
            display: "block",
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
          });
        }

        previousState.current[field] = hasError;
      });
    }, [fields, errors]);
  };
