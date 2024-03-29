import { useState } from 'react'
import { useParams } from 'react-router-dom'
import Modal from 'react-modal'
import axios from 'axios'

Modal.setAppElement('#root')

const AddComponentModal = ({ isOpen, onClose, onAddComponent }) => {
  const { albumId } = useParams()

  const initialState = {
    type: 'image',
    data: '',
    album: albumId
  }

  const [formState, setFormState] = useState(initialState)

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormState({ ...formState, [name]: value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const { type, data, album } = formState

    let componentData = {}

    if (type === 'image') {
      componentData.image = {
        imageUrl: data,
        altText: ''
      }
    } else if (type === 'text') {
      componentData.text = {
        text: data
      }
    }

    const requestData = {
      type,
      data: componentData,
      album
    }

    console.log(requestData)

    await axios.post(`/albums/${albumId}/components`, requestData)
    setFormState(initialState)
    onClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Add Component Modal"
    >
      <h2 className="modalHeader">ADD COMPONENT!</h2>
      <div className="modalOptions">
        <label className="modalLabel">select type:</label>
        <select name="type" value={formState.type} onChange={handleChange}>
          <option value="image">Image</option>
          <option value="text">Text</option>
        </select>
        <label className="modalLabel">enter info:</label>
        <input
          type="text"
          name="data"
          value={formState.data}
          onChange={handleChange}
        />
      </div>
      <div className="modalButtons">
        <button className="modalButton" onClick={handleSubmit}>
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
