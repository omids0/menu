import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Foodtbody from './homepage/Foodtbody'
import Loading from './Loading'
import { addToBasketAction, emptyBasketAction, removeFromBasketAction } from './reduxfiles/actions/basketActions'
import { addNewCustomerAction, findCustomerByIdAction, getAllCustomersAction } from './reduxfiles/actions/customersAction'
import { getAllFoodsAction } from './reduxfiles/actions/foodAction'
import { addNewOrderAction, editOrderAction, findOrderAction } from './reduxfiles/actions/ordersActions'
import SomeThingWentWrong from './SomeThingWentWrong'

export default function EditOrder({ match }) {

      const dispatch = useDispatch()
      const orderid = match.params.id

      const [service, setservice] = useState('inner')
      const [tableNum, settableNum] = useState('')
      const [tableDesc, settableDesc] = useState('')
      const [newCustomer, setnewCustomer] = useState(false)
      const [oldCustomer, setoldCustomer] = useState(false)
      const [customerId, setcustomerId] = useState('')
      const [customerName, setcustomerName] = useState('')
      const [customerTel, setcustomerTel] = useState('')
      const [customerAddress, setcustomerAddress] = useState('')
      const [orderBasket, setorderBasket] = useState('')
      const [search, setsearch] = useState('')
      const [catg, setcatg] = useState('all')


      const allfoodsstate = useSelector(state => state.getAllFoodsReducer)
      const { foods } = allfoodsstate
      const orderfoundstate = useSelector(state => state.findOrderReducer)
      const { orderloading, ordererror, orderfound } = orderfoundstate
      const basketstate = useSelector(state => state.addToBasketReducer.basketItems)
      const findcustomerstate = useSelector(state => state.findCustomerByIdReducer)
      const { loading, error, searchedCustomer } = findcustomerstate
      const getAllCustomerState = useSelector(state => state.getAllCustomersReducer)
      const { loadingcustomers, errorLoadingCustomers, allcustomers } = getAllCustomerState
      const userloged = useSelector(state => state.loginUserReducer.userLoged)

      const totalBasketPrice = basketstate.reduce((c, x) => c + x.fee, 0)

      function isOldCustomer() {
            dispatch(findCustomerByIdAction(customerId))
      }

      function doesntHaveId() {
            const newCustomerId = allcustomers.length + 3000
            setnewCustomer(!newCustomer);
            setoldCustomer(false);
            setcustomerId(newCustomerId)
      }

      //useEffect
      useEffect(() => {
            if (searchedCustomer) {
                  setcustomerName(searchedCustomer.customerName)
                  setcustomerTel(searchedCustomer.customerTel)
                  setcustomerAddress(searchedCustomer.customerAddress)
            }
      }, [searchedCustomer])

      useEffect(() => {
            dispatch(emptyBasketAction())
            dispatch(findOrderAction(orderid))
            dispatch(getAllCustomersAction())
            dispatch(getAllFoodsAction())
      }, [])

      useEffect(() => {
            if (orderfound) {
                  const orderfoundBasket = orderfound.basketItems.map(item => {
                        const food = {
                              _id: item._id,
                              name: item.name,
                              price: item.price,
                              qty: item.qty,
                              category: item.category,
                              description: item.description,
                              fee: item.price * item.qty
                        }
                        dispatch(addToBasketAction(food, item.qty))
                  })
                  // localStorage.setItem('basket', JSON.stringify(orderfound.basketItems))
                  setorderBasket(orderfound.basketItems)
                  setservice(orderfound.serviceType)
                  settableNum(orderfound.tableNum)
                  settableDesc(orderfound.orderDescriptions)
                  setcustomerId(orderfound.customer[0].customerid)
                  setcustomerName(orderfound.customer[0].customerName)
                  setcustomerTel(orderfound.customer[0].customerTel)
                  setcustomerAddress(orderfound.customer[0].customerAddress)

                  if (orderfound.customer[0].customerid) {
                        setoldCustomer(true)
                  }
            }
      }, [orderfound])

      useEffect(() => {
            if (orderfound) {
                  localStorage.setItem('basket', JSON.stringify(basketstate))
                  setorderBasket(basketstate)
            }
      }, [basketstate])

      function addCustomer() {
            if (
                  customerId &&
                  customerName &&
                  customerTel &&
                  customerAddress) {
                  const customer = {
                        customerId,
                        customerName,
                        customerTel,
                        customerAddress
                  }
                  dispatch(addNewCustomerAction(customer))
                  if (customerId.length > 0) {
                        setcustomerName('')
                        setcustomerTel('')
                        setcustomerAddress('')
                  }
            } else {
                  alert('لطفا تمامی فیلدهای مشترک را پر نمایید.')
            }
      }

      function updateOrder() {
            if (basketstate.length > 0 && userloged) {
                  const order = {
                        _id: orderid,
                        user: userloged._id,
                        customer: {
                              customerid: customerId,
                              customerName: customerName,
                              customerTel: customerTel,
                              customerAddress: customerAddress
                        },
                        totalPrice: totalBasketPrice,
                        basketItems: basketstate,
                        serviceType: service,
                        tableNum: tableNum,
                        orderDescriptions: tableDesc
                  }
                  dispatch(emptyBasketAction())
                  dispatch(editOrderAction(order))
            }
      }

      return (
            <div className="page-container">
                  <h4 className="users-header">ویرایش سفارش</h4>
                  <div className='order-edit-container'>
                        <div className='order-edit-customer'>
                              <div className="basket-seleted-menu">
                                    {orderBasket && orderBasket.map(item => (
                                          <div className="basket-item shadow">
                                                <div className="basket-item-parts">
                                                      <h4>{item.name}</h4>
                                                      <button className="basket-item-delete" onClick={() => dispatch(removeFromBasketAction(item))}>X</button>
                                                </div>
                                                <div className="basket-item-parts">
                                                      <p>{item.price} * {item.qty} = {item.fee}</p>
                                                      <div>
                                                            <button className="basket-item-qty-plus" onClick={() => dispatch(addToBasketAction(item, item.qty + 1))}>+</button>
                                                            {item.qty}
                                                            <button className="basket-item-qty-minus" onClick={() => dispatch(addToBasketAction(item, item.qty - 1))}>-</button>
                                                      </div>
                                                </div>
                                          </div>
                                    ))}
                                    {orderBasket.length <= 0 && <p className="empty-basket">لیست خالی است.</p>}
                              </div>
                              <div>
                                    <div className="basket-service-selection ">
                                          <select className='basket-service-choose shadow' value={service} onChange={(e) => setservice(e.target.value)}>
                                                <option value='inner'>داخل سالن</option>
                                                <option value='out'>بیرون بر(حضوری)</option>
                                                <option value='service'>بیرون بر(سرویس)</option>
                                          </select>
                                    </div>
                                    <div className='basket-customer-details shadow'>
                                          {service === 'inner' && (
                                                <div className='basket-inner'>
                                                      <input className='basket-inner-input' type='text' placeholder='شماره میز' value={tableNum} onChange={(e) => settableNum(e.target.value)} />
                                                      <textarea className='basket-inner-input' placeholder='توضیحات لیست' value={tableDesc} onChange={(e) => settableDesc(e.target.value)}></textarea>
                                                </div>
                                          )}
                                          {
                                                service === 'out' && (
                                                      <div className='basket-out'>
                                                            <textarea className='basket-out-input' placeholder='توضیحات لیست' value={tableDesc} onChange={(e) => settableDesc(e.target.value)}></textarea>
                                                      </div>
                                                )
                                          }
                                          {
                                                service === 'service' && (
                                                      <div>
                                                            <p>آیا اشتراک دارند؟</p>
                                                            <div>
                                                                  <button onClick={() => { setoldCustomer(!oldCustomer); setnewCustomer(false) }} className='edit-btn'>بلی</button>
                                                                  <button onClick={doesntHaveId} className='delete-btn'>خیر</button>
                                                            </div>
                                                            <div className='basket-snap'>
                                                                  {
                                                                        oldCustomer && (
                                                                              <div className='basket-oldcustomer'>
                                                                                    <input className='basket-customer-info-input' type='text' placeholder='شماره اشتراک' value={customerId} onChange={(e) => setcustomerId(e.target.value)} />
                                                                                    <i class="bi bi-search magnet" onClick={isOldCustomer}></i>
                                                                                    {
                                                                                          loading ? <Loading /> : error ? <SomeThingWentWrong /> : (
                                                                                                <div className='basket-oldcustomer-search'>
                                                                                                      <input className='basket-customer-info-input' type='text' placeholder='نام مشترک' value={customerName} onChange={(e) => setcustomerName(e.target.value)} />
                                                                                                      <input className='basket-customer-info-input' type='text' placeholder='شماره تماس مشترک' value={customerTel} onChange={(e) => setcustomerTel(e.target.value)} />
                                                                                                      <textarea className='basket-customer-info-input' placeholder='آدرس مشترک' value={customerAddress} onChange={(e) => setcustomerAddress(e.target.value)}></textarea>
                                                                                                      <textarea className='basket-customer-info-input' placeholder='توضیحات لیست' value={tableDesc} onChange={(e) => settableDesc(e.target.value)}></textarea>
                                                                                                </div>
                                                                                          )
                                                                                    }
                                                                              </div>
                                                                        )
                                                                  }
                                                                  {
                                                                        newCustomer && (
                                                                              <div className='basket-oldcustomer'>
                                                                                    <input className='basket-customer-info-input' type='text' placeholder='شماره اشتراک' value={customerId} />
                                                                                    <input className='basket-customer-info-input' type='text' placeholder='نام مشترک' value={customerName} onChange={(e) => setcustomerName(e.target.value)} />
                                                                                    <input className='basket-customer-info-input' type='text' placeholder='شماره تماس مشترک' value={customerTel} onChange={(e) => setcustomerTel(e.target.value)} />
                                                                                    <textarea className='basket-customer-info-input' placeholder='آدرس مشترک' value={customerAddress} onChange={(e) => setcustomerAddress(e.target.value)}></textarea>
                                                                                    <i class="bi bi-person-plus-fill h2" onClick={addCustomer}></i>
                                                                                    <textarea className='basket-customer-info-input' placeholder='توضیحات لیست' value={tableDesc} onChange={(e) => settableDesc(e.target.value)}></textarea>
                                                                              </div>
                                                                        )
                                                                  }
                                                            </div>
                                                      </div>
                                                )
                                          }
                                    </div>
                                    <div className="basket-cashier shadow">
                                          <div>
                                                <h3>مبلغ قابل پرداخت:</h3>
                                                <p>{totalBasketPrice}تومان</p>
                                          </div>
                                          <button className="basket-save-order-btn" onClick={updateOrder}>ثبت</button>
                                    </div>
                              </div>
                        </div>
                        <div className="order-edit-table">
                              <div className="edit-order-component-navbar shadow">
                                    <div className="filter-parts">
                                          <input type="text" className="search-input" placeholder="جستجو" className="filter-search" value={search} onChange={(e) => setsearch(e.target.value)} />
                                          <select className="filter-catg" value={catg} onChange={(e) => setcatg(e.target.value)}>
                                                <option value="all">همه</option>
                                                <option value="withrice">چلو</option>
                                                <option value="withoutrice">خوراک</option>
                                                <option value="drink">نوشیدنی</option>
                                                <option value="appetizer">پیش غذا</option>
                                          </select>
                                    </div>
                              </div>

                              <div className='shadow'>
                                    {foods && (<Foodtbody foods={foods} search={search} catg={catg} />)}
                              </div>
                        </div>
                  </div>
            </div>
      )
}
