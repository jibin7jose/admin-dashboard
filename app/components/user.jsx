'use client'
import {useSession} from 'next-auth/react'

export default function User() {
    const {data: session} = useSession()
    return (
        <div>
            {session ? <h1>Welcome to the user page</h1> : <h1>Unauthorized</h1>}
        </div>
    )
}

