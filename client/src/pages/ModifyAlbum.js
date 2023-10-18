import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import AddComponentModal from '../components/AddComponentModal'

const ModifyAlbum = () => {
  let { albumId } = useParams()
  let navigate = useNavigate()

  const initialState = {
    name: '',
    image: '',
    components: []
  }

  const [formState, setFormState] = useState(initialState)
  const [albumInfo, setAlbumInfo] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [componentType, setComponentType] = useState('image')
  const [componentData, setComponentData] = useState('')

  const createComponent = (componentType, componentData) => {
    return {
      type: componentData.type,
      data: componentData.data
    }
  }

  const openAddComponentModal = () => {
    setIsModalOpen(true)
    const newComponent = createComponent(componentType, componentData)
    addComponent(newComponent)
  }

  const addComponent = (newComponent) => {
    setFormState((prevState) => ({
      ...prevState,
      components: [...prevState.components, newComponent]
    }))
    console.log('Updated Form State:', formState)
  }

  const closeAddComponentModal = () => {
    setIsModalOpen(false)
  }

  useEffect(() => {
    console.log('Updated Form State:', formState)
  }, [formState])

  useEffect(() => {
    const getAlbumInfo = async () => {
      const response = await axios.get(`/albums/${albumId}`)
      setAlbumInfo(response.data.album)
      setFormState(response.data.album)
      console.log(response.data.album)
    }
    getAlbumInfo()
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()
    await axios.put(`/albums/${albumId}`, formState)
    setFormState(initialState)
    navigate(`/albums/${albumId}`)
  }

  const handleChange = (event) => {
    setFormState({ ...formState, [event.target.id]: event.target.value })
  }

  return (
    <div>
      {albumInfo ? (
        <div>
          <div className="bannerContainer">
            <img
              className="albumBanner"
              src={albumInfo.image}
              alt={albumInfo.name}
            />
            <h1 className="albumBannerName">{albumInfo.name}</h1>
          </div>
          <button onClick={openAddComponentModal}>Add Component</button>

          <AddComponentModal
            isOpen={isModalOpen}
            onClose={closeAddComponentModal}
            onAddComponent={addComponent}
          />
        </div>
      ) : (
        <p>No Album Info.</p>
      )}
    </div>
  )
}

export default ModifyAlbum
