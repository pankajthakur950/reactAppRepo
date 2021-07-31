import * as React from 'react'

function Gallery({ image, title }) {
  return (
    <figure className="figure">
      <img className="img-responsive" src={`/images/${image}`} alt={title} />
      <figcaption className="figure-caption text-center text-small">{title}</figcaption>
    </figure>
  )
}

export default Gallery