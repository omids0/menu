import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loading from './Loading'
import { addToBasketAction, removeFromBasketAction } from './reduxfiles/actions/basketActions'
import { addNewCustomerAction, findCustomerByIdAction, getAllCustomersAction } from './reduxfiles/actions/customersAction'
import { addNewOrderAction } from './reduxfiles/actions/ordersActions'
import SomeThingWentWrong from './SomeThingWentWrong'

export default function BasketPage() {
    const basketstate = useSelector(state => state.addToBasketReducer.basketItems)

    const findcustomerstate = useSelector(state => state.findCustomerByIdReducer)
    const { loading, error, searchedCustomer } = findcustomerstate

    const getAllCustomerState = useSelector(state => state.getAllCustomersReducer)
    const { loadingcustomers, errorLoadingCustomers, allcustomers } = getAllCustomerState

    const userloged = useSelector(state => state.loginUserReducer.userLoged)

    const dispatch = useDispatch()

    const [service, setservice] = useState('inner')
    const [tableNum, settableNum] = useState('')
    const [tableDesc, settableDesc] = useState('')
    const [newCustomer, setnewCustomer] = useState(false)
    const [oldCustomer, setoldCustomer] = useState(false)
    const [findCustomer, setfindCustomer] = useState(false)

    const [customerId, setcustomerId] = useState('')
    const [customerName, setcustomerName] = useState('')
    const [customerTel, setcustomerTel] = useState('')
    const [customerAddress, setcustomerAddress] = useState('')

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

    useEffect(() => {
        if (searchedCustomer) {
            setcustomerName(searchedCustomer.customerName)
            setcustomerTel(searchedCustomer.customerTel)
            setcustomerAddress(searchedCustomer.customerAddress)
        }
    }, [searchedCustomer])

    useEffect(() => {
        dispatch(getAllCustomersAction())
    }, [])

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
            alert('???????? ?????????? ?????????????? ?????????? ???? ???? ????????????.')
        }
    }

    function addOrder() {
        if(basketstate.length > 0 && userloged) {
            const order = {
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
            console.log(order);
            dispatch(addNewOrderAction(order))
        }  else if (!userloged) {
            alert('???????? ?????????? ????????????.')
        } else if (basketstate.length <= 0) {
            alert('?????? ?????? ???????????? ?????? ?????????? ??????!')
        }
    }

    return (
        <div className="page-container">
            <h3 className="basket-header">???????? ??????????</h3>
            <div className="basket-items">
                <div className="basket-seleted-menu">
                    {basketstate.map(item => (
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
                    {basketstate.length <= 0 && <p className="empty-basket">???????? ???????? ??????.</p>}

                </div>
                <div>
                    <div className="basket-service-selection">
                        <select className='basket-service-choose shadow' value={service} onChange={(e) => setservice(e.target.value)}>
                            <option value='inner'>???????? ????????</option>
                            <option value='out'>?????????? ????(??????????)</option>
                            <option value='service'>?????????? ????(??????????)</option>
                        </select>
                    </div>
                    <div className='basket-customer-details shadow'>
                        {service === 'inner' && (
                            <div className='basket-inner'>
                                <input className='basket-inner-input' type='text' placeholder='?????????? ??????' value={tableNum} onChange={(e) => settableNum(e.target.value)} />
                                <textarea className='basket-inner-input' placeholder='?????????????? ????????' value={tableDesc} onChange={(e) => settableDesc(e.target.value)}></textarea>
                            </div>
                        )}
                        {
                            service === 'out' && (
                                <div className='basket-out'>
                                    <textarea className='basket-out-input' placeholder='?????????????? ????????' value={tableDesc} onChange={(e) => settableDesc(e.target.value)}></textarea>
                                </div>
                            )
                        }
                        {
                            service === 'service' && (
                                <div>
                                    <p>?????? ???????????? ????????????</p>
                                    <div>
                                        <button onClick={() => { setoldCustomer(!oldCustomer); setnewCustomer(false) }} className='edit-btn'>??????</button>
                                        <button onClick={doesntHaveId} className='delete-btn'>??????</button>
                                    </div>
                                    <div className='basket-snap'>
                                        {
                                            oldCustomer && (
                                                <div className='basket-oldcustomer'>
                                                    <input className='basket-customer-info-input' type='text' placeholder='?????????? ????????????' value={customerId} onChange={(e) => setcustomerId(e.target.value)} />
                                                    <i class="bi bi-search magnet" onClick={isOldCustomer}></i>
                                                    {
                                                        loading ? <Loading /> : error ? <SomeThingWentWrong /> : (
                                                            <div className='basket-oldcustomer-search'>
                                                                <input className='basket-customer-info-input' type='text' placeholder='?????? ??????????' value={customerName} onChange={(e) => setcustomerName(e.target.value)} />
                                                                <input className='basket-customer-info-input' type='text' placeholder='?????????? ???????? ??????????' value={customerTel} onChange={(e) => setcustomerTel(e.target.value)} />
                                                                <textarea className='basket-customer-info-input' placeholder='???????? ??????????' value={customerAddress} onChange={(e) => setcustomerAddress(e.target.value)}></textarea>
                                                                <textarea className='basket-customer-info-input' placeholder='?????????????? ????????' value={tableDesc} onChange={(e) => settableDesc(e.target.value)}></textarea>
                                                            </div>
                                                        )
                                                    }
                                                </div>
                                            )
                                        }
                                        {
                                            newCustomer && (
                                                <div className='basket-oldcustomer'>
                                                    <input className='basket-customer-info-input' type='text' placeholder='?????????? ????????????' value={customerId} />
                                                    <input className='basket-customer-info-input' type='text' placeholder='?????? ??????????' value={customerName} onChange={(e) => setcustomerName(e.target.value)} />
                                                    <input className='basket-customer-info-input' type='text' placeholder='?????????? ???????? ??????????' value={customerTel} onChange={(e) => setcustomerTel(e.target.value)} />
                                                    <textarea className='basket-customer-info-input' placeholder='???????? ??????????' value={customerAddress} onChange={(e) => setcustomerAddress(e.target.value)}></textarea>
                                                    <i class="bi bi-person-plus-fill h2" onClick={addCustomer}></i>
                                                    <textarea className='basket-customer-info-input' placeholder='?????????????? ????????' value={tableDesc} onChange={(e) => settableDesc(e.target.value)}></textarea>
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
                            <h3>???????? ???????? ????????????:</h3>
                            <p>{totalBasketPrice}??????????</p>
                        </div>
                        <button className="basket-save-order-btn" onClick={addOrder}>??????</button>
                    </div>

                </div>
            </div>
        </div>
    )
}
