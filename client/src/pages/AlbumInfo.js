import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

const AlbumInfo = () => {
  let { albumId } = useParams()
  let navigate = useNavigate()

  const [albumInfo, setAlbumInfo] = useState(null)

  const getAlbumInfo = async () => {
    const response = await axios.get(`/albums/${albumId}`)

    setAlbumInfo(response.data.album)
    console.log(response.data.album)
  }

  const deleteAlbum = async () => {
    await axios.delete(`/albums/${albumId}`)
    navigate(`/albums`)
  }

  const modifyAlbum = async () => {
    try {
      navigate(`/edit/${albumId}`)
    } catch (error) {
      console.error('Error navigating to edit:', error)
    }
  }

  useEffect(() => {
    getAlbumInfo()
  }, [albumId])

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
            <button className="createAlbumButton" onClick={modifyAlbum}>
              Edit Album!
            </button>
          </div>
        </div>
      ) : (
        <p>No Album Info.</p>
      )}
    </div>
  )
}

export default AlbumInfo