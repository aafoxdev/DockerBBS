import Container from '@/components/Container'
import Logo from '@/components/Logo'
import Social from '@/components/Social'
import styles from '@/styles/footer.module.css'
export default function Footer() {
    return (
      <footer className={styles.wrapper}>
        <Container>
          <div className={styles.flexContainer}>
          <Logo />
          <Social />
          </div>
        </Container>
      </footer>
    )
  }