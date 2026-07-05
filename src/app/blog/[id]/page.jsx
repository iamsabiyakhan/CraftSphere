import React from "react";
import styles from "./page.module.css";
import Image from "next/image";
import  { Metadata } from 'next'

async function getData(id) {
  const res = await fetch(`http://localhost:3000/api/posts/${id}`);
  if (!res.ok) {
    throw new Error("Failed to Fetch");
  }
  return res.json();
}

 

export async function generateMetadata({ params }) {
  const { id } = await params;

  const post = await getData(id);

  return {
    title: post.title,
    description: post.desc,
  };
}



const BlogPost = async ({ params }) => {
  const { id } = await params;
  const data = await getData(id);
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.info}>
          <h1 className={styles.title}>{data.title}</h1>
          <p className={styles.desc}>
            {data.desc}
          </p>
         </div>
        <div className={styles.imageContainer}>
          <Image
            src={data.img}
            alt="Blog post image"
            fill={true}
            className={styles.image}
          />
        </div>
      </div>
      <div className={styles.content}>
        <p className={styles.text}>
          {data.content}
         {data.username}
        </p>
      </div>
    </div>
  );
};

export default BlogPost;
