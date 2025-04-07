"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

interface PaperPlaneTransitionProps {
  onComplete: () => void;
}

export default function PaperPlaneTransition({ onComplete }: PaperPlaneTransitionProps) {
  const receiptRef = useRef<HTMLImageElement>(null);
  const planeRef = useRef<HTMLImageElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!receiptRef.current || !planeRef.current || !wrapperRef.current) return;

    // Ensure the plane image is hidden initially.
    gsap.set(planeRef.current, { opacity: 0 });

    const tl = gsap.timeline({ onComplete });

    // Step 1: Animate the receipt (float & rotate)
    tl.to(receiptRef.current, {
      y: -30,
      rotation: 10,
      duration: 1,
      ease: "power1.inOut",
    })
      // Step 2: Crossfade: fade out receipt and fade in plane
      .to(
        receiptRef.current,
        { opacity: 0, duration: 0.5, ease: "power1.inOut" },
        "+=0.2"
      )
      .to(
        planeRef.current,
        { opacity: 1, duration: 0.5, ease: "power1.inOut" },
        "-=0.5"
      )
      // Step 3: Animate the paper plane flying off the screen
      .to(planeRef.current, {
        x: window.innerWidth,
        y: -window.innerHeight,
        rotation: -90,
        duration: 1.5,
        ease: "power2.inOut",
      });
  }, [onComplete]);

  return (
    <div
      ref={wrapperRef}
      className="fixed top-1/2 left-1/2 z-50 w-64 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
    >
      {/* Receipt Image */}
      <img
        ref={receiptRef}
        src="/reciept.jpg"
        alt="Receipt"
        className="w-full h-auto rounded-md drop-shadow-2xl"
      />
      {/* Paper Plane Image */}
      <img
        ref={planeRef}
        src="/paper-plane.svg"
        alt="Paper Plane"
        className="w-full h-auto absolute top-0 left-0"
      />
    </div>
  );
}
