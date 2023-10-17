const Grid = (props) => {
  return (
    <div className="gridDiv">
      {/* <div className="imgageWrapper">
        <img className="albumImage" src={props.image} alt={props.name}></img>
      </div> */}
      <div className="infoWrapper">
        <h1 className="gridName">{props.image1}</h1>
      </div>
    </div>
  )
}

export default Grid
