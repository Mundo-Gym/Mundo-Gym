import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import 'material-icons/iconfont/material-icons.css'
import { getProductByName } from '../../redux/actions/actionProduct';
import SearchIcon from '@mui/icons-material/Search';


export default function SearchBar() {
  const dispatch = useDispatch();
  const [name,setName] = useState('')

  const handlerSearch= (e)=>{
    setName(e.target.value)
  }

  const handlerSubmit=(e)=>{
    e.preventDefault()
    dispatch(getProductByName(name))
    setName("")
    //e.target.reset()
  }

  return (
    <form onSubmit={handlerSubmit} className='min-w-[250px] max-w-[350px]'>
      <input id='search' onChange={handlerSearch} name='name' type="search" placeholder='Buscar productos...' className='outline-none p-2 rounded-l-lg shadow-md'/>
      <button type='submit' className='p-2 rounded-r-lg font-bold active:text-[rgba(28,41,71,1)] active:bg-[#fff] bg-[rgba(28,41,71,1)] text-[#fff] shadow-md'><SearchIcon/></button>
    </form>
  )
}
