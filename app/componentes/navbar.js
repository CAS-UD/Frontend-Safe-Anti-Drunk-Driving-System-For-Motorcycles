'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from '../../styles/navbar.module.css'
import { useEffect, useState } from 'react'

export function Navbar () {
  const pathName = usePathname()
  const [scroll, setScroll] = useState(false)
  const [isHover, setIsHover] = useState(false)
  const elementsMenu = [
    {
      name: 'Home',
      link: '/',
      id: 1
    },
    {
      name: 'Monitoring',
      link: '/monitoring',
      id: 2
    },
    {
      name: 'About',
      link: '/about',
      id: 3
    },
    {
      name: 'Contact',
      link: '/contact',
      id: 4
    }
  ]
  useEffect(() => {
    const handleScroll = () => {
      if (document.documentElement.scrollTop >= 135) {
        setScroll(true)
      }
      if (document.documentElement.scrollTop < 135) {
        setScroll(false)
      }
      console.log('window.innerHeight', 945 + document.documentElement.scrollTop)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  const haddleMosuseEnter = () => {
    setIsHover(true)
  }
  return (
    <>
      <ul className={!scroll ? styles.navbar : isHover && scroll ? styles.navbarIsScrolling : styles.fakenavbar}>
        {elementsMenu.map((element) => (
          <Link href={element.link} className={styles.link} key={element.id}>
            <p className={styles.menu}>
              {element.name}
            </p>
            <div className={pathName === element.link ? styles.line : ''} />
          </Link>
        ))}
      </ul>
      {scroll
        ? <div className={isHover ? styles.fakenavbar : styles.fakenavbarishover} onMouseEnter={haddleMosuseEnter}> </div>
        : null}
    </>
  )
}
