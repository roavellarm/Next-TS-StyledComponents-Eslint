import Link from 'next/link'
import styled from 'styled-components'

const Title = styled.h1`
  color: blue;
`

export default function Landing() {
  return (
    <div>
      <Link href="/about">About</Link>
      <Title>FIRST PAGE</Title>
    </div>
  )
}
