"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { LucideIcon, Github } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { ThemeToggleButton } from "./skiper-dark"

interface NavItem {
  name: string
  url: string
  icon: LucideIcon
}

interface NavBarProps {
  items: NavItem[]
  className?: string
}

export function NavBar({ items, className }: NavBarProps) {
  const [activeTab, setActiveTab] = useState(items[0].name)

  return (
    <div
      className={cn(
        "fixed top-6 left-1/2 -translate-x-1/2 z-50",
        className
      )}
    >
      <div className="flex items-center gap-6 bg-background/60 border border-border backdrop-blur-lg px-6 py-3 rounded-full shadow-lg">

        <Link href="/" prefetch className="flex items-center gap-2">
          <Image
            src="/logos/nishori.png"
            alt="Nishori"
            width={32}
            height={32}
            className="rounded-full"
          />
          <span className="font-semibold text-lg">Nishori</span>
        </Link>

        <div className="flex items-center gap-1 px-2 py-1 rounded-full">
          {items.map((item) => {
            const Icon = item.icon
            // const isActive = activeTab === item.name

            return (
              <Link
                key={item.name}
                href={item.url}
                onClick={() => setActiveTab(item.name)}
                className={cn(
                  "relative cursor-pointer text-sm font-medium px-6 py-2 rounded-full transition-colors",
                  "text-foreground/70 hover:text-primary",
                  // isActive && "text-primary"
                )}
              >
                <span className="hidden md:inline">{item.name}</span>
                <span className="md:hidden">
                  <Icon size={18} strokeWidth={2.5} />
                </span>

                {/* {isActive && (
                  <motion.div
                    layoutId="lamp"
                    className="absolute inset-0 bg-primary/10 rounded-full -z-10"
                    initial={false}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                    }}
                  />
                )} */}
              </Link>
            )
          })}
        </div>


        <div className="flex items-center gap-3">

          <ThemeToggleButton  className="size-4" />

          <Link
            href="https://github.com/your/repo"
            target="_blank"
            className="flex items-center gap-2 px-4 py-1.5 rounded-full hover:bg-muted transition"
          >
            <Github size={18} />
            <span className="hidden md:inline text-sm font-medium">GitHub</span>
          </Link>

        </div>


      </div>
    </div>
  )
}
