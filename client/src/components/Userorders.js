import React, { useEffect } from 'react'
import { Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import Loading from './Loading';
import { emptyBasketAction } from './reduxfiles/actions/basketActions';
import { sentOrderAction, userOrdersAction } from './reduxfiles/actions/ordersActions';
import SomeThingWentWrong from './SomeThingWentWrong';

export default function Userorders() {
      const userloged = useSelector(state => state.loginUserReducer.userLoged)

      const userorderstate = useSelector(state => state.userOrdersReducer)
      const { loading, error, userorder } = userorderstate

      const dispatch = useDispatch()

      useEffect(() => {
            dispatch(userOrdersAction(userloged._id))
            dispatch(emptyBasketAction())
      }, [])

      if (!userloged) {
            window.location.href = '/login'
            alert('لطفا لاگین نمایید.')
      }

      function ordersent(id) {
            const order = {
                  _id: id,
                  isDeliverd: true,
            }
            console.log(order);
            dispatch(sentOrderAction(order))
      }

      return (
            <div className="page-container">
                  <h4 className="users-header">سفارشات من</h4>
                  <div className="homepage-menu shadow">
                        {loading && <Loading />}
                        {error && <SomeThingWentWrong />}
                        {userorder &&
                              (
                                    <Table striped bordered hover responsive>
                                          <thead>
                                                <tr>
                                                      <th>#</th>
                                                      <th>نوع سرویس</th>
                                                      <th>شماره میز</th>
                                                      <th>اطلاعات مشترک</th>
                                                      <th>لیست خرید</th>
                                                      <th>قیمت کل</th>
                                                      <th>توضیحات سرویس</th>
                                                      <th>وضعیت تحویل</th>
                                                </tr>
                                          </thead>
                                          <tbody>
                                                {
                                                      userorder.map((order, i) => (
                                                            <tr>
                                                                  <td>{i + 1}</td>
                                                                  <td>{
                                                                        order.serviceType === 'inner' ? 'داخل سالن' :
                                                                              order.serviceType === 'out' ? 'بیرون بر(حضوری)' : 'بیرون بر(سرویس)'
                                                                  }</td>
                                                                  <td>{order.tableNum ? order.tableNum : '-'}</td>
                                                                  <td>{
                                                                        <div>
                                                                              <p>-{order.customer[0].customerName}</p>
                                                                              <p>-{order.customer[0].customerTel}</p>
                                                                              <p>-{order.customer[0].customerAddress}</p>
                                                                        </div>
                                                                  }</td>
                                                                  <td>
                                                                        {
                                                                              order.basketItems.map((item, i) => (
                                                                                    <div>
                                                                                          <h5>{item.name}</h5>
                                                                                          <p>{`${item.qty} * ${item.price} = ${item.fee}`}</p>
                                                                                          <hr />
                                                                                    </div>
                                                                              ))
                                                                        }
                                                                  </td>
                                                                  <td>{order.totalPrice}</td>
                                                                  <td>{order.orderDescriptions}</td>
                                                                  <td>
                                                                        {order.isDeliverd ? <button className='edit-btn' >تحویل داده شد.</button> : <button onClick={() => ordersent(order._id)} className='delete-btn m-3'>در انتظار تحویل...</button>}
                                                                        {!order.isDeliverd && <Link className="m-4" to={`/userorder/edit/${order._id}`}><i class="bi bi-pencil-fill" onClick={() => dispatch(emptyBasketAction())}></i></Link> }
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
