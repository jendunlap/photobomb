import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Registry from '../components/Registry'

const Modify = () => {
  let { albumId } = useParams()
  let navigate = useNavigate()

  const initialState = {
    name: '',
    components: []
  }

  // const [albumComponents, setAlbumComponents] = useState([])
  const [formState, setFormState] = useState(initialState)

  const addComponent = (type) => {
    const newComponent = {
      type,
      content: {}
    }

    console.log('Adding component:', newComponent)

    setFormState({
      ...formState,
      components: [...formState.components, newComponent]
    })
    // setAlbumComponents([...albumComponents, newComponent])
    // console.log('Album Components:', albumComponents)
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

  const deleteAlbum = async () => {
    await axios.delete(`/albums/${albumId}`)
    navigate(`/albums`)
  }

  const editComponent = (index, updatedContent) => {
    const updatedComponents = [...formState.components]
    updatedComponents[index].content = updatedContent

    setFormState({
      ...formState,
      components: updatedComponents
    })
  }

  return (
    <div>
      {/* <form className="modifyForm" onSubmit={handleSubmit}>
        <label htmlFor="name">name your album!</label>
        <input
          onChange={handleChange}
          type="text"
          id="name"
          value={formState.name}
        /> */}
      <button onClick={() => addComponent('Grid')}>Add Grid</button>
      <button onClick={() => addComponent('Hero')}>Add Hero</button>
      <button onClick={() => addComponent('Image')}>Add Image</button>
      <button onClick={() => addComponent('Images')}>Add Images</button>
      <button onClick={() => addComponent('Text')}>Add Text</button>
      {/* </form> */}

      {formState.components.map((component, index) => (
        <div key={index}>
          {console.log('Rendering component:', component)}
          <Registry
            component={component}
            onEdit={(updatedContent) => editComponent(index, updatedContent)}
          />
        </div>
      ))}

      <button className="submitButton" type="submit" onClick={handleSubmit}>
        save changes
      </button>
      <button className="deleteButton" onClick={deleteAlbum}>
        delete album
      </button>
    </div>
  )
}

export default Modify
