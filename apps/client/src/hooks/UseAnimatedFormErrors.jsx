import {  useLayoutEffect } from "react";
import gsap from "gsap";

const DEFAULT_BORDER = "#d1d5db";
const ERROR_BORDER = "#ef4444";

export const useAnimatedFormErrors = ({
  errors,
  inputRefs,
  errorRefs,
  fields,
}) => {
  useLayoutEffect(() => {
    fields.forEach((field) => {
      const input = inputRefs.current[field];
      const error = errorRefs.current[field];

      if (!input || !error) return;

      if (errors[field]) {
        gsap.killTweensOf([input, error]);

        gsap.to(input, {
          borderColor: ERROR_BORDER,
          boxShadow: "0 0 0 2px rgba(239,68,68,.2)",
          duration: 0.2,
        });

        gsap.fromTo(
          error,
          {
            autoAlpha: 0,
            y: -8,
            height: 0,
          },
          {
            autoAlpha: 1,
            y: 0,
            height: "auto",
            duration: 0.25,
            ease: "power2.out",
          },
        );
      } else {
        gsap.killTweensOf([input, error]);

        gsap.to(input, {
          borderColor: DEFAULT_BORDER,
          boxShadow: "0 0 0 rgba(0,0,0,0)",
          duration: 0.2,
        });

        gsap.to(error, {
          autoAlpha: 0,
          y: -8,
          height: 0,
          duration: 0.2,
          ease: "power2.in",
        });
      }
    });
  }, [errors]);
};
