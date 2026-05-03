import React, { ReactNode } from 'react'
import Header from './Home/Header'
import Footer from './Home/Footer';

type HomeLayoutProp = {
  children: ReactNode;
}

function HomeLayout({ children }: HomeLayoutProp) {
  return (
    <>
      <div className="print:hidden"><Header /></div>
      {children}
      <div className="print:hidden"><Footer /></div>
    </>
  )
}

export default HomeLayout
