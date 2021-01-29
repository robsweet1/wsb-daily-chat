import React, { useEffect, useState } from 'react'
import CommentColumn from './CommentColumn'
import Navbar from './Navbar'
import '../app.css'

const App = () => {
  const [oldest, setOldest] = useState([])
  const [older, setOlder] = useState([])
  const [middle, setMiddle] = useState([])
  const [younger, setYounger] = useState([])
  const [youngest, setYoungest] = useState([])

  useEffect(() => {
    const source = new EventSource('http://localhost:5000/api')

    source.onmessage = event => {
      const data = JSON.parse(event.data)
      console.log(data)
      setOldest(data['5000_days'].reverse())
      setOlder(data['2000_days'].reverse())
      setMiddle(data['1000_days'].reverse())
      setYounger(data['500_days'].reverse())
      setYoungest(data['100_days'].reverse())
    }
  }, [])

  return (
    <>
    <div className='container'>
      <Navbar />
      <div className='columns-container'>
        <CommentColumn comments={oldest} title={'The Apostles'} />
        <CommentColumn comments={older} title={'Over the Hill'} />
        <CommentColumn comments={middle} title={'Mid life Crisis'} />
        <CommentColumn comments={younger} title={'Young Buck'} />
        <CommentColumn comments={youngest} title={'Baby'} />
      </div>
    </div>
    </>
  )
}

export default App
