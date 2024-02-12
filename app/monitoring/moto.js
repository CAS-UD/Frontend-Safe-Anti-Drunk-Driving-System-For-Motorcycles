import React, { useRef, useEffect, useState } from 'react'
import { useGLTF } from '@react-three/drei'

const Moto = React.forwardRef((props, ref) => {
  const { nodes, materials } = useGLTF('/modelDraco.gltf')
  return (
    <group {...props} dispose={null} ref={ref}>
      <mesh geometry={nodes.node_id48.geometry} material={materials['71']} position={[-0.151, 0.016, 0.523]} scale={0.01} />
    </group>
  )
})

useGLTF.preload('/modelDraco.gltf')

export const MotoComponent = (props) => {
  const groupRef = useRef()
  const [isRendered, setIsRendered] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsRendered(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])
  useEffect(() => {
    if (groupRef.current) {
      groupRef.current.rotation.x = Math.PI * props.eulerAngle.pitch / 180
      groupRef.current.rotation.y = -1 * Math.PI * props.eulerAngle.heading / 180
      groupRef.current.rotation.z = -1 * (Math.PI * props.eulerAngle.roll / 180) - Math.PI
    }
  }, [props.eulerAngle.roll, props.eulerAngle.pitch, props.eulerAngle.heading])

  if (!isRendered) {
    return null
  }
  return (
    <group ref={groupRef}>
      <Moto position={[0.2, -0.2, -0.5]} />
    </group>
  )
}
