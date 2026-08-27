"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import "./intro-animation.css";

/**
 * Ported from the standalone coming-soon.html. Every value below (spacing, type
 * scale, colors) is copied from that file's already-verified CSS, translated into
 * this project's Tailwind conventions rather than re-derived from scratch — several
 * max-widths (34rem) and type sizes (13px badge, 22px tagline, etc.) are one-off
 * values that don't land on Tailwind's default scale, so they're arbitrary-value
 * utilities (`max-w-[34rem]`, `text-[1.375rem]`, ...) rather than the nearest
 * "close enough" named token, to stay pixel-identical rather than approximate.
 *
 * The intro animation's CSS lives in ./intro-animation.css (plain CSS, not
 * utilities) — see that file's header comment for why.
 */
export function ComingSoonClient() {
  // ----- Intro overlay lifecycle -----
  const overlayRef = useRef<HTMLDivElement>(null);
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;
    function handleAnimationEnd(e: AnimationEvent) {
      if (e.animationName === "introOverlayFadeOut") {
        setShowIntro(false);
      }
    }
    overlay.addEventListener("animationend", handleAnimationEnd);
    return () => overlay.removeEventListener("animationend", handleAnimationEnd);
  }, []);

  // ----- Footer year: set client-side only, matching the original's script-based
  // approach (avoids any SSR/CSR mismatch across a year boundary on a cached page). -----
  const [year, setYear] = useState(2026);
  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  // ----- Email capture form: still the fake client-only success state, per instructions -----
  const emailInputRef = useRef<HTMLInputElement>(null);
  const [email, setEmail] = useState("");
  const [ariaInvalid, setAriaInvalid] = useState(false);
  const [errorVisible, setErrorVisible] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function isValidEmail(value: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const value = email.trim();

    if (!isValidEmail(value)) {
      setAriaInvalid(true);
      setErrorVisible(true);
      emailInputRef.current?.focus();
      return;
    }

    setAriaInvalid(false);
    setErrorVisible(false);
    setSubmitting(true);

    // TODO: replace with real submission once a Formspree (or other) endpoint is
    // wired up. For now this just simulates success, matching the standalone
    // coming-soon.html's client-only behavior exactly.
    setTimeout(() => {
      setSubmitted(true);
    }, 500);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setEmail(value);
    if (ariaInvalid && isValidEmail(value.trim())) {
      setAriaInvalid(false);
      setErrorVisible(false);
    }
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-background text-foreground font-body relative overflow-x-hidden">
      {/* Decorative preloader only — aria-hidden, no focusable children,
          position:fixed so it never affects the real page's layout. */}
      {showIntro && (
        <div ref={overlayRef} className="intro-overlay" aria-hidden="true">
          <svg
            className="intro-svg"
            viewBox="0 0 182 166"
            xmlns="http://www.w3.org/2000/svg"
            focusable="false"
          >
            <path
              className="intro-path intro-path--frame"
              pathLength={1}
              d="M 80.19,0 L 68.08,27.69 L 66.92,30.77 L 65.38,33.85 L 64.23,36.92 L 62.69,40 L 61.54,43.08 L 60,46.15 L 58.85,49.23 L 57.31,52.31 L 56.15,55.38 L 55,58.46 L 53.85,61.54 L 52.31,64.62 L 51.15,67.69 L 49.62,70.77 L 48.46,73.85 L 47.31,76.92 L 45.77,80 L 44.62,83.08 L 43.08,86.15 L 41.92,89.23 L 40.77,92.31 L 39.23,95.38 L 38.08,98.46 L 36.92,101.54 L 35.38,104.62 L 34.23,107.69 L 32.69,110.77 L 31.54,113.85 L 30,116.92 L 28.85,120 L 27.31,123.08 L 26.15,126.15 L 25,129.23 L 23.46,132.31 L 22.31,135.38 L 20.77,138.46 L 19.62,141.54 L 18.08,144.62 L 16.92,147.69 L 15.38,150.77 L 13.85,153.85 L 11.92,156.92 L 9.23,160 L 5.38,163.08 L 0,165.38 L 28.85,165.38 L 24.23,163.08 L 21.54,160 L 20.38,156.92 L 20.77,153.85 L 21.92,150.77 L 23.08,147.69 L 24.62,144.62 L 25.77,141.54 L 26.92,138.46 L 28.08,135.38 L 29.62,132.31 L 30.77,129.23 L 32.31,126.15 L 33.46,123.08 L 35,120 L 36.15,116.92 L 37.69,113.85 L 38.85,110.77 L 40.38,107.69 L 41.54,104.62 L 42.69,101.54 L 44.23,98.46 L 45.38,95.38 L 46.92,92.31 L 48.08,89.23 L 49.23,86.15 L 50.77,83.08 L 51.92,80 L 53.46,76.92 L 54.62,73.85 L 55.77,70.77 L 57.31,67.69 L 58.46,64.62 L 59.62,61.54 L 61.15,58.46 L 62.31,55.38 L 63.46,52.31 L 65,49.23 L 66.15,46.15 L 67.31,43.08 L 68.85,40 L 70.38,36.92 L 71.54,33.85 L 72.69,30.77 L 74.23,27.69 L 75,27.69 L 76.54,30.77 L 78.08,33.85 L 79.62,36.92 L 80.77,40 L 82.31,43.08 L 83.85,46.15 L 85.38,49.23 L 86.54,52.31 L 88.08,55.38 L 89.62,58.46 L 91.15,61.54 L 92.31,64.62 L 93.85,67.69 L 95.38,70.77 L 96.92,73.85 L 98.08,76.92 L 99.62,80 L 101.15,83.08 L 102.69,86.15 L 103.85,89.23 L 105.38,92.31 L 106.92,95.38 L 108.46,98.46 L 110,101.54 L 111.54,104.62 L 112.69,107.69 L 114.23,110.77 L 115.77,113.85 L 117.69,116.92 L 119.62,120 L 121.92,123.08 L 124.23,126.15 L 126.92,129.23 L 129.62,132.31 L 132.31,135.38 L 135.77,138.46 L 139.23,141.54 L 143.08,144.62 L 147.31,147.69 L 151.92,150.77 L 158.08,153.85 L 167.31,156.92 L 177.31,163.08 L 181.54,163.08 L 168.08,156.92 L 162.31,153.85 L 157.69,150.77 L 154.23,147.69 L 151.15,144.62 L 148.85,141.54 L 146.54,138.46 L 144.62,135.38 L 142.69,132.31 L 140.77,129.23 L 139.23,126.15 L 137.69,123.08 L 136.15,120 L 134.62,116.92 L 133.08,113.85 L 131.92,110.77 L 130.38,107.69 L 128.85,104.62 L 127.69,101.54 L 126.15,98.46 L 124.62,95.38 L 123.46,92.31 L 121.92,89.23 L 120.38,86.15 L 118.85,83.08 L 117.69,80 L 116.15,76.92 L 115,73.85 L 113.46,70.77 L 111.92,67.69 L 110.38,64.62 L 109.23,61.54 L 107.69,58.46 L 106.15,55.38 L 105,52.31 L 103.46,49.23 L 101.92,46.15 L 100.77,43.08 L 99.23,40 L 97.69,36.92 L 96.15,33.85 L 95,30.77 L 93.46,27.69 Z"
            />
            <path
              className="intro-path intro-path--tail"
              pathLength={1}
              d="M 46.54,93.08 L 45.38,95.38 L 44.62,97.69 L 66.54,100 L 71.92,102.31 L 76.15,104.62 L 79.62,106.92 L 82.31,109.23 L 85,111.54 L 87.31,113.85 L 89.23,116.15 L 91.54,118.46 L 93.46,120.77 L 95.38,123.08 L 96.92,125.38 L 98.85,127.69 L 100.77,130 L 102.69,132.31 L 104.23,134.62 L 106.15,136.92 L 108.08,139.23 L 110.38,141.54 L 112.69,143.85 L 115,146.15 L 117.69,148.46 L 120,150.77 L 123.08,153.08 L 126.54,155.38 L 130,157.69 L 134.62,160 L 139.62,162.31 L 146.54,164.62 L 149.23,165.38 L 175.77,165.38 L 178.08,164.62 L 165.77,162.31 L 158.08,160 L 152.31,157.69 L 148.08,155.38 L 144.23,153.08 L 140.77,150.77 L 137.69,148.46 L 134.62,146.15 L 131.92,143.85 L 129.23,141.54 L 126.92,139.23 L 124.62,136.92 L 122.69,134.62 L 120.38,132.31 L 118.85,130 L 116.92,127.69 L 115,125.38 L 113.08,123.08 L 111.54,120.77 L 109.62,118.46 L 107.69,116.15 L 105.77,113.85 L 103.46,111.54 L 101.15,109.23 L 98.85,106.92 L 96.15,104.62 L 93.08,102.31 L 89.23,100 L 84.62,97.69 L 79.62,95.38 L 70.38,93.08 Z"
            />
          </svg>
        </div>
      )}

      <div className="w-full max-w-2xl mx-auto flex flex-col items-center text-center flex-1 pt-20 px-4 pb-20 max-[480px]:pt-14 max-[480px]:px-5 max-[480px]:pb-12 max-[360px]:pt-12 max-[360px]:px-4 max-[360px]:pb-10">
        <p className="inline-flex items-center font-body font-bold text-xs leading-none tracking-[0.14em] uppercase text-white bg-[#98692A] py-2.5 px-5 rounded-full shadow-sm mb-6 md:text-[0.8125rem] md:py-[11px] md:px-6 max-[360px]:text-[0.6875rem] max-[360px]:py-2 max-[360px]:px-4 max-[360px]:tracking-widest">
          Launching Soon
        </p>

        {/* TODO: once public/aavira-logo.png is confirmed as the canonical copy,
            remove the root-level aavira-logo.png and coming-soon.html. */}
        <Image
          src="/aavira-logo.png"
          alt="Aavira Looms — the art of home"
          width={1774}
          height={887}
          priority
          className="block w-[230px] h-auto mx-auto md:w-[300px] max-[360px]:w-[195px]"
        />

        <h1 className="font-heading text-primary text-5xl leading-tight mt-10 mb-6 md:text-6xl lg:text-7xl max-[360px]:text-4xl">
          Elevate Your Living Space
        </h1>
        <p className="font-heading italic font-medium text-primary text-[1.375rem] leading-[1.875rem] mb-6 md:text-[1.625rem] md:leading-[2.125rem]">
          Woven with Warmth, Rooted in Tradition
        </p>

        <p className="font-body text-lg leading-relaxed text-foreground/80 max-w-[34rem] mx-auto mb-10">
          Our looms are hard at work on the first collection —{" "}
          <strong className="font-semibold text-foreground">
            bedsheets, curtains, cushion covers, runners, dohars &amp; more
          </strong>{" "}
          — handcrafted the traditional way. Ready soon.
        </p>

        {/* TODO: wire this form's submit handler to a real Formspree (or other)
            endpoint. Currently handled client-side only, with no real backend. */}
        {!submitted ? (
          <form
            onSubmit={handleSubmit}
            noValidate
            className="flex flex-col md:flex-row gap-4 justify-center items-center max-w-[34rem] w-full mx-auto relative"
          >
            <div className="w-full text-left relative">
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                ref={emailInputRef}
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={handleChange}
                placeholder="Enter your email"
                autoComplete="email"
                aria-describedby="emailError"
                aria-invalid={ariaInvalid}
                required
                className={`w-full py-4 px-6 font-body text-base text-foreground bg-white rounded-md border transition-[border-color,box-shadow] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:border-primary ${
                  ariaInvalid ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errorVisible && (
                <p
                  id="emailError"
                  role="alert"
                  className="text-sm text-red-500 mt-2 text-left font-body"
                >
                  Please enter a valid email address.
                </p>
              )}
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="flex-none w-full md:w-auto py-4 px-8 font-body text-base font-medium text-primary-foreground bg-primary rounded-md shadow-sm whitespace-nowrap transition-colors hover:bg-primary/90 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-foreground focus-visible:outline-offset-[3px] disabled:opacity-70 disabled:cursor-default"
            >
              {submitting ? "Sending…" : "Notify Me"}
            </button>
          </form>
        ) : (
          <div
            role="status"
            className="inline-flex items-center justify-center max-w-[34rem] mx-auto p-6 bg-white/60 rounded-lg shadow-sm"
          >
            <p className="text-xl font-medium text-primary m-0">
              Thank you — you&apos;re on the list!
            </p>
          </div>
        )}

        <div className="flex justify-center gap-4 mt-10">
          {/* TODO: replace href="#" with the real Instagram profile URL */}
          <a
            href="#"
            aria-label="Follow Aavira Looms on Instagram"
            className="inline-flex items-center justify-center w-8 h-8 text-foreground rounded-md transition-colors hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
          >
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
          </a>
          {/* TODO: replace href="#" with the real WhatsApp chat/business link */}
          <a
            href="#"
            aria-label="Chat with Aavira Looms on WhatsApp"
            className="inline-flex items-center justify-center w-8 h-8 text-foreground rounded-md transition-colors hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5" fill="currentColor">
              <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.96L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.2h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2zm0 18.13h-.01a8.2 8.2 0 0 1-4.18-1.14l-.3-.18-3.12.82.83-3.04-.2-.31a8.18 8.18 0 0 1-1.26-4.37c0-4.53 3.7-8.22 8.24-8.22 2.2 0 4.27.86 5.82 2.41a8.16 8.16 0 0 1 2.41 5.82c0 4.54-3.7 8.21-8.23 8.21zm4.51-6.15c-.25-.12-1.46-.72-1.68-.8-.23-.08-.39-.12-.56.12-.16.25-.64.8-.79.96-.14.17-.29.19-.54.06-.25-.12-1.04-.38-1.98-1.22-.73-.65-1.23-1.46-1.37-1.7-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.15.16-.25.25-.42.08-.16.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43-.14-.01-.31-.01-.47-.01a.9.9 0 0 0-.65.31c-.23.25-.86.84-.86 2.04s.88 2.37 1 2.53c.12.17 1.73 2.64 4.2 3.7.59.25 1.04.4 1.4.52.59.19 1.12.16 1.54.1.47-.07 1.46-.6 1.66-1.17.21-.58.21-1.08.14-1.18-.06-.11-.22-.17-.47-.29z" />
            </svg>
          </a>
          {/* TODO: replace href="#" with mailto:hello@aaviralooms.in or a contact-form link, as preferred */}
          <a
            href="#"
            aria-label="Email Aavira Looms"
            className="inline-flex items-center justify-center w-8 h-8 text-foreground rounded-md transition-colors hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
          >
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m22 6-10 7L2 6" />
            </svg>
          </a>
        </div>
      </div>

      <footer className="w-full mt-auto bg-[#E7E0D2] py-4 text-center">
        <p className="text-sm text-[#3A2E22]/70 m-0 leading-[1.8] font-body">
          Questions? Write to{" "}
          <a
            href="mailto:hello@aaviralooms.in"
            className="text-primary no-underline hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-foreground focus-visible:outline-offset-2"
          >
            hello@aaviralooms.in
          </a>
        </p>
        <p className="text-sm text-[#3A2E22]/70 m-0 leading-[1.8] font-body">
          &copy; {year} Aavira Looms. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
