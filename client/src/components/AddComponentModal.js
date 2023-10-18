import { useState } from 'react'
import Modal from 'react-modal'

Modal.setAppElement('#root')

const AddComponentModal = ({ isOpen, onClose, onAddComponent }) => {
  const [componentType, setComponentType] = useState('image')
  const [componentData, setComponentData] = useState('')
  const [imageLink, setImageLink] = useState('')

  const createComponent = (type, data) => {
    return {
      type: type,
      data: data
    }
  }

  const handleAddComponent = () => {
    const newComponent = createComponent({
      type: componentType,
      data: componentData
    })
    onAddComponent(newComponent)
    onClose()
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
