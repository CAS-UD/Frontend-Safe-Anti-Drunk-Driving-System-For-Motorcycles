'use client'

import { Navbar } from '../componentes/navbar'
import { io } from 'socket.io-client'
import { Suspense, useEffect, useState } from 'react'
import styles from '../../styles/monitoring.module.css'
import { Canvas } from 'react-three-fiber'
import { MotoComponent } from './moto'
import { Loader } from '@googlemaps/js-api-loader'
import { Stadistics } from '../componentes/statistics'

export default function Monitorin () {
  const [map, setMap] = useState(null)
  const [geocoder, setGeocoder] = useState(null)
  const [infowindow, setInfowindow] = useState(null)
  const [lat, setLat] = useState(0.00000000)
  const [lng, setLng] = useState(-0.00000000)
  const [marker, setMarker] = useState(null)
  const [euler, setEuler] = useState({ roll: 0, pitch: 0, heading: 0 })
  const [data, setData] = useState(
    {
      AntennaHeight: '',
      Temperature: [24],
      Gyroscope:
              [5.31, -3.87, 5.5],
      Accelerometer:
              [1.2, -1.37, -9.74],
      Gravity:
              [1.36, -1.84, -9.53],
      LinearAccelerometer:
              [-0.01, 0.099, -0.35],
      Euler:
              [267, 8, 169],
      Magnetometer:
              [14.375, 25.562, 6.062],
      Longitude: [0],
      Date: [],
      Latitude: [0],
      LocalTime: [],
      GroundSpeed: [],
      SatelitesInView: [0 * 79],
      SatelitesInUse: [0]
    }

  )
  const [isScroll, setIsScroll] = useState(false)

  useEffect(() => {
    const ws = io('http://localhost:5000')

    ws.on('post_req', (data) => {
      data = JSON.parse(data)
      setLat(data.Latitude)
      setLng(data.Longitude)
      setEuler({ roll: data.Euler[0][2], pitch: data.Euler[0][1], heading: data.Euler[0][0] })
      if (map && geocoder && infowindow && data.Longitude !== '0' && data.Latitude !== '0') {
        geocodeLatLng(geocoder, map, infowindow, data.Latitude, data.Longitude)
      }
      setData(data)
      console.log(typeof (data))
    })

    const loader = new Loader({
      apiKey: 'AIzaSyBg-d2MzpI-ItBJhcDcm_MO90c2WGmbfDA',
      version: 'weekly'
    })

    loader.load().then(async () => {
      const map = new window.google.maps.Map(document.getElementById('map'), {
        zoom: 8,
        center: { lat: 4.667, lng: -74.081 }
      })
      const geocoder = new window.google.maps.Geocoder()
      const infowindow = new window.google.maps.InfoWindow()
      setMap(map)
      setGeocoder(geocoder)
      setInfowindow(infowindow)
    })

    window.scrollTo(0, 0)

    return () => {
      ws.disconnect()
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (945 + document.documentElement.scrollTop >= 1245) {
        setIsScroll(true)
        console.log('scrolldown')
      }
      if (945 + document.documentElement.scrollTop <= 1245) {
        setIsScroll(false)
      }
      console.log('window.innerHeight', 945 + document.documentElement.scrollTop)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const geocodeLatLng = (geocoder, map, infowindow, lat, lng) => {
    const latlng = { lat: parseFloat(lat), lng: parseFloat(lng) }
    geocoder
      .geocode({ location: latlng })
      .then((response) => {
        if (response.results[0]) {
          map.setZoom(11)
          if (marker) {
            marker.setMap(null)
          }
          const newMarker = new window.google.maps.Marker({
            position: latlng,
            map
          })
          setMarker(newMarker)
          infowindow.setContent(response.results[0].formatted_address)
          infowindow.open(map, newMarker)
        } else {
          window.alert('No results found')
        }
      })
      .catch((e) => window.alert('Geocoder failed due to: ' + e))
  }

  return (
    <>
      <Navbar id='navbar' />
      <main className={styles.main} id='main'>
        <section className={styles.section_map}>
          <div id='map' className={styles.map} />
          <text>
            <label> <h1>latitude:</h1> {lat}</label>
            <label><h1>longitude: </h1>{lng}</label>
          </text>
        </section>
        <section className={styles.section_render}>
          <div>
            <Canvas camera={{ zoom: 2, position: [1, 0.5, 1] }}>
              <ambientLight intensity={5} />
              <pointLight position={[3, 1, 2]} intensity={10} />
              <pointLight position={[-3, 1, -2]} intensity={10} />
              <pointLight position={[0, 2, 0]} intensity={10} />
              <Suspense fallback={null}>
                <MotoComponent eulerAngle={euler} />
              </Suspense>
            </Canvas>
          </div>
          <text>
            <label><h1>roll:</h1> {parseInt(euler.roll)}</label>
            <label><h1>pitch:</h1>{parseInt(euler.pitch)}</label>
            <label><h1>heading:</h1>{parseInt(euler.heading)}</label>
          </text>
        </section>
      </main>
      <section className={isScroll ? styles.moremonitoringEnable : styles.moremonitoring}>
        <Stadistics data={data} nameData='Temperature' useStandarEjes={false} />
        <Stadistics data={data} nameData='Accelerometer' />
        <Stadistics data={data} nameData='Gyroscope' />
        <Stadistics data={data} nameData='LinearAccelerometer' />
        <Stadistics data={data} nameData='Gravity' />
        <Stadistics data={data} nameData='Euler' />
        <Stadistics data={data} nameData='Magnetometer' />
        <Stadistics data={data} nameData='Latitude' useStandarEjes={false} />
        <Stadistics data={data} nameData='Longitude' useStandarEjes={false} />
        <Stadistics data={data} nameData='LocalTime' useStandarEjes={false} />
        <Stadistics data={data} nameData='Date' useStandarEjes={false} />
        <Stadistics data={data} nameData='GroundSpeed' useStandarEjes={false} />
        <Stadistics data={data} nameData='SatelitesInView' useStandarEjes={false} />
        <Stadistics data={data} nameData='SatelitesInUse' useStandarEjes={false} />
        <Stadistics data={data} nameData='AntennaHeight' useStandarEjes={false} />
      </section>
    </>
  )
}
