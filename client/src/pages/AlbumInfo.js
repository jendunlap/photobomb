import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Component from '../components/Component'

const AlbumInfo = () => {
  let { albumId } = useParams()
  let navigate = useNavigate()

  const [albumInfo, setAlbumInfo] = useState(null)
  const [albumComponents, setAlbumComponents] = useState([])

  const getAlbumInfo = async () => {
    try {
      const [albumResponse, componentsResponse] = await Promise.all([
        axios.get(`/albums/${albumId}`),
        axios.get(`/albums/${albumId}/components`)
      ])

      setAlbumInfo(albumResponse.data.album)
      setAlbumComponents(componentsResponse.data.components)
    } catch (error) {
      console.error('Error fetching album information and components:', error)
    }
  }

  useEffect(() => {
    console.log(albumComponents)
  }, [albumComponents])

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
            <div>
              {albumComponents.map((component) =>
                component &&
                component._id &&
                component.type &&
                component.data ? (
                  <Component
                    key={component._id}
                    type={component.type}
                    data={component.data}
                  />
                ) : null
              )}
            </div>
          </div>
        </div>
      ) : (
        <p>No Album Info.</p>
      )}
    </div>
  )
}

export default AlbumInfo
