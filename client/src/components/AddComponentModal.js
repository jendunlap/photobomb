import { useState } from 'react'
import { useParams } from 'react-router-dom'
import Modal from 'react-modal'
import axios from 'axios'

Modal.setAppElement('#root')

const AddComponentModal = ({ isOpen, onClose, onAddComponent }) => {
  const { albumId } = useParams()
  const [componentType, setComponentType] = useState('image-link')
  const [componentData, setComponentData] = useState('')

  const createComponent = () => {
    if (componentType && componentData) {
      return {
        type: componentType,
        data: componentData,
        album: albumId
      }
    }
    return null
  }

  const handleAddComponent = async () => {
    if (componentType && componentData) {
      const newComponent = createComponent()
      if (newComponent) {
        onAddComponent(newComponent)
        try {
          await axios.post(`/albums/${albumId}/components`, newComponent)
        } catch (error) {
          console.error('Error creating component:', error)
        }
        onClose()
      }
    }
  }

  // const handleAddComponent = () => {
  //   if (componentType && componentData) {
  //     const newComponent = createComponent()
  //     if (newComponent) {
  //       onAddComponent(newComponent)
  //       onClose()
  //     }
  //   }
  // }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Add Component Modal"
    >
      <h2 className="modalHeader">ADD COMPONENT!</h2>
      <div className="modalOptions">
        <label className="modalLabel">select type:</label>
        <select
          value={componentType}
          onChange={(e) => setComponentType(e.target.value)}
        >
          <option value="image">Image</option>
          <option value="text">Text</option>
          <option value="image-link">Image Link</option>
        </select>
        <label className="modalLabel">enter info:</label>
        <input
          type="text"
          value={componentData}
          onChange={(e) => setComponentData(e.target.value)}
        />
      </div>
      <div className="modalButtons">
        <button className="modalButton" onClick={handleAddComponent}>
          Add Component!
        </button>
        <button className="modalButton" onClick={onClose}>
          Cancel!
        </button>
      </div>
    </Modal>
  )
}

export default AddComponentModal
