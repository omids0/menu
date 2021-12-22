import axios from "axios"

export const addUserAction = (user) => async dispatch => {
      dispatch({ type: 'ADD_USER_REQUEST' })
      try {
            const response = await axios.post('/api/users/adduser', { user })
            dispatch({ type: 'ADD_USER_SUCCESS' })
            window.location.href = '/admin/users/'
      } catch (error) {
            dispatch({ type: 'ADD_USER_FAILED', payload: error.message })
      }
}

export const getAllUsersAction = () => async dispatch => {
      dispatch({ type: 'GET_ALL_USERS_REQUEST' })
      try {
            const response = await axios.get('/api/users/getallusers')
            dispatch({ type: 'GET_ALL_USERS_SUCCESS', payload: response.data })
      } catch (error) {
            dispatch({ type: 'GET_ALL_USERS_FAILED', payload: error.message })
      }
}

export const editUserAction = (userId) => async dispatch => {
      dispatch({ type: 'EDIT_USER_REQUEST' })
      try {
            const response = await axios.post('/api/users/edituser', { userId })
            dispatch({ type: 'EDIT_USER_SUCCESS', payload: response.data })
      } catch (error) {
            dispatch({ type: 'EDIT_USER_FAILED', payload: error.message })
      }
}

export const updateUserAction = (user) => async dispatch => {
      dispatch({ type: 'UPDATE_USER_INFO_REQUEST' })
      try {
            const response = await axios.post('/api/users/updateuser', { user })
            dispatch({ type: 'UPDATE_USER_INFO_SUCCESS' })
            window.location.href = '/admin/users/'
      } catch (error) {
            dispatch({ type: 'UPDATE_USER_INFO_FAILED', payload: error.message })
      }
}

export const deleteUserAction = (id) => async dispatch => {
      dispatch({ type: 'DELETE_USER_REQUEST' })
      try {
            const response = await axios.post('/api/users/deleteuser', { id })
            dispatch({ type: 'DELETE_USER_SUCCESS' })
            window.location.href = '/admin/users/'
      } catch (error) {
            dispatch({ type: 'DELETE_USER_FAILED', payload: error.message })
      }
}

export const loginUserAction = (user) => async dispatch => {
      dispatch({ type: 'LOGIN_USER_REQUEST'})
      try {
            const response = await axios.post('/api/users/login', user)
            dispatch({ type: 'LOGIN_USER_SUCCESS', payload: response.data})
            console.log(response.data);
            localStorage.setItem('userlogedin', JSON.stringify(response.data))
            window.location.href = '/'
      } catch (error) {
            dispatch({ type: 'LOGIN_USER_FAILED', payload: error.message })
            console.log(error.message);
      }
}