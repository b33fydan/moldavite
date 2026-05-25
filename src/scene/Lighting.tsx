export function Lighting() {
  return (
    <>
      <ambientLight intensity={0.3} color="#c8c0ff" />
      <directionalLight position={[5, 8, 5]} intensity={0.6} color="#f5f7fb" />
      <pointLight position={[-4, -2, 4]} intensity={0.2} color="#55d6ff" />
    </>
  )
}
