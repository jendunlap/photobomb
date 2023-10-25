import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Modal from 'react-modal'
import axios from 'axios'

Modal.setAppElement('#root')

const ModifyComponentModal = ({
  isOpen,
  onClose,
  onModifyComponent,
  componentData
}) => {
  const { albumId } = useParams()

  const initialState = {
    type: 'image',
    data: '',
    album: albumId
  }

  const [formState, setFormState] = useState(initialState)
  const [componentInfo, setComponentInfo] = useState(null)

  useEffect(() => {
    const getComponentInfo = async (componentId) => {
      try {
        const response = await axios.get(
          `/albums/${albumId}/components/${componentId}`
        )

        setFormState(response.data.component)
        setComponentInfo(response.data.component)
      } catch (error) {
        console.error('Error fetching component:', error)
      }
    }
    getComponentInfo()
  }, [])

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormState({ ...formState, [name]: value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const { type, data, album } = formState

    const requestData = {
      type,
      data,
      album
    }

    console.log(requestData)

    await axios.put(
      `/albums/${albumId}/components/${componentData._id}`,
      requestData
    )
    onClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Modify Component Modal"
    >
      <h2 className="modalHeader">MODIFY COMPONENT</h2>
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
          Modify Component
        </button>
        <button className="modalButton" onClick={onClose}>
          Cancel
        </button>
      </div>
    </Modal>
  )
}

export default ModifyComponentModal
