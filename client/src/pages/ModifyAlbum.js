import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import AddComponentModal from '../components/AddComponentModal'
import Component from '../components/Component'

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
  const [albumComponents, setAlbumComponents] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openAddComponentModal = () => {
    setIsModalOpen(true)
  }

  const closeAddComponentModal = async () => {
    setIsModalOpen(false)

    const componentsResponse = await axios.get(`/albums/${albumId}/components`)
    setAlbumComponents(componentsResponse.data.components)
  }

  useEffect(() => {
    const getAlbumInfo = async () => {
      try {
        const [albumResponse, componentsResponse] = await Promise.all([
          axios.get(`/albums/${albumId}`),
          axios.get(`/albums/${albumId}/components`)
        ])
        setFormState(albumResponse.data.album)
        setAlbumInfo(albumResponse.data.album)
        setAlbumComponents(componentsResponse.data.components)
      } catch (error) {
        console.error('Error fetching album information and components:', error)
      }
    }
    getAlbumInfo()
  }, [albumId])

  useEffect(() => {
    console.log('Form State:', formState)
  }, [formState])

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
          />

          <div>
            {albumComponents.map((component) =>
              component && component._id && component.type && component.data ? (
                <Component
                  key={component._id}
                  type={component.type}
                  data={component.data}
                />
              ) : null
            )}
          </div>
        </div>
      ) : (
        <p>No Album Info.</p>
      )}
    </div>
  )
}

export default ModifyAlbum
