import React from 'react'

interface Props {
	children: React.ReactNode;
}

export default function AdminLayout( {children} : Props ) {
  return (
	<div className='flex'>
		<aside className='bg-slate-500'>Admin Side</aside>
		<div>{children}</div>
	</div>
  )
}
