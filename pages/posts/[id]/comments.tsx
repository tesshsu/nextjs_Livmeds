import React, { useContext, useEffect, useState } from "react";
import { Posts } from "src/components/Post";
import Fetch from "isomorphic-unfetch";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import { GlobalContext } from "context";

const PostDesc = (props: any) => {
  const { state, dispatch } = useContext(GlobalContext);

  const [comments, setComments] = useState(null);
  const router = useRouter();
  const { id } = router.query;
  console.log("id=>", comments);
  const getPosts = async () => {
    try {
      const { data } = await axios.get(
        `https://jsonplaceholder.typicode.com/posts/${id}/comments`
      );
      setComments(data);
    } catch (err) {}
  };
  useEffect(() => {
    if (state.userInfo) {
      getPosts();
    } else {
      router.push("/");
    }
  }, []);

  return (
    <section style={{padding: "5rem"}}>
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

      {comments && (
        <main style={{padding: "1rem"}}>
          <h1>Comments</h1>
          <ul style={{ padding: "1rem" }}>
            {comments.map((comment) => (
              <li style={{ margin: "20px 0" }}>
                <h2 style={{lineHeight: 1.6}}>ID: {comment.id}</h2>
                <h2 style={{lineHeight: 1.6}}>name: {comment.name}</h2>
                <h2 style={{lineHeight: 1.4}}>Email: {comment.email}</h2>
                <p>{comment.body}</p>
              </li>
            ))}
          </ul>
        </main>
      )}
    </section>
  );
};

export default PostDesc;

export async function getStaticProps({ params }: any) {
  console.log("params==>", params);
  const API_URL = `https://jsonplaceholder.typicode.com/posts/2`;
  const request = await fetch(API_URL);
  const data = await request.json();
  console.log("data=>", data);
  return {
    props: { postDesc: data },
  };
}

export async function getStaticPaths() {
  const API_URL = `https://jsonplaceholder.typicode.com/posts`;
  const response = await fetch(API_URL);
  const data = await response.json();
  return {
    fallback: "blocking",
    paths: data.map((article: any) => ({
      params: { id: `${article.id.toString()}/comments` },
    })),
  };
}
