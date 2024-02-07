'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from '../../styles/navbar.module.css'

export function Navbar () {
  const pathName = usePathname()

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

  return (
    <navbar>
      <ul className={styles.navbar}>
        {elementsMenu.map((element) => (
          <Link href={element.link} className={styles.link} key={element.id}>
            <p className={styles.menu}>
              {element.name}
            </p>
            <div className={pathName === element.link ? styles.line : ''} />
          </Link>
        ))}
      </ul>
    </navbar>
  )
}
