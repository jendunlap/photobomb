import React from 'react'

const Album = (props) => {
  return (
    <div className="albumDiv" onClick={() => props.onClick(props.id)}>
      <div className="imgageWrapper">
        <img className="albumImage" src={props.image} alt={props.name}></img>
      </div>
      <div className="infoWrapper">
        <h1 className="albumName">{props.name}</h1>
      </div>
    </div>
  )
}

export default Album
