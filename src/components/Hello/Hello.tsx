// src/components/Hello.tsx
import React from 'react'

type HelloProps = {
  name: string
}

const Hello: React.FC<HelloProps> = ({ name }) => {
  return <div>Hello, {name}!</div>
}

export default Hello
