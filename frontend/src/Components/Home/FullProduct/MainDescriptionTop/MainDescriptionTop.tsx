import React from 'react'
import TextDisplay from '../../../Models/TextDisplay/TextDisplay.tsx'
import './MainDescriptionTop.css'

export default function MainDescriptionTop({content}) {
  return (
    <div className="main-description-top-wrapper">
      <TextDisplay content={content}/>
    </div>
  )
}
