import Header from '@/components/partials/Header';
import {Poppins } from 'next/font/google'
import '@/assets/css/globals.scss';

// const syne = Syne({ subsets: ['latin'] })
const poppins = Poppins(
  { 
    subsets: ['latin'],
    weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  },
)

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.className}`}>
        <Header />
        <main>
          {children}
        </main>
      </body>
    </html>
  )
}
