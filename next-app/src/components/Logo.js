import Link from 'next/link'
import styles from '@/styles/logo.module.css'
import Image from "next/legacy/image"
import logo from '@/img/DockerBBS.png'

export default function Logo({ boxOn = false }) {
  return (
    <Link href="/" >
            <div className={boxOn ? styles.box : styles.basic}>
                {boxOn ? 
                <Image src={logo} alt="" priority placeholder="blur"/> : "DockerBBS"}
            </div>
        </Link>
  );
}