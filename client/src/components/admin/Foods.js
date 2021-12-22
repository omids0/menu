import React, { useEffect } from 'react'
import NavbarAdmin from './NavbarAdmin'
import Table from 'react-bootstrap/Table'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getAllFoodsAction, removeFoodAction } from '../reduxfiles/actions/foodAction'
import { useSelector } from 'react-redux'
import Loading from '../Loading'
import SomeThingWentWrong from '../SomeThingWentWrong'

export default function Foods() {
    const dispatch = useDispatch()
    const allfoodsstate = useSelector(state => state.getAllFoodsReducer)
    const { loading, error, foods } = allfoodsstate

    const removedFoodState = useSelector(state => state.removeFoodReducer)
    const { loadingRemove, failed } = removedFoodState

    useEffect(() => {
        dispatch(getAllFoodsAction())
    }, [])

    function removeFood(id) {
        dispatch(removeFoodAction(id))
    }

    function editFood(id) {
        window.location.href = `/admin/foods/edit/${id}`
    }
    return (
        <div className="page-container">
            <NavbarAdmin />
            <h4 className="users-header">صفحه مدیریت/غذاها:</h4>
            <Link className="add-new-food-link" to='/admin/foods/addtomenu'>
                <button className="mb-4 add-new-food"><i class="bi h1 bi-plus plus-icon"></i> افزودن به منو</button>
            </Link>
            <div className="table-with">
                {loadingRemove && <Loading />}
                {failed && <SomeThingWentWrong />}
                {
                    loading ? <Loading /> : error ? <SomeThingWentWrong /> : (
                        <Table striped bordered hover responsive>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>نام</th>
                                    <th>دسته بندی</th>
                                    <th>قیمت</th>
                                    <th>توضیحات</th>
                                    <th>بررسی</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    foods.map((food, i) => (
                                        <tr>
                                            <td>{i + 1}</td>
                                            <td>{food.name}</td>
                                            <td>{
                                                food.category === 'withrice' ?
                                                    'چلو' : food.category === 'withoutrice' ?
                                                        'خوراک' : food.category === 'appetizer' ?
                                                            'پیش غذا' : 'نوشیدنی'
                                            }</td>
                                            <td>{food.price}</td>
                                            <td>{food.description}</td>
                                            <td>
                                                <button className='edit-btn' onClick={() => editFood(food._id)}>ویرایش</button>
                                                <button className='delete-btn' onClick={() => removeFood(food._id)}>حذف</button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </Table>
                    )
                }
            </div>
        </div>
    )
}
