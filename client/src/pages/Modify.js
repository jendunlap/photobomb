import { useState, useEffect, useContext } from 'react'
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
  // const { addedComponents, setAddedComponents } = useContext(AppContext)
  const [addedComponents, setAddedComponents] = useState([])
  const [editingComponentIndex, setEditingComponentIndex] = useState(-1)
  const [editedContent, setEditedContent] = useState({})

  const handleEditComponent = (index) => {
    setEditingComponentIndex(index)
  }

  const handleSaveEdit = () => {
    // Save the edited content in your formState or wherever you store component data
    const updatedComponents = [...formState.components]
    updatedComponents[editingComponentIndex].content = editedContent

    setFormState((prevState) => ({
      ...prevState,
      components: updatedComponents
    }))

    // Clear the editing state
    setEditingComponentIndex(-1)
  }

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

    console.log('Before adding component:', formState)

    setFormState((prevState) => ({
      ...prevState,
      components: [...prevState.components, newComponent]
    }))

    console.log('After adding component:', formState)

    // setAddedComponents((prevAddedComponents) => [
    //   ...prevAddedComponents,
    //   newComponent
    // ])
    // console.log(newComponent)

    // console.log('Added Components:', addedComponents)
  }

  const editComponent = (index, updatedContent) => {
    console.log('Before editing component:', formState)

    const updatedComponents = [...formState.components]
    updatedComponents[index].content = updatedContent

    setFormState((prevState) => ({
      ...prevState,
      components: updatedComponents
    }))

    console.log('After editing component:', formState)
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

      {/* {formState.components &&
        formState.components.map((component, index) => (
          <div key={index}>
            {console.log('Rendering component:', component)}
            <Registry
              component={component}
              onEdit={(updatedContent) => editComponent(index, updatedContent)}
            />
          </div>
        ))} */}

      {formState.components &&
        formState.components.map((component, index) => (
          <div key={index}>
            {console.log('Rendering component:', component)}
            <Registry
              component={component}
              onEdit={(updatedContent) => editComponent(index, updatedContent)}
            />
            {editingComponentIndex === index ? (
              // Display editing form or UI for the currently edited component
              <div>
                {/* Editing form/UI */}
                <button onClick={handleSaveEdit}>Save</button>
              </div>
            ) : (
              <button onClick={() => handleEditComponent(index)}>Edit</button>
            )}
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
