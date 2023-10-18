import { useState } from 'react'

const ImageComponent = ({ onImageSelect }) => {
  const [imageLink, setImageLink] = useState('')

  const handleImageSelect = () => {
    onImageSelect(imageLink)
  }

  return (
    <div>
      <label>Image Link:</label>
      <input
        type="text"
        value={imageLink}
        onChange={(e) => setImageLink(e.target.value)}
      />
      <button onClick={handleImageSelect}>Select Image</button>
    </div>
  )
}

export default ImageComponent
