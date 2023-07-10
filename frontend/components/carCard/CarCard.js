import { useEffect, useState } from "react"
import { removeCarProduct,updateQuantity } from "../../redux/features/carStackSlice"
import { useDispatch} from "react-redux"

export default function CarCard(props) {
  const [count,setCount] = useState({
    name:props.name,
    image:props.image,
    price:props.price,
    description:props.description,
    quantity:1,
    currency:'ARS'
  })
  const dispatch = useDispatch()
  const handlerDelete = ()=>{
    dispatch(removeCarProduct(props.id))
  }

  useEffect(()=>{
    dispatch(updateQuantity(count))
  },[count])

  return (
    <div className=' w-[370px] shadow-[1px_1px_20px_rgba(0,0,0,0.2)] rounded-md relative p-[10px] justify-start items-center mb-[5px] flex'>

        <button onClick={()=>handlerDelete()} className=' border-sky-500 absolute right-1 top-1 w-[25px] bg-[#ff0000] text-white text-bold rounded-[1px_5px]'>x</button>
        <img className='w-[70px] rounded-full mr-[20px]' src={props.image} alt={props.name} />

        <div className='text-bold w-full font-bold'>
          <h2>{props.name}</h2>
          <div className="flex justify-between">
            <h3>{props.price}</h3>
            <div className="flex justify-between w-[25%]">
              {count.quantity>1?<button className="w-[20px] shadow-[1px_1px_5px_rgba(0,0,0,0.5)]" onClick={()=>{setCount({...count, quantity:count.quantity - 1})}}>-</button>:null}
              <h3>{count.quantity}</h3>
              <button className="w-[20px] shadow-[1px_1px_5px_rgba(0,0,0,0.5)]" onClick={()=>{setCount({...count, quantity:count.quantity + 1})}}>+</button></div>
              <h3>{count.quantity * props.price}</h3>
            </div>
      </div>
    </div>
  )
}
