export const addNewOrderReducer = (state = {}, action) => {
      switch (action.type) {
            case 'ADD_NEW_ORDER_REQUEST':
                  return {
                        ...state,
                        orderLoading: true,
                  }
            case 'ADD_NEW_ORDER_SUCCESS':
                  return {
                        orderLoading: false,
                        success: true,
                  }
            case 'ADD_NEW_ORDER_FAILED':
                  return {
                        orderLoading: false,
                        error: action.payload
                  }
            default:
                  return state
      }
}

export const userOrdersReducer = (state = {}, action) => {
      switch (action.type) {
            case 'USER_ORDERS_REQUEST':
                  return {
                        ...state,
                        loading: true
                  }
            case 'USER_ORDERS_SUCCESS':
                  return {
                        loading: false,
                        userorder: action.payload
                  }
            case 'USER_ORDERS_FAILED':
                  return {
                        loading: false,
                        error: action.payload
                  }
            default:
                  return state
      }
}

export const editOrderReducer = (state = {}, action) => {
      switch (action.type) {
            case 'EDIT_ORDER_REQUEST':
                  return {
                        ...state,
                        loadingEdit: true,
                  }
            case 'EDIT_ORDER_SUCCESS':
                  return {
                        loadingEdit: false,
                        success: true,
                  }
            case 'EDIT_ORDER_FAILED':
                  return {
                        loadingEdit: false,
                        error: action.payload
                  }
            default:
                  return state
      }
}

export const sentOrderReducer = (state = {}, action) => {
      switch (action.type) {
            case 'SENT_ORDER_REQUEST':
                  return {
                        ...state,
                        loadingEdit: true,
                  }
            case 'SENT_ORDER_SUCCESS':
                  return {
                        loadingEdit: false,
                        success: true,
                  }
            case 'SENT_ORDER_FAILED':
                  return {
                        loadingEdit: false,
                        error: action.payload
                  }
            default:
                  return state
      }
}

export const findOrderReducer = (state = {}, action) => {
      switch (action.type) {
            case 'FIND_ORDER_REQUEST':
                  return {
                        ...state,
                        orderloading: true,
                  }
            case 'FIND_ORDER_SUCCESS':
                  return {
                        orderloading: false,
                        orderfound: action.payload
                  }
            case 'SENT_ORDER_FAILED':
                  return {
                        orderloading: false,
                        ordererror: action.payload
                  }
            default:
                  return state
      }
}

export const getAllSendingOrdersReducer = (state = {}, action) => {
      switch (action.type) {
            case 'GET_ALL_SENDING_REQUEST':
                  return {
                        ...state,
                        loading: true
                  }
            case 'GET_ALL_SENDING_SUCCESS':
                  return {
                        loading: false,
                        sendingOrders: action.payload
                  }
            case 'GET_ALL_SENDING_FAILED':
                  return {
                        loading: false,
                        error: action.payload
                  }
            default:
                  return state
      }
}

export const getAllOrdersReducer = (state = {}, action) => {
      switch (action.type) {
            case 'GET_ALL_ORDERS_REQUEST':
                  return {
                        ...state,
                        loading: true
                  }
            case 'GET_ALL_ORDERS_SUCCESS':
                  return {
                        loading: false,
                        allOrders: action.payload
                  }
            case 'GET_ALL_ORDERS_FAILED':
                  return {
                        loading: false,
                        error: action.payload
                  }
            default:
                  return state
      }
}