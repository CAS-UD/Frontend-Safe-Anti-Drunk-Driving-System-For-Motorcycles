import { useEffect, useState, useRef } from 'react'
import styles from '../../styles/Stadistics.module.css'

export function Stadistics (props) {
  const ref = useRef()
  const [ejes, setEjes] = useState([
    { name: 'X:', id: '0' },
    { name: 'Y:', id: '1' },
    { name: 'Z:', id: '2' }
  ])
  const [useStandarEjes, setUseStandarEjes] = useState(true)
  useEffect(() => {
    if (props.useStandarEjes === false) {
      setEjes([
        { name: props.nameData + ':', id: '0' }
      ])
      setUseStandarEjes(false)
    }
  }, [props.data])

  const copyText = (id) => {
    try {
      if (!ref.current) throw new Error('no text to copy')
      let text = ref.current.innerText
      text = text.split('\n')
      text = text.filter((e) => e !== '')
      text = text[0] + '[' + text.slice(1).join('') + ']'
      console.log(text)
      navigator.clipboard.writeText(text)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div ref={ref} className={styles.conteinerMoreStadistics} onClick={() => copyText(ref)} title='click to copy'>
      <p>{useStandarEjes === true ? props.nameData + ':' : null}</p>
      <div>
        {ejes.map((eje) => (
          props.data[props.nameData]
            ? (
              <div key={eje.id} className={useStandarEjes !== false ? styles.moreStadistics : styles.moreStadisticsWE}>
                <p>{eje.name}</p>
                <p>{props.data[props.nameData][eje.id]}</p>
              </div>
              )
            : (
              <div key={eje.id} className={styles.moreStadistics}>
                <p>No Data Found</p>
              </div>
              )
        ))}
      </div>
    </div>
  )
}
