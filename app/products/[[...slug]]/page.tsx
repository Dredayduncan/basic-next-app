import React from 'react'

interface Props {
	params: { slug: string[] };
	searchParams: { sortOrder: string }
}

export default function ProductsPage( {params : { slug }, searchParams : { sortOrder }} : Props) {
  return (
	<div>ProductsPage {slug} {sortOrder}</div>
  )
}
