import Link from 'next/link'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: lightpink;
`

export default function About() {
  return (
    <Container>
      <Link href="/">
        <a>Go back</a>
      </Link>
      <h1>About</h1>
    </Container>
  )
}
