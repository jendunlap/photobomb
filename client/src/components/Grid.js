const Grid = (props) => {
  const { content, onEdit } = props
  return (
    <div className="gridDiv">
      <div className="infoWrapper">
        <h1 className="gridName">{content.image1}</h1>
      </div>
      <button onClick={() => onEdit({ name: 'Updated Name' })}>
        Edit Grid
      </button>
    </div>
  )
}

export default Grid
