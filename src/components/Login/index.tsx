import React from "react"
import { Facebook } from "../Buttons/Facebook"
import { Github } from "../Buttons/Github"
import { Google } from "../Buttons/Google"
import styles from "./index.module.scss"

export const Login = () => {
    return (
        <div className={styles.login_container}>
            <h1>
                Please login <span>👋</span>
            </h1>
            <p>test-livmeds application</p>
            <div className={styles.btn_group}>
                <Google />
            </div>
        </div>
    )
}
