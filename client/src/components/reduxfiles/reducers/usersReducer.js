export const addUserReducer = (state = {}, action) => {
      switch (action.type) {
            case 'ADD_USER_REQUEST':
                  return {
                        ...state,
                        loading: true,
                  }
            case 'ADD_USER_SUCCESS':
                  return {
                        loading: false,
                  }
            case 'ADD_USER_FAILED':
                  return {
                        loading: false,
                        error: action.payload,
                  }
            default:
                  return state
      }
}

export const getAllUsersReducer = (state = { users: [] }, action) => {
      switch (action.type) {
            case 'GET_ALL_USERS_REQUEST':
                  return {
                        ...state,
                        loading: true,
                  }
            case 'GET_ALL_USERS_SUCCESS':
                  return {
                        loading: false,
                        users: action.payload
                  }
            case 'GET_ALL_USERS_FAILED':
                  return {
                        loading: false,
                        error: action.payload
                  }
            default:
                  return state
      }
}

export const editUserReducer = (state = { currentuser: [] }, action) => {
      switch (action.type) {
            case 'EDIT_USER_REQUEST':
                  return {
                        loading: true,
                  }
            case 'EDIT_USER_SUCCESS':
                  return {
                        loading: false,
                        currentuser: action.payload
                  }
            case 'EDIT_USER_FAILED':
                  return {
                        loading: false,
                        error: action.payload
                  }
            default:
                  return state
      }
}

export const updateUserReducer = (state = {}, action) => {
      switch (action.type) {
            case 'UPDATE_USER_INFO_REQUEST':
                  return {
                        ...state,
                        loadingUpdate: true,
                  }
            case 'UPDATE_USER_INFO_SUCCESS':
                  return {
                        loadingUpdate: false,
                  }
            case 'UPDATE_USER_INFO_FAILED':
                  return {
                        loadingUpdate: false,
                        error: action.payload
                  }
            default:
                  return state
      }
}

export const deleteUserReducer = (state = {}, action) => {
      switch (action.type) {
            case 'DELETE_USER_REQUEST':
                  return {
                        ...state,
                  }
            case 'DELETE_USER_SUCCESS':
                  return {
                        success: true,
                  }
            case 'DELETE_USER_FAILED':
                  return {
                        error: action.payload
                  }
            default:
                  return state
      }
}

export const loginUserReducer = (state = { }, action) => {
      switch (action.type) {
            case 'LOGIN_USER_REQUEST':
                  return {
                        ...state,
                        loading: true,
                  }
            case 'LOGIN_USER_SUCCESS':
                  return {
                        userLoged: action.payload,
                        loading: false,
                  }
            case 'LOGIN_USER_FAILED':
                  return {
                        error: action.payload,
                        loading: false,
                  }
            default:
                  return state
      }
}