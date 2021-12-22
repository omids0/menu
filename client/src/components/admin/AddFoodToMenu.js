import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addFoodToMenuAction } from '../reduxfiles/actions/foodAction'
import NavbarAdmin from './NavbarAdmin'

export default function AddFoodToMenu() {
    const [name, setname] = useState('')
    const [category, setcategory] = useState('other')
    const [price, setprice] = useState('')
    const [description, setdescription] = useState('')
    const dispatch = useDispatch()

    function saveToMenu(e) {
        const food = {
            name,
            category,
            price,
            description
        }
        e.preventDefault()
        
        if(name && category && price && description){
            dispatch(addFoodToMenuAction(food))
            setname('')
            setcategory('other')
            setprice('')
            setdescription('')
        } else {
            alert('لطفا تمامی فیلدها را پر نمایید.')
        }
    }

    return (
        <div className="page-container">
            <NavbarAdmin />
            <h4 className="users-header">صفحه مدیریت/غذاها/افزودن:</h4>
            <form className='add-food-form'>
                <input type='text' placeholder="نام" className='add-food-form-input' value={name} onChange={(e) => setname(e.target.value)} />
                <select className='add-food-form-input' placeholder='دسته بندی' value={category} onChange={(e) => setcategory(e.target.value)}>
                    <option value="other">بدون دسته بندی</option>
                    <option value='withrice'>چلو</option>
                    <option value='withoutrice'>خوراک</option>
                    <option value='drink'>نوشیدنی</option>
                    <option value='appetizer'>پیش غذا</option>
                </select>
                <input type='number' placeholder="قیمت" className='add-food-form-input' value={price} onChange={(e) => setprice(e.target.value)} />
                <textarea placeholder='توضیحات' className='add-food-form-input' value={description} onChange={(e) => setdescription(e.target.value)}></textarea>
                <button className='add-food-btn' onClick={(e) => saveToMenu(e)}>ذخیره</button>
            </form>
        </div>
    )
}
