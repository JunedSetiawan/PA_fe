
import { ReactNode } from 'react'
import { Roboto } from 'next/font/google'

const roboto = Roboto({
  weight: ['100', '300', '400', '500', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en" className={roboto.className}>
      <body>
        {children}
      </body>
    </html>
  )
}
