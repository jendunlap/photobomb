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

  const openAddComponentModal = () => {
    setIsModalOpen(true)
  }

  const addComponent = (newComponent) => {
    setFormState((prevState) => ({
      ...prevState,
      components: [...prevState.components, newComponent]
    }))
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
          <button className="createAlbumButton" onClick={openAddComponentModal}>
            Add Component!
          </button>
          <button className="createAlbumButton" onClick={handleSubmit}>
            Save Changes!
          </button>

          <AddComponentModal
            isOpen={isModalOpen}
            onClose={closeAddComponentModal}
            onAddComponent={addComponent}
          />

          <div className="components-container">
            {formState.components.map((component, index) => (
              <div key={index}>
                {component.type === 'image-link' && (
                  <a
                    href={component.data}
                    target="_blank"
                    rel="noreferrer"
                    className="componentLink"
                  >
                    IMAGE LINK stay tuned for API PHOTO DISPLAY!!
                  </a>
                )}
                {component.type === 'text' && <p>{component.data}</p>}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>No Album Info.</p>
      )}
    </div>
  )
}

export default ModifyAlbum
