import React from 'react'
import CartContext from '../store/CartContext'
import Button from './Button'
import Modal from './Modal'
import CartItem from './CartItem'
import { useContext } from 'react'
import { currencyFormatter } from '../util/formatting'
import userProgressContext from '../store/userProgressContext'

export default function Cart() {
    const cartCtx = useContext(CartContext)
    const cartTotal = cartCtx.items.reduce((total, item) => total + item.quantity * item.price, 0)
    const userProgressCtx = useContext(userProgressContext)

    function handleCloseCart() {
        userProgressCtx.hideCart()
    }

    function handleCheckout() {
        userProgressCtx.showCheckout()
    }
  return (
    <Modal className="cart" open={userProgressCtx.progress === 'cart'} onClose={userProgressCtx.progress === 'cart'? handleCloseCart : null}> 
        <h2>Your Cart</h2>
        <ul>
            {cartCtx.items.map((item) => 
           <CartItem 
           key={item.id} 
           {...item} 
           onIncrease={() => cartCtx.addItem(item)}
           onDecrease={() => cartCtx.removeItem(item.id)}
           />
            )}
        </ul>
        <p className='cart-total'>{currencyFormatter.format(cartTotal)}</p>
        <p className='modal-actions'>   
            <Button textOnly={true} onClick={handleCloseCart}>Close</Button>
            {cartCtx.items.length > 0 && <Button textOnly={false} onClick={handleCheckout}>Go to Checkout</Button>}
            {cartCtx.items.length > 0 && <Button textOnly={true} onClick={cartCtx.clearCart}>Clear Cart</Button>}
        </p>
    </Modal>
  )
}
