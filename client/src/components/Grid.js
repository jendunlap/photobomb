import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'

const Grid = () => {
  let navigate = useNavigate()

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
    await axios.post('//albums/${albumId}/grids', formState)
  }

  return (
    <div className="gridDiv">
      <form className="gridForm">
        <label htmlFor="image 1">
          <input
            onChange={handleChange}
            type="text"
            id="image 1"
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

export default Grid
