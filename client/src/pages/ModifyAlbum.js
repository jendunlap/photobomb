import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

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

  useEffect(() => {
    const getAlbumInfo = async () => {
      const response = await axios.get(`/albums/${albumId}`)
      setAlbumInfo(response.data.album)
      setFormState(response.data.album)
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
          <button className="createAlbumButton">Add Grid</button>
        </div>
      ) : (
        <p>No Album Info.</p>
      )}
    </div>
  )
}

export default ModifyAlbum
