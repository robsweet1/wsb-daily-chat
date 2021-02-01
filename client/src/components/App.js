import React, { useEffect, useState } from 'react'
import CommentColumn from './CommentColumn'
import Navbar from './Navbar'
import '../app.css'

const App = () => {
  const [amc, setAmc] = useState([])
  const [gme, setGme] = useState([])
  const [nok, setNok] = useState([])
  const [bb, setBb] = useState([])
  const [other, setOther] = useState([])

  useEffect(() => {
    const source = new EventSource('/api')

    source.onmessage = event => {
      const data = JSON.parse(event.data)
      console.log(data)
      setAmc(data['AMC'])
      setGme(data['GME'])
      setNok(data['NOK'])
      setBb(data['BB'])
      setOther(data['OTHER'])
    }
  }, [])

  return (
    <>
    <div className='container'>
      <Navbar />
      <div className='columns-container'>
        <CommentColumn comments={amc} title={'AMC'} />
        <CommentColumn comments={bb} title={'BB'} />
        <CommentColumn comments={gme} title={'GME'} />
        <CommentColumn comments={nok} title={'NOK'} />
        <CommentColumn comments={other} title={'OTHER'} />
      </div>
    </div>
    </>
  )
}

export default App
