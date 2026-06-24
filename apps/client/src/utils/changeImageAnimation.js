import gsap from "gsap";

export const changeImage = (
  direction,
  imageRef,
  currentImage,
  setCurrentImage,
  images,
) => {
  if (!imageRef.current) return;

  const isFirst = currentImage === 0;
  const isLast = currentImage === images.length - 1;

  if ((direction === "prev" && isFirst) || (direction === "next" && isLast)) {
    return;
  }

  gsap.to(imageRef.current, {
    x: direction === "next" ? -40 : 40,
    autoAlpha: 0,
    duration: 0.18,
    ease: "power2.in",
    onComplete: () => {
      setCurrentImage((prev) => (direction === "next" ? prev + 1 : prev - 1));

      gsap.fromTo(
        imageRef.current,
        {
          x: direction === "next" ? 40 : -40,
          autoAlpha: 0,
        },
        {
          x: 0,
          autoAlpha: 1,
          duration: 0.25,
          ease: "power2.out",
        },
      );
    },
  });
};
