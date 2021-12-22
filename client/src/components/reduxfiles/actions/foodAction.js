import axios from "axios"

export const addFoodToMenuAction = (food) => async dispatch => {
    dispatch({type: 'ADD_FOOD_TO_MENU_REQUEST'})
    try {
        const response = await axios.post('/api/foods/addfoodtomenu', {food})
        dispatch({type: 'ADD_FOOD_TO_MENU_SUCCESS'})
        window.location.href = '/admin/foods'
    } catch (error) {
        dispatch({type: 'ADD_FOOD_TO_MENU_FAILED', payload: error.message})
    }
}

export const getAllFoodsAction = () => async dispatch => {
    dispatch({type: 'GET_ALL_FOODS_REQUEST'})
    try {
        const response = await axios.get('/api/foods/getallfoods')
        dispatch({type: 'GET_ALL_FOODS_SUCCESS', payload: response.data})
    } catch (error) {
        dispatch({type: 'GET_ALL_FOODS_FAILED', payload: error.message})
    }
}

export const removeFoodAction = (id) => async dispatch => {
    dispatch({type: 'DELETE_FOOD_REQUEST'})
    try {
        const response = await axios.post('/api/foods/removefood', {id})
        dispatch({type: 'DELETE_FOOD_SUCCESS'})
        window.location.reload()
    } catch (error) {
        dispatch({type: 'DELETE_FOOD_FAILED', payload: error.message})
    }
}

export const editFoodAction = (food) => async dispatch => {
    dispatch({type: 'EDIT_FOOD_REQUEST'})
    try {
        const response = await axios.post('/api/foods/editfood',{food})
        dispatch({type: 'EDIT_FOOD_SUCCESS'})
        window.location.href = '/admin/foods/'
    } catch (error) {
        dispatch({type: 'EDIT_FOOD_FAILED', payload: error.message})
    }
}