"use client"
import React, { useEffect, useState } from 'react'
import styles from "./page.module.css"
import Link from "next/link"
import { signIn,useSession } from 'next-auth/react'
import {useRouter} from "next/navigation"

const Login = () => {
  const session = useSession();
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if(session.status === "authenticated"){
      router.push("/dashboard");
    }
  }, [session.status, router]);

  if(session.status == "loading"){
    return <p>loading....</p>
  }

  const handleSubmit = async(e)=>{
    e.preventDefault();
    setError("");
    setLoading(true);
    
    const email = e.target[0].value;
    const password = e.target[1].value;
    
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    
    setLoading(false);
    
    if(result?.error) {
      setError(result.error);
    } else if(result?.ok) {
      router.push("/dashboard");
    }
  }
  return (
    <div className = {styles.container}>
       <form className={styles.form} onSubmit={handleSubmit}>
        {error && <p style={{color: "red"}}>{error}</p>}
               
                 <input
                  type="email"
                  placeholder = "email"
                  className={styles.input}
                  required
                />
                 <input
                  type="password"
                  placeholder = "password"
                  className={styles.input}
                  required
                />
                <button className={styles.button} disabled={loading}>
                  {loading ? "logging in..." : "login"}
                </button>
                <Link href="/dashboard/register">don't have account? register</Link>
             </form>
      <button onClick={(()=>signIn("google"))}>login with google</button>
    </div>
  )
}

export default Login