export const addToBasketAction = (food, qty) => (dispatch, getState) => {
      let basketItem = {
            _id: food._id,
            name: food.name,
            price: food.price,
            qty: Number(qty),
            category: food.category,
            description: food.description,
            fee: food.price * qty
      }
      if (basketItem.qty < 1) {
            dispatch({ type: 'REMOVE_FROM_BASKET', payload: food })
      } else {
            dispatch({ type: 'ADD_TO_BASKET', payload: basketItem })
      }
      const basketItems = getState().addToBasketReducer.basketItems
      localStorage.setItem('basket', JSON.stringify(basketItems))
}

export const removeFromBasketAction = (food) => (dispatch, getState) => {
      dispatch({ type: 'REMOVE_FROM_BASKET', payload: food })
      const basketItems = getState().addToBasketReducer.basketItems
      localStorage.setItem('basket', JSON.stringify(basketItems))
}

export const emptyBasketAction = () => (dispatch, getState) => {
      dispatch({type: 'EMPTY_BASKET'})
      const basketItems = getState().addToBasketReducer.basketItems
      localStorage.setItem('basket', JSON.stringify(basketItems))
}