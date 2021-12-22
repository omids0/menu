import axios from "axios"

export const addNewOrderAction = (order) => async dispatch => {
      dispatch({type: 'ADD_NEW_ORDER_REQUEST'})
      try {
            const response = await axios.post('/api/orders/addneworder',{order})
            dispatch({type: 'ADD_NEW_ORDER_SUCCESS'})
            window.location.href = '/'
            localStorage.removeItem('basket')
      } catch (error) {
            dispatch({type: 'ADD_NEW_ORDER_FAILED', payload: error.message})
      }
}

export const userOrdersAction = (id) => async dispatch => {
      dispatch({type: 'USER_ORDERS_REQUEST'})
      try {
            const response = await axios.post('/api/orders/getuserorders', {id})
            dispatch({type: 'USER_ORDERS_SUCCESS', payload: response.data})
      } catch (error) {
            dispatch({type: 'USER_ORDERS_FAILED', payload: error.message})
      }
}

export const editOrderAction = (order) => async dispatch => {
      dispatch({type: 'EDIT_ORDER_REQUEST'})
      try {
            const response = await axios.post('/api/orders/editorder', {order})
            dispatch({type: 'EDIT_ORDER_SUCCESS'})
            window.location.href = '/ordersending'
      } catch (error) {
            dispatch({type: 'EDIT_ORDER_FAILED', payload: error.message})
      }
}

export const sentOrderAction = (order) => async dispatch => {
      dispatch({type: 'SENT_ORDER_REQUEST'})
      try {
            const response = await axios.post('/api/orders/sentorder', {order})
            dispatch({type: 'SENT_ORDER_SUCCESS'})
            window.location.reload()
      } catch (error) {
            dispatch({type: 'SENT_ORDER_FAILED', payload: error.message})
      }
}

export const findOrderAction = (id) => async dispatch => {
      dispatch({type: 'FIND_ORDER_REQUEST'})
      try {
            const response = await axios.post('/api/orders/findorder', {id})
            dispatch({type: 'FIND_ORDER_SUCCESS', payload: response.data})
      } catch (error) {
            dispatch({type: 'SENT_ORDER_FAILED', payload: error.message})
      }
}

export const getAllSendingOrdersAction = () => async dispatch => {
      dispatch({type: 'GET_ALL_SENDING_REQUEST'})
      try {
            const response = await axios.get('/api/orders/getallsendingorder')
            dispatch({type: 'GET_ALL_SENDING_SUCCESS', payload: response.data})
      } catch (error) {
            dispatch({type: 'GET_ALL_SENDING_FAILED', payload: error.message})
      }
}

export const getAllOrdersAction = () => async dispatch => {
      dispatch({type: 'GET_ALL_ORDERS_REQUEST'})
      try {
            const response = await axios.get('/api/orders/getallorders')
            dispatch({type: 'GET_ALL_ORDERS_SUCCESS', payload: response.data})
      } catch (error) {
            dispatch({type: 'GET_ALL_ORDERS_FAILED', payload: error.message})
      }
}