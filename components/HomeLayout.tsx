import React, { ReactNode } from 'react'
import Header from './Home/Header'
import Footer from './Home/Footer';

type HomeLayoutProp = {
  children: ReactNode;
}

function HomeLayout({ children }: HomeLayoutProp) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}

export default HomeLayout
