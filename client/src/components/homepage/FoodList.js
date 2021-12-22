import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addToBasketAction } from '../reduxfiles/actions/basketActions'

export default function FoodList({ food, i }) {
     const [qty, setqty] = useState('1')
     const dispatch = useDispatch()

     function addToBasket() {
          dispatch(addToBasketAction(food, qty))
          setqty('1')
     }

     return (
          <tr>
               <td>{i + 1}</td>
               <td>{food.name}</td>
               <td>{
                    food.category === 'other' ? 'بدون دسته بندی' :
                         food.category === 'withrice' ? 'چلو' :
                              food.category === 'withoutrice' ? 'خوراک' :
                                   food.category === 'drink' ? 'نوشیدنی' : 'پیش غذا'
               }</td>
               <td>{food.price}</td>
               <td>{
                    <select value={qty} onChange={(e) => setqty(e.target.value)}>
                         {
                              [...Array(10).keys()].map((item, i) => <option key={i}>{i + 1}</option>)
                         }
                    </select>
               }</td>
               <td>{food.price * qty}</td>
               <td>
                    <button className='edit-btn' onClick={addToBasket}>افزودن</button>
               </td>
          </tr>
     )
}
