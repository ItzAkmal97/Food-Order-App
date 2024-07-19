import { createContext, useReducer } from "react";

const CartContext = createContext({
    items: [],
    totalAmount: 0,
    addItem: (item) => {},
    removeItem: (id) => {},
    clearCart: () => {},
});

function cartReducer(state, action) {
    if (action.type === "ADD_ITEM") {
        const existingCartItemIndex = state.items.findIndex(
            (item) => item.id === action.item.id
        );

        const updatedItems = [...state.items];
        if(existingCartItemIndex > -1) {
            const existingItem = state.items[existingCartItemIndex]
            const updatedItem = {
                ...existingItem,
                quantity: existingItem.quantity + 1
            }
            updatedItems[existingCartItemIndex] = updatedItem
        } else {
            updatedItems.push({...action.item, quantity: 1});
        }

        return {
            ...state,
            items: updatedItems
        }
    }

    if(action.type === "REMOVE_ITEM") {
        const existingCartItemIndex = state.items.findIndex(
            (item) => item.id === action.id
        );
        const existingItem = state.items[existingCartItemIndex];
        const updatedTotalAmount = state.totalAmount - existingItem.price;
        let updatedItems;
        if(existingItem.quantity === 1) {
            updatedItems = state.items.filter(item => item.id !== action.id);
        } else {
            const updatedItem = {...existingItem, quantity: existingItem.quantity - 1};
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        }
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
    }

    if(action.type === "CLEAR_CART") {
        const updatedItems = [];
        return {
            items: updatedItems
        }
    }
    return state;
}

export function CartContextProvider({children}) {
    const [cart, dispatchCartAction] = useReducer(cartReducer, {items: [], totalAmount: 0});

    function addItem(item) {
        dispatchCartAction({type: "ADD_ITEM", item: item})
    }

    function removeItem(id) {
        dispatchCartAction({type: "REMOVE_ITEM", id: id})
    }

    function clearCart() {
        dispatchCartAction({type: "CLEAR_CART"})
    }

    const cartContext = {
        items: cart.items,
        totalAmount: cart.totalAmount,
        addItem,
        removeItem,
        clearCart,
    }
    
    console.log(cartContext);
    
    return (
        <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
    );
    
}

export default CartContext;