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

  const [formState, setFormState] = useState(initialState)
  const [addedComponents, setAddedComponents] = useState([])

  useEffect(() => {
    if (albumId) {
      const getAlbumInfo = async () => {
        try {
          const response = await axios.get(`/albums/${albumId}`)
          console.log(response.data)

          setFormState({
            name: response.data.album.name,
            components: response.data.album.components || []
          })
        } catch (error) {
          console.error('Error fetching album information', error)
        }
      }
      getAlbumInfo()
    }
  }, [albumId])

  const addComponent = (type) => {
    const newComponent = {
      type,
      content: {}
    }
    setFormState((prevState) => ({
      ...prevState,
      components: [...prevState.components, newComponent]
    }))

    setAddedComponents((prevAddedComponents) => [
      ...prevAddedComponents,
      newComponent
    ])
    console.log(newComponent)
  }

  const editComponent = (index, updatedContent) => {
    const updatedComponents = [...formState.components]
    updatedComponents[index].content = updatedContent

    setFormState((prevState) => ({
      ...prevState,
      components: updatedComponents
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const updatedFormState = {
      ...formState,
      components: [...formState.components, ...addedComponents]
    }

    await axios.put(`/albums/${albumId}`, updatedFormState)

    setFormState({
      ...formState,
      name: initialState.name
    })

    setAddedComponents([])

    navigate(`/edit/${albumId}`)
  }

  const handleChange = (event) => {
    setFormState({ ...formState, [event.target.id]: event.target.value })
  }

  const deleteAlbum = async () => {
    await axios.delete(`/albums/${albumId}`)
    navigate(`/albums`)
  }

  return (
    <div>
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

      {formState.components &&
        formState.components.map((component, index) => (
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
