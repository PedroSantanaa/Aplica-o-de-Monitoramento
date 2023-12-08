'use client'
import Image from 'next/image'
import React from 'react'
import { SHeader, SLogo, Ul } from '@/app/styled-components/Header'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Header = () => {
  const path = usePathname()
  return (
    <SHeader>
      <SLogo>
        <Image src="/gipar.png" alt="logo" width={60} height={60} />
        <h1>GIPAR</h1>
      </SLogo>
      <Ul>
        <Link href="/" className={path === '/' ? 'active' : ''}>
          HOME
        </Link>
        <Link href="/banco" className={path === '/banco' ? 'active' : ''}>
          BANCO DE DADOS
        </Link>
        <Link href="/sobre" className={path === '/sobre' ? 'active' : ''}>
          SOBRE
        </Link>
      </Ul>
    </SHeader>
  )
}

export default Header
