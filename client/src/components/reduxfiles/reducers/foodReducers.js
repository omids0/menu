export const addFoodToMenuReducer = (state = {}, action) => {
    switch (action.type) {
        case 'ADD_FOOD_TO_MENU_REQUEST':
            return {
                loading: true,
                ...state
            }
        case 'ADD_FOOD_TO_MENU_SUCCESS':
            return {
                loading: false,
                success: true,
            }
        case 'ADD_FOOD_TO_MENU_FAILED':
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}

export const getAllFoodsReducer = (state = { foods: [] }, action) => {
    switch (action.type) {
        case 'GET_ALL_FOODS_REQUEST':
            return {
                ...state,
                loading: true,
            }
        case 'GET_ALL_FOODS_SUCCESS':
            return {
                foods: action.payload,
                loading: false,
            }
        case 'GET_ALL_FOODS_FAILED':
            return {
                error: action.payload,
                loading: false,
            }
        default:
            return state
    }
}

export const removeFoodReducer = (state = {}, action) => {
    switch (action.type) {
        case 'DELETE_FOOD_REQUEST':
            return {
                loadingRemove: true,
                ...state
            }
        case 'DELETE_FOOD_SUCCESS':
            return {
                loadingRemove: false,
            }
        case 'DELETE_FOOD_FAILED':
            return {
                loadingRemove: false,
                error: action.payload,
                failed: true
            }
        default:
            return state
    }
}

export const editFoodReducer = (state = {}, action) => {
    switch (action.type) {
        case 'EDIT_FOOD_REQUEST':
            return {
                ...state,
                loadingEdit: true,
            }
        case 'EDIT_FOOD_SUCCESS':
            return {
                loadingEdit: false,
            }
        case 'EDIT_FOOD_FAILED':
            return {
                loadingEdit: false,
                error: action.payload,
            }
        default:
            return state
    }
}