import React from 'react'
import HomePosts from '../components/HomePosts'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'


function Home() {
  return (
    <>
    <Navbar/>
      <div className='px-8 md:px-[200px]'>
        <HomePosts />
        <HomePosts />
        <HomePosts />
      </div>
      <Footer/>
    </>

  )
}

export default Home