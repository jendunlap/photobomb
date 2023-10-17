import { useEffect, useState } from 'react'
import { useNavigate, Link, useParams } from 'react-router-dom'
import axios from 'axios'

const CreateGrid = () => {
  let navigate = useNavigate()
  const { albumId } = useParams()

  const initialState = {
    name: '',
    content: {
      image1: '',
      image2: '',
      image3: '',
      image4: ''
    }
  }

  const [formState, setFormState] = useState(initialState)

  const handleChange = (event) => {
    if (event.target.id.startsWith('image')) {
      setFormState({
        ...formState,
        content: {
          ...formState.content,
          [event.target.id]: event.target.value
        }
      })
    } else {
      setFormState({ ...formState, [event.target.id]: event.target.value })
    }
  }
  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const response = await axios.post(`/albums/${albumId}/grids`, {
        type: 'Grid',
        name: formState.name,
        content: formState.content
      })
      console.log(response.data)
      if (response.data.gridId) {
        navigate(`/edit/${albumId}`)
      }
    } catch (error) {
      console.error('Error creating grid', error)
    }
  }

  return (
    <div className="gridDiv">
      <form className="gridForm">
        <label htmlFor="name">
          <input
            onChange={handleChange}
            type="text"
            id="name"
            value={formState.name}
          />
        </label>
      </form>
      <button className="submitButton" type="submit" onClick={handleSubmit}>
        CREATE GRID
      </button>
    </div>
  )
}

export default CreateGrid
