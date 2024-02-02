import { Navbar } from './componentes/navbar.js'
import styles from '../styles/pageHome.module.css'

export default function Home () {
    return (
        <>
            <Navbar />
            <main className={styles.main}>
                <section className={styles.section_cas}>
                    <h1 >
                        <strong >C</strong><strong >A</strong> <strong >S</strong>
                    </h1>
                    <h2 >
                        Circuits and Systems 
                    </h2>
                    </section>
                <section className={styles.section_ud}>
                    <strong>
                        UD
                    </strong>
                    <p>
                        Universidad Distrital
                    </p>
                </ section>
            </ main>
        </>
    )
}