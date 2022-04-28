import { useSession } from "next-auth/react";
import React, { useContext, useEffect } from "react";
import { Login } from "../Login";
import { Logged } from "../Logged";
import styles from "./index.module.scss";
import { GlobalContext } from "context";
import { USER_INFO } from "context/constants";
import Router from "next/router";

export const Card = () => {
  const { data: session } = useSession();
  const { state, dispatch } = useContext(GlobalContext);

  console.log("session=>", session);

  useEffect(() => {
    if (session) {
      Router.push('/posts');
      dispatch({ type: USER_INFO, payload: session.user });
    }
  }, [session]);

  useEffect(() => {
    if (state.userInfo) {
    }
  },[])

  return (
    <div className={styles.page_container}>
      <section>
        <div
          className={`${styles.slider} ${
            session ? styles.logged : styles.login
          }`}
        >
          <Login />
          <Logged />
        </div>
      </section>
    </div>
  );
};
