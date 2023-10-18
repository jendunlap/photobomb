import { useState } from 'react'
import Modal from 'react-modal'

Modal.setAppElement('#root')

const AddComponentModal = ({ isOpen, onClose, onAddComponent }) => {
  const [componentType, setComponentType] = useState('image-link')
  const [componentData, setComponentData] = useState('')
  const [imageLink, setImageLink] = useState('')

  const handleImageSelect = (link) => {
    setImageLink(link)
  }

  const createComponent = () => {
    if (componentType && componentData) {
      return {
        type: componentType,
        data: componentData
      }
    }
    return null
  }

  // const createComponent = (type, data) => {
  //   return {
  //     type: type,
  //     data: data
  //   }
  // }

  const handleAddComponent = () => {
    console.log('componentType:', componentType)
    console.log('componentData:', componentData)

    if (componentType && componentData) {
      const newComponent = createComponent(componentType, componentData)
      if (newComponent) {
        const additionSuccessful = onAddComponent(newComponent)
        if (additionSuccessful) {
          onClose()
        } else {
          console.log('Error adding component:')
        }
      } else {
        console.log('Error adding component: type or data missing')
      }
    } else {
      console.log('Error adding component: type or data missing')
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Add Component Modal"
    >
      <h2>Add Component</h2>
      <label>Select component type:</label>
      <select
        value={componentType}
        onChange={(e) => setComponentType(e.target.value)}
      >
        <option value="image">Image</option>
        <option value="text">Text</option>
        <option value="image-link">Image Link</option>
      </select>
      <label>Component Data:</label>
      <input
        type="text"
        value={componentData}
        onChange={(e) => setComponentData(e.target.value)}
      />
      <button onClick={handleAddComponent}>Add Component</button>
      <button onClick={onClose}>Cancel</button>
    </Modal>
  )
}

export default AddComponentModal
