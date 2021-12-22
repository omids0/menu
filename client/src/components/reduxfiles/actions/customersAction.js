import axios from "axios"

export const addNewCustomerAction = (customer) => async dispatch => {
      dispatch({ type: 'ADD_NEW_CUSTOMER_REQUEST' })
      try {
            const response = await axios.post('/api/customers/addnewcustomer', { customer })
            dispatch({ type: 'ADD_NEW_CUSTOMER_SUCCESS' })
      } catch (error) {
            dispatch({ type: 'ADD_NEW_CUSTOMER_FAILED', payload: error.message })
      }
}

export const findCustomerByIdAction = (customerId) => async dispatch => {
      dispatch({ type: 'FIND_CUSTOMER_BY_ID_REQUEST' })
      try {
            const response = await axios.post('/api/customers/findbycustomerid', { customerId })
            dispatch({ type: 'FIND_CUSTOMER_BY_ID_SUCCESS', payload: response.data })
      } catch (error) {
            dispatch({ type: 'FIND_CUSTOMER_BY_ID_FAILED', payload: error.message })
      }
}

export const getAllCustomersAction = () => async dispatch => {
      dispatch({ type: 'GET_ALL_CUSTOMERS_REQUEST' })
      try {
            const response = await axios.get('/api/customers/getallcustomers')
            dispatch({ type: 'GET_ALL_CUSTOMERS_SUCCESS', payload: response.data })
      } catch (error) {
            dispatch({ type: 'GET_ALL_CUSTOMERS_FAILED', payload: error.message })
      }
}

export const removeCustomerAction = (id) => async dispatch => {
      dispatch({ type: 'REMOVE_CUSTOMER_REQUEST' })
      try {
            const response = await axios.post('/api/customers/removecustomer', { id })
            dispatch({ type: 'REMOVE_CUSTOMER_SUCCESS' })
            window.location.href = '/customerspage'
      } catch (error) {
            dispatch({ type: 'REMOVE_CUSTOMER_FAILED', payload: error.message})
      }
}

export const editCustomerAction = (customer) => async dispatch => {
      dispatch({ type: 'EDIT_CUSTOMER_REQUEST'})
      try {
            const response = await axios.post('/api/customers/editcustomer', {customer})
            dispatch({ type: 'EDIT_CUSTOMER_SUCCESS' })
            window.location.href = '/customerspage'
      } catch (error) {
            dispatch({ type: 'EDIT_CUSTOMER_FAILED', payload: error.message})
      }
}