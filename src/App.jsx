import { useState } from 'react'
import MainLayout from './layouts/MainLayout';
import MP3Player from './components/MP3Player';
import './App.css'

function App() {
  return (
    <MainLayout>
      <MP3Player />
    </MainLayout>
  )
}

export default App
