import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Grid from '../components/Grid'
import Hero from '../components/Hero'
import Image from '../components/Image'
import Images from '../components/Image'
import Text from '../components/Text'

const Registry = ({ component, onEdit }) => {
  switch (component.type) {
    case 'Grid':
      return <Grid content={component.content} onEdit={onEdit} />
    case 'Hero':
      return <Hero content={component.content} onEdit={onEdit} />
    case 'Image':
      return <Image content={component.content} onEdit={onEdit} />
    case 'Images':
      return <Images content={component.content} onEdit={onEdit} />
    case 'Text':
      return <Text content={component.content} onEdit={onEdit} />
    default:
      return null
  }
}

export default Registry