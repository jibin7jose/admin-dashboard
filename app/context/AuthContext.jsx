'use client'

import { SessionProvider } from 'next-auth/react'

export default function Provider({ children }) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  )
}

/*
This code is a module that imports the SessionProvider component from next-auth/react and wraps the children components in the SessionProvider component.

 */