import React from 'react'

interface Props {
	params: { id: number, photoId: number }
}

export default function PhotoDetailPage({params: { id, photoId }} : Props) {
  return (
	<div>PhotoDetailPage {id} {photoId}</div>
  )
}
