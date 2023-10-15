import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Registry from '../components/Registry'

const Modify = () => {
  let { albumId } = useParams()
  let navigate = useNavigate()

  const initialState = {
    name: ''
  }

  const [albumComponents, setAlbumComponents] = useState([])
  const [formState, setFormState] = useState(initialState)

  const addComponent = (type) => {
    const newComponent = {
      type,
      content: {}
    }
    setAlbumComponents([...albumComponents, newComponent])
  }

  useEffect(() => {
    const getAlbumInfo = async () => {
      try {
        const response = await axios.get(`/albums/${albumId}`)
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching album information', error)
      }
    }

    getAlbumInfo()
  }, [albumId])

  const handleSubmit = async (event) => {
    event.preventDefault()
    await axios.put(`/albums/${albumId}`, formState)
    setFormState(initialState)
    navigate(`/albums/${albumId}`)
  }

  const handleChange = (event) => {
    setFormState({ ...formState, [event.target.id]: event.target.value })
  }

  const editComponent = (index, updatedContent) => {
    const updatedComponents = [...albumComponents]
    updatedComponents[index].content = updatedContent
    setAlbumComponents(updatedComponents)
  }

  return (
    <div>
      <form className="modifyForm" onSubmit={handleSubmit}>
        <label htmlFor="name">name your album!</label>
        <input
          onChange={handleChange}
          type="text"
          id="name"
          value={formState.name}
        />
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
      </form>
      <button className="submitButton" type="submit" onClick={handleSubmit}>
        make changes
      </button>
    </div>
  )
}

export default Modify
