"use client";

import { AutomationCloud } from "@/components/automations";
import { FlickeringGrid } from "@/components/background";
import { CpuArchitecture } from "@/components/cpu-architecture";
import { NavBarHero } from "@/components/navbar";
import NishoriComponent from "@/components/nishori-sand";
import { ProgressiveBlur } from "@/components/progressive";
import Testimonials from "@/components/testimonials";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <>
      <div className="relative h-screen w-full overflow-hidden flex items-center justify-center">

        <NavBarHero />


        <FlickeringGrid
          className="absolute inset-0 z-0 
          [mask-image:radial-gradient(600px_circle_at_center,white,transparent)]"
          squareSize={4}
          gridGap={6}
          color="#60A5FA"
          maxOpacity={0.5}
          flickerChance={0.1}
        />

        <div className="relative z-10 flex flex-col items-center text-center px-6 -mt-20">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight max-w-3xl">
            Create automations and go on a vacation.
          </h1>

          <p className="mt-6 max-w-xl text-neutral-400 text-base md:text-lg leading-relaxed">
            World's first speech-to-action automation platform — speak, discuss,
            and dive into countless automation workflows.
          </p>

          <Button className="mt-8 hover:cursor-pointer hover:scale-105">
            Get Started <ArrowRight />
          </Button>

          
        </div>
      </div>

      <div className="mt-12">
        <AutomationCloud />
      </div>

      <div className="mt-2">
        <Testimonials />
      </div>

      <div className=" mt-3">
        <NishoriComponent />
      </div>
    </>
  );
}
