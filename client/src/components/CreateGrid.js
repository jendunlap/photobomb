import { useEffect, useState } from 'react'
import { useNavigate, Link, useParams } from 'react-router-dom'
import axios from 'axios'

const CreateGrid = () => {
  let navigate = useNavigate()
  const { albumId } = useParams()

  const initialState = {
    image1: '',
    image2: '',
    image3: '',
    image4: ''
  }

  const [formState, setFormState] = useState(initialState)

  const handleChange = (event) => {
    setFormState({ ...formState, [event.target.id]: event.target.value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    console.log(formState)
    await axios.post(`/albums/${albumId}/grids`, formState)
    navigate(`/edit/${albumId}`)
  }

  return (
    <div className="gridDiv">
      <form className="gridForm">
        <label htmlFor="image1">
          <input
            onChange={handleChange}
            type="text"
            id="image1"
            value={formState.image1}
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
