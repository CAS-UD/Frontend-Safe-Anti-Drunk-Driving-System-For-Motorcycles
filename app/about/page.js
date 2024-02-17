'use client'

import { Navbar } from '../componentes/navbar'
import styles from '../../styles/About.module.css'
import { useEffect, useState } from 'react'

export default function About () {
  const text = [
    {
      id: 0,
      name: 'Esp32',
      text: 'The ESP32 is a low-cost, low-power system on a chip microcontroller with integrated Wi-Fi and dual-mode Bluetooth. The ESP32 series employs a Tensilica Xtensa LX6 microprocessor in both dual-core and single-core variations and includes built-in antenna switches, RF balun, power amplifier, low-noise receive amplifier, filters, and power-management modules.'
    },
    {
      id: 1,
      name: 'BNO055',
      text: 'The BNO055 is an IMU module that combines accelerometer, gyroscope, and magnetometer to provide orientation data in electronics and robotics projects. Manufactured by Bosch, it is known for its accuracy and ease of integration.'
    },
    {
      id: 2,
      name: 'GY-NEO6MV2',
      text: 'A GPS sensor determines precise location using satellite signals, providing latitude, longitude, and sometimes altitude coordinates for accurate position tracking in devices like mobile phones and navigation systems.'
    }
  ]
  const [count, setCount] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      if (count === 2) {
        setCount(0)
      } else {
        setCount(count + 1)
      }
      return () => {
        clearInterval(interval)
      }
    }, 5000)
  }, [count])

  return (
    <>
      {/* <Navbar /> */}
      <main className={styles.main}>
        <section>
          <h1>
            Sistema seguro contra la conducción en estado de ebriedad para motocicletas
            <span>
              We are working on a device that aims to spot unusual
              behaviors while riding motorcycles. Our goal is to
              recognize situations where a person might not be in
              the best condition to ride safely. This involves detecting
              possible influences of substances like alcohol or drugs,
              and also identifying drivers who have been on the road for
              extended periods without a break. Our mission is to enhance
              road safety by preventing risky situations and encouraging
              responsible driving habits.
            </span>
          </h1>
          <h2>
            What technologies are used?
            <span>
              <p>
                {text[count].name}
              </p>
              {text[count].text}
            </span>
          </h2>
        </section>
        <section>
          <a href='https://www.google.com' target='_blank' rel='noreferrer'>
            Read more
          </a>
        </section>
      </main>
    </>
  )
}
