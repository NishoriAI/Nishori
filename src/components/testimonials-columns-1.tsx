// testimonials-columns-1.tsx
"use client";

import React from "react";
import { motion } from "motion/react";

// TYPE for each testimonial item
export interface TestimonialItem {
  text: string;
  image: string;
  name: string;
  role: string;
}

interface TestimonialsColumnProps {
  className?: string;
  testimonials: TestimonialItem[];
  duration?: number;
}

export const TestimonialsColumn = ({
  className,
  testimonials,
  duration = 10,
}: TestimonialsColumnProps) => {
  return (
    <div className={className}>
      <motion.div
        animate={{ translateY: "-50%" }}
        transition={{
          duration,
          repeat: Infinity,
          repeatType: "loop",
          ease: "linear",
        }}
        className="flex flex-col gap-6 pb-6 bg-background"
      >
        {[...Array(2)].map((_, idx) => (
          <React.Fragment key={idx}>
            {testimonials.map(({ text, image, name, role }, i) => (
              <div
                className="p-10 rounded-3xl border shadow-lg shadow-primary/10 max-w-xs w-full"
                key={i}
              >
                <div>{text}</div>
                <div className="flex items-center gap-2 mt-5">
                  <img
                    width={40}
                    height={40}
                    src={image}
                    alt={name}
                    className="h-10 w-10 rounded-full"
                  />
                  <div>
                    <div className="font-medium leading-5">{name}</div>
                    <div className="opacity-60 leading-5">{role}</div>
                  </div>
                </div>
              </div>
            ))}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
};
