// actions.js
export const addToCart = (item) => {
  return {
    type: 'ADD_TO_CART',
    payload: item,
  };
};


export const removeFromCart = (item) => {
  return {
    type: 'REMOVE_FROM_CART',
    payload: item,
  };
};

export const decreaseCartItem = (item) => {
  return {
    type: 'DECREASE_CART_ITEM',
    payload: item,
  };
};

export const clearCart = () => {
  return {
    type: 'CLEAR_CART',
  };
};
export const AddProductdata =()=>{
  return {
    type: 'PRODUCT_DATA',

  }
}
export const Increasequantity =(item)=>{
  return {
    type: 'INCREASE_QUANTITY',
    payload:item,
  };
};
export const AddselectedShop =(item)=>{
 
  return {
    type: 'ADD_SELECTED_SHOP',
    payload:item,
  }
}

export const RemoveselectedShop =()=>{
  return {
    type: 'REMOVE_SELECTED_SHOP'
  }
}


// reducers.js
const initialState = {
  cartItems: [],
  ProductData:[],
  selectedshop:[],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      // Check if the product is already in the cart
      const existingItemIndex = state.cartItems.findIndex(item => item.id === action.payload.id);

      if (existingItemIndex !== -1) {
        // If it exists, update the quantity
        const updatedCartItems = [...state.cartItems];
        updatedCartItems[existingItemIndex].quantity += action.payload.quantity;

        return {
          ...state,
          cartItems: updatedCartItems,
        };
      } else {
        // If it doesn't exist, add a new item
        return {
          ...state,
          cartItems: [...state.cartItems, action.payload],
        };
      }

      case 'INCREASE_QUANTITY':
       
        // Increase the quantity for a specific product in the cart
        const increasedItems = state.cartItems.map((item) => {
          if (item.name === action.payload.name) {
          
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        });
  
        return {
          ...state,
          cartItems: increasedItems,
        };



    case 'REMOVE_FROM_CART':
      const itemToRemove = action.payload;
      const updatedCartItems = state.cartItems.filter(item => item.name !== itemToRemove.name);

      return {
        ...state,
        cartItems: updatedCartItems,
      };

    case 'DECREASE_CART_ITEM':
      const itemToDecrease = action.payload;
      const updatedCartItemsDecrease = [...state.cartItems];
      const indexToDecrease = updatedCartItemsDecrease.findIndex(item => item.name === itemToDecrease.name);

      if (indexToDecrease !== -1 && updatedCartItemsDecrease[indexToDecrease].quantity > 1) {
        updatedCartItemsDecrease[indexToDecrease].quantity -= 1;
      }

      return {
        ...state,
        cartItems: updatedCartItemsDecrease,
      };

      case 'ADD_SELECTED_SHOP':
      return {
        ...state,
        selectedshop: action.payload,
      };
      case 'REMOVE_SELECTED_SHOP':
        return {
          ...state,
          selectedShop: [],
        };

    case 'CLEAR_CART':
      // Clear the entire cart
      return {
        ...state,
        cartItems: [],
      };
      case 'PRODUCT_DATA':
        // Store product data from the database
        return {
          ...state,
          ProductData: action.payload,
        };
    default:
      return state;
  }
};

export default cartReducer;
