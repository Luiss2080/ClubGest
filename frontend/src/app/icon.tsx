import { ImageResponse } from 'next/og'

// Configuramos las proporciones estándar del Favicon
export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(to bottom right, #2563eb, #2dd4bf)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '25%', // Bordes ligeramente redondeados
          color: 'white',
          fontSize: '20px',
          fontWeight: '900',
          fontFamily: 'sans-serif',
          boxShadow: 'inset 0 0 10px rgba(0,0,0,0.2)'
        }}
      >
        CG
      </div>
    ),
    { ...size }
  )
}
