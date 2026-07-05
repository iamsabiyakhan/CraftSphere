"use client"
import React, {useState}  from 'react'
import styles from "./page.module.css"
import Link from "next/link"
import { useRouter } from 'next/navigation'


const Register = () => {
  const [err,setErr] = useState(false)
  const router = useRouter()

  const handleSubmit = async(e)=>{
    e.preventDefault();
    const name = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;

    try{
      const res = await fetch("/api/register", {
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body: JSON.stringify({
          name,
          email,
          password
        })
      })

      if (res.ok) {
        router.push("/dashboard/login?success=account-created")
      } else {
        setErr(true)
      }
    } catch(err){
      setErr(true)
    }
  }
  
  return (
    <div className={styles.container}>
       {err && <p style={{color: "red", marginBottom: "10px"}}>Registration failed. Email might already exist.</p>}
       <form className={styles.form} onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder = "username"
            className={styles.input}
            required
          />
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
          <button className={styles.button}>register</button>
          <p>Already have an account? <Link href="/dashboard/login">Login here</Link></p>
       </form>
    </div>
  )
}

export default Register