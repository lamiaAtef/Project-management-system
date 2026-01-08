import React from 'react'

export default function Search({value,onChange,placeholder="search.."},SearchInputProps) {

  return (
    <>
      <input type='text' 
        value={value} 
        placeholder={placeholder}
        onChange={(e)=>onchange(e.target.value)}
        className='border px-3 py-2 rounded w-10'
       />
    </>
  )
}
