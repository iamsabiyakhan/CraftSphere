
"use client"
import styles from "./page.module.css"
import useSWR from "swr"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"

export default function Dashboard(){
    const session  = useSession();
    const router = useRouter();
    console.log(session)
    const fetcher = (...args) => fetch(...args).then(res => res.json())

    const {data,error,isLoading} = useSWR(
        `/api/posts?username=${session?.data?.user.name}`,
        fetcher
    )
    console.log(data)
     if(session.status ==="loading"){
        return <p>loding...</p>
     }
     if(session.status === "unauthenticated"){
        router?.push("/dashboard/login")
     }
     if(session.status === "authenticated"){
         return (
        <div className={styles.container}>
                dashboard
        </div>
    )
     }
   
   
}