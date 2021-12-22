export const addToBasketReducer = (state = { basketItems: [] }, action) => {
      switch (action.type) {
            case 'ADD_TO_BASKET':
                  const alreadyAdded = state.basketItems.find(item => item._id === action.payload._id)

                  if (alreadyAdded) {
                        return {
                              ...state,
                              basketItems: state.basketItems.map(item => item._id === action.payload._id ? action.payload : item)
                        }
                  } else {
                        return {
                              ...state,
                              basketItems: [...state.basketItems, action.payload]
                        }
                  }

            case 'REMOVE_FROM_BASKET':
                  return {
                        basketItems: [...state.basketItems.filter(item => item._id !== action.payload._id)]
                  }
            case 'EMPTY_BASKET':
                  return {
                        ...state,
                        basketItems: []
                  }
            default:
                  return state
      }
}
