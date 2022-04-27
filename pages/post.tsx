import React from "react"
import { useState, useEffect } from "react";
import Link from "next/link"

export default function Posts() {
    const [posts, setPosts] = useState([])

    async function fetchPosts() {
        const request = await fetch("https://jsonplaceholder.typicode.com/posts")
        const data = await request.json()
        setPosts(data)
    }

    useEffect(()=>{
        fetchPosts()
    }, [])

    return (
        <main>
            <section style={{padding: "5rem"}}>
                <h1 style={{marginBottom: "1rem"}}>List posts</h1>
                <ul>
                    {posts.map(post => (
                        <li  style={{lineHeight: 1.4}}>
                            <Link href={`posts/${post.id}`}>
                                <a key={post.id}>
                                    <h3>{post.title}</h3>
                                </a>
                            </Link>
                        </li>
                    ))}
                </ul>
            </section>
        </main>

    )
}
