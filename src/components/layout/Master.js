import React from 'react'
import {NavBar, Footer} from './index'
import Random from '../recipes/Random' 

export default () => {
  return (
    <React.Fragment>
      <NavBar />
      <div className="container mx-auto">
        <h1>Hello from Index</h1>
        <Random />
      </div>
      <Footer />
    </React.Fragment>
  )
}
