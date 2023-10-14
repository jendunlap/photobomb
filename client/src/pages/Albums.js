import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Album from '../components/Album'

const Albums = () => {
  const [albums, setAlbums] = useState([])

  let navigate = useNavigate()
  let { albumId } = useParams()

  const getAlbums = async () => {
    const response = await axios.get(`/albums`)
    setAlbums(response.data.albums)
    console.log(response.data.albums)
  }

  const viewAlbum = (id) => {
    navigate(`/albums/${id}`)
  }

  // useEffect(() => {
  //   getAlbums()
  // }, [albumId])

  //don't use effect until there actually are albums, duh

  const createAlbumButton = ({ createNewAlbum }) => {
    const handleCreateAlbum = async (event) => {
      event.preventDefault()
      try {
        const response = await axios.post('/albums')
        let newAlbumID = response.data.id
        navigate(`/edit/${newAlbumID}`)
      } catch (error) {
        console.error('Could not create new album', error)
      }
    }
  }

  return (
    <div>
      <div>
        <button onClick={handleCreateAlbum}>Create New Album!</button>
      </div>
      <div className="albumsGrid">
        {albums
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((album) => (
            <Album
              id={album._id}
              key={album._id}
              image={album.image}
              name={album.name}
              onClick={viewAlbum}
            />
          ))}
      </div>
    </div>
  )
}

export default Albums
