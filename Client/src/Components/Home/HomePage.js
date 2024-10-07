import React from 'react'
import AdBanner from './AdBanner'
import Navbar from './Navbar'

function HomePage() {
  return (
    <>  
    <header>
       <Navbar/>
    </header>
    <main>
    <div className="ad-banner">
      <AdBanner/>
    </div>
    </main>
    </>
  )
}

export default HomePage
