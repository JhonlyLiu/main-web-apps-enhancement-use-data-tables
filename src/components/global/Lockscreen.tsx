import React from 'react'

function Lockscreen() {
  return (
    <div style={{zIndex: '9999999', position: 'fixed', width: '100vw', height: '100vh', top: '0', left: '0', right: '0', bottom: '0', backgroundColor: 'red'}}>
      <div style={{display: 'flex', justifyContent: 'center', alignContent: 'center'}}>
        <div>
          <h1>Lockscreen</h1>
        </div>
      </div>
    </div>
  )
}

export default Lockscreen