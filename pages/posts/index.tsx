import React, { useContext, useEffect, useState } from "react";
import { Posts } from "src/components/Post";
import { useSession, signOut } from "next-auth/react";

import Fetch from "isomorphic-unfetch";
import Link from "next/link";
import axios from "axios";
import Router from "next/router";
import { GlobalContext } from "context";
import { useRouter } from "next/router";

const Post = (props: any) => {
  const { state, dispatch } = useContext(GlobalContext);
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const getPosts = async () => {
    try {
      const { data } = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );
      setPosts(data);
    } catch (err) {}
  };

  useEffect(() => {
    if (state.userInfo) {
      getPosts();
    } else {
      Router.push("/");
    }
  }, []);

  return (
    <section style={{padding: "5rem"}}>
        <h1 style={{marginBottom: "1rem"}}>List posts</h1>
      <button
            style={{padding: "1rem", fontSize: "0.75rem", color: "blue"}}
            onClick={() => {
              signOut();
              router.push("/");
              localStorage.removeItem("userInfo");
            }}
      >
        Logout
      </button>
      <main style={{padding: "1rem"}}>
          <ul>
            {posts.map((post) => (
                <li  style={{lineHeight: 1.6}}>
                  <Link href={`posts/${post.id}`}>
                    <a key={post.id}  style={{color: '#1b8d38'}}>
                      <h3>{post.title}</h3>
                    </a>
                  </Link>
                </li>
            ))}
          </ul>
      </main>
    </section>
  );
};

export const getStaticProps = async () => {
  const API_URL = "https://jsonplaceholder.typicode.com/posts";
  const request = await fetch(API_URL);
  const posts = await request.json();
  return {
    props: { posts },
    revalidate: 60, //In seconds
  };
};

export default Post;
