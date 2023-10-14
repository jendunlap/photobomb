import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Registry from '../components/Registry'

const Modify = () => {
  let navigate = useNavigate()

  const [albumComponents, setAlbumComponents] = useState([])

  const addComponent = (type) => {
    const newComponent = {
      type,
      content: {}
    }
    setAlbumComponents([...albumComponents, newComponent])
  }

  const editComponent = (index, updatedContent) => {
    const updatedComponents = [...albumComponents]
    updatedComponents[index].content = updatedContent
    setAlbumComponents(updatedComponents)
  }

  return (
    <div>
      <button onClick={() => addComponent('Grid')}>Add Grid</button>
      <button onClick={() => addComponent('Hero')}>Add Hero</button>
      <button onClick={() => addComponent('Image')}>Add Image</button>
      <button onClick={() => addComponent('Images')}>Add Images</button>
      <button onClick={() => addComponent('Text')}>Add Text</button>

      {albumComponents.map((component, index) => (
        <Registry
          key={index}
          component={component}
          onEdit={(updatedContent) => editComponent(index, updatedContent)}
        />
      ))}
    </div>
  )
}

export default Modify
