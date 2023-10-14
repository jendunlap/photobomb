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

  const handleSubmit = async (event) => {
    event.preventDefault()
    console.log(formState)
    await axios.post('//albums/${albumId}/grids', formState)
  }

  return <div>Grid</div>
}

export default Grid
