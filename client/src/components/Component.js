const Component = (props) => {
  const { type, data } = props

  switch (type) {
    case 'image':
      return (
        <div className="componentDiv">
          <img src={data.image.imageUrl} alt={data.image.altText} />
        </div>
      )
    case 'text':
      return (
        <div className="componentDiv">
          <div className="infoWrapper">
            <h1 className="componentText">{data.text.text}</h1>
          </div>
        </div>
      )
    case 'video':
      // Render video component here
      break
    case 'audio':
      // Render audio component here
      break
    case 'custom':
      // Render custom component here
      break
    default:
      return null // Handle unknown types or return nothing
  }
}

export default Component
