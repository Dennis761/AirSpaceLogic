import React from 'react'
import TextDisplay from '../../../Models/TextDisplay/TextDisplay.tsx'
import './MainDescriptionBottom.css'

export default function MainDescriptionBottom({content}) {
  return (
    <div className="main-description-top-wrapper">
      <TextDisplay content={content}/>
    </div>
  )
}
