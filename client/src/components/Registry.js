import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CreateGrid from './CreateGrid'
import Hero from '../components/Hero'
import Image from '../components/Image'
import Images from '../components/Images'
import Text from '../components/Text'

const Registry = ({ component, onEdit }) => {
  const handleEditClick = () => {
    // When the "Edit" button is clicked, call the onEdit callback with the component's content
    onEdit(component.content)
  }

  switch (component.type) {
    case 'Grid':
      return (
        <div>
          <CreateGrid content={component.content} onEdit={onEdit} />
          {/* <button onClick={handleEditClick}>Edit</button> */}
        </div>
      )
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
