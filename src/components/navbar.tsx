'use client'
import { User, KeySquareIcon, WorkflowIcon, HistoryIcon, ReceiptIcon } from 'lucide-react'
import { NavBar } from './tubelight-navbar'

export function NavBarHero() {
  const navItems = [
    { name: 'Workflows', url: '/workflows', icon: WorkflowIcon },
    { name: 'Credentials', url: '/credentials', icon: KeySquareIcon },
    { name: 'Pricing', url: '/billing', icon: ReceiptIcon },
    { name: 'Executions', url: '/executions', icon: HistoryIcon  }
  ]

  return <NavBar items={navItems} />
}