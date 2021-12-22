export const addNewCustomerReducer = (state = {}, action) => {
      switch (action.type) {
            case 'ADD_NEW_CUSTOMER_REQUEST':
                  return {
                        ...state,
                        loading: true,
                  }
            case 'ADD_NEW_CUSTOMER_SUCCESS':
                  return {
                        loading: false,
                        success: true,
                  }
            case 'ADD_NEW_CUSTOMER_FAILED':
                  return {
                        loading: false,
                        error: action.payload,
                  }
            default:
                  return state
      }
}

export const findCustomerByIdReducer = (state = {}, action) => {
      switch (action.type) {
            case 'FIND_CUSTOMER_BY_ID_REQUEST':
                  return {
                        loading: true,
                        ...state,
                  }
            case 'FIND_CUSTOMER_BY_ID_SUCCESS':
                  return {
                        loading: false,
                        searchedCustomer: action.payload
                  }
            case 'FIND_CUSTOMER_BY_ID_FAILED':
                  return {
                        loading: false,
                        error: action.payload
                  }
            default:
                  return state
      }
}

export const getAllCustomersReducer = (state = {}, action) => {
      switch (action.type) {
            case 'GET_ALL_CUSTOMERS_REQUEST':
                  return {
                        ...state,
                        loadingcustomers: true,
                  }
            case 'GET_ALL_CUSTOMERS_SUCCESS':
                  return {
                        loadingcustomers: false,
                        allcustomers: action.payload
                  }
            case 'GET_ALL_CUSTOMERS_FAILED':
                  return {
                        loadingcustomers: false,
                        errorLoadingCustomers: action.payload
                  }
            default:
                  return state
      }
}

export const removeCustomerReducer = (state = {}, action) => {
      switch (action.type) {
            case 'REMOVE_CUSTOMER_REQUEST':
                  return {
                        ...state,
                        loading: true,
                  }
            case 'REMOVE_CUSTOMER_SUCCESS':
                  return {
                        loading: false,
                        success: true,
                  }
            case 'REMOVE_CUSTOMER_FAILED':
                  return {
                        loading: false,
                        error: action.payload,
                  }
            default:
                  return state
      }
}

export const editCustomerReducer = (state = {}, action) => {
      switch (action.type) {
            case 'EDIT_CUSTOMER_REQUEST':
                  return {
                        ...state,
                        loading: true,
                  }
            case 'EDIT_CUSTOMER_SUCCESS':
                  return {
                        loading: false,
                        success: true,
                  }
            case 'EDIT_CUSTOMER_FAILED':
                  return {
                        loading: false,
                        error: action.payload,
                  }
            default:
                  return state
      }
}