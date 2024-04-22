import { Inter } from 'next/font/google'
import './ui/globals.css'

import Provider from './context/AuthContext';

import ToasterContext from "@/app/context/ToasterContext";

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: "solidServe Dashboard",
  description: 'Dashboard for apps built by Nabiel.',
}

export default function RootLayout({ children }) {
  return (
      <html lang="en">
      <body className={inter.className}>
      <Provider>
        <ToasterContext />
        {children}
      </Provider>
      </body>
      </html>
  );
}