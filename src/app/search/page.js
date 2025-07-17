import React from 'react'
import SongsList from '../_components/songsList'

export default function page() {
  const url = process.env.NEXT_PUBLIC_GLOBAL_API_URL;
  return (
    <SongsList apiUrl={url}/>
  )
}
