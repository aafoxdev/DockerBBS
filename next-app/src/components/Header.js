import Container from '@/components/Container'
import Logo from '@/components/Logo'
import Nav from '@/components/Nav'
import styles from '@/styles/header.module.css'

export default function Header() {
  return (
    <header>
      <Container large>
        <div className={styles.flexContainer}>
          <Logo boxOn />
          <Nav />
        </div>
      </Container>
    </header>
  )
}
