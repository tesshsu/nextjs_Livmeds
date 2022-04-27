import { useSession, signOut } from "next-auth/react"
import React from "react"
import styles from "./index.module.scss"
import { BsFillCheckCircleFill } from "react-icons/bs"
import Link from "next/link";

export const Logged = () => {
  const defaultOptions = {
    autoplay: true,
    loop: false,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  }

  const { data: session } = useSession()

  return (
    <div className={styles.login_success_container}>
      <div className={styles.login_success_content}>
        <BsFillCheckCircleFill />
        <p>
          Hey {session?.user?.name},
          <br />
          you&apos;re logged in!
        </p>
      </div>
      <button className={styles.btn_post}>
          <Link href="/post">
              <a>Post</a>
          </Link>
      </button>
      <button onClick={() => signOut()} className={styles.btn_signout}>
        Sign out
      </button>
    </div>
  )
}
