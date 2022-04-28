import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import {useRouter} from "next/router";
import {signOut} from "next-auth/react";
import {GlobalContext} from "context";

const PostDesc = (props: any) => {
  // @ts-ignore
  const { state } = useContext(GlobalContext);

  const [desc, setDesc] = useState<any[]>([]);
  const router = useRouter();
  const { id } = router.query;

  const getPosts = async () => {
    try {
      const { data } = await axios.get(
        `https://jsonplaceholder.typicode.com/posts/${id}`
      );
      setDesc(data);
    } catch (err) {}
  };
  useEffect(() => {
    if (state.userInfo) {
      getPosts();
    } else {
      router.push("/");
    }
  }, []);

  // @ts-ignore
  const {title, body} = desc;
  return (
      <section style={{padding: "5rem"}}>
      <button
          style={{padding: "1rem", fontSize: "0.75rem", color: "blue"}}
          onClick={() => {
            signOut();
            router.push("/");
            localStorage.removeItem("userInfo")
          }}
      >
        Logout
      </button>

      {desc && (
        <main style={{ padding: "1rem" }}>
          <h1>Description</h1>
          <div style={{ margin: "20px 0", padding: "1rem" }}>
            <h2 style={{lineHeight: 1.6}}>Post Id: {id}</h2>
            <h2 style={{lineHeight: 1.8}}>Post Title: {title}</h2>
            <p style={{lineHeight: 1.4}}>{body}</p>
          </div>
          <button style={{padding: "1rem", fontSize: "0.75rem", color: "blue"}}
                  onClick={() => router.push(`/posts/${id}/comments`)}>
            Check this post comments
          </button>
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
      params: { id: article.id.toString() },
    })),
  };
}
