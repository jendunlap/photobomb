import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Modal from 'react-modal'
import axios from 'axios'

Modal.setAppElement('#root')

const ModifyComponentModal = ({
  isOpen,
  onClose,
  onModifyComponent,
  componentData,
  componentId,
  isFetchingComponentData
}) => {
  const { albumId } = useParams()

  const initialState = {
    type: 'image',
    data: '',
    album: albumId
  }

  const [formState, setFormState] = useState(initialState)
  const [formData, setFormData] = useState('')
  const [componentInfo, setComponentInfo] = useState(null)

  useEffect(() => {
    const getComponentInfo = async () => {
      try {
        const response = await axios.get(
          `/albums/${albumId}/components/${componentId}`
        )
        console.log(response.data.component)
        setFormState(response.data.component)

        if (response.data.component.type === 'text') {
          setFormData(response.data.component.data.text.text)
        } else {
          setFormData('')
        }

        setComponentInfo(response.data.component)
      } catch (error) {
        console.error('Error fetching component:', error)
      }
    }
    getComponentInfo()
  }, [componentId])

  const handleChange = (event) => {
    const { name, value } = event.target

    if (name === 'data') {
      setFormData(value)
    } else {
      setFormState((prevFormState) => ({
        ...prevFormState,
        [name]: value
      }))
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const { type, album } = formState
    let data

    if (type === 'image') {
      data = {
        image: {
          imageUrl: formData,
          altText: ''
        }
      }
    } else if (type === 'text') {
      data = {
        text: {
          text: formData
        }
      }
    }

    const requestData = {
      type,
      data,
      album
    }

    console.log(requestData)

    await axios.put(`/albums/${albumId}/components/${componentId}`, requestData)
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
          value={formData}
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
