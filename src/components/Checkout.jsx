import React from 'react'
import Button from './Button'
import Modal from './Modal'
import Error from './Error'
import CartContext from '../store/CartContext'
import { currencyFormatter } from '../util/formatting'
import userProgressContext from '../store/userProgressContext'
import Input from './Input'
import { useContext } from 'react'
import useHttp from '../hooks/useHttp'

const requestConfig = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    }
}

export default function Checkout() {
    const userProgressCtx = useContext(userProgressContext)
    const cartCtx = useContext(CartContext)
    const cartTotal = cartCtx.items.reduce((total, item) => total + item.quantity * item.price, 0);
    const {data, isLoading: isSending, error, sendRequest, clearData} = useHttp('http://localhost:3000/orders', requestConfig)


    function handleFinish() {
        userProgressCtx.hideCheckout();
        cartCtx.clearCart();
        clearData();
    }

    function handleCloseCheckout() {
        userProgressCtx.hideCheckout()
    }

    function handleSubmit(event) {
        event.preventDefault();
        const fd = new FormData(event.target);
        const customerData = Object.fromEntries(fd.entries());
  
        sendRequest(JSON.stringify({
            order: {
                items: cartCtx.items,
                customer: customerData
            }
        })) 
    }

    let actions = (
        <>
        <Button type='button' textOnly onClick={handleCloseCheckout}>Cancel</Button>
        <Button>Submit Order</Button>
        </>
    )

    if(isSending) {
        actions = <span>Sending order data...</span>
    } 

    if(data && !error) {
        return (
            <Modal open={userProgressCtx.progress === 'checkout'} onClose={handleCloseCheckout}>
            <h2>Order Sent Successfully</h2>
            <p className='modal-actions'>
                <Button onClick={handleFinish}>Close</Button>
            </p>
        </Modal>
        )
    }

  return (
    <Modal open={userProgressCtx.progress === 'checkout'} onClose={handleCloseCheckout}>
    <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p className='cart-total'>Total Price: {currencyFormatter.format(cartTotal)}</p>
        <Input label='Full Name: ' type='text' id="name" required />
        <Input label='Email: ' type='email' id="email" required />
        <Input label='Address: ' id="street" required />
        <div className='control-row'>
            <Input label='City' id="city" required />
            <Input label='Zip Code' id="postal-code" required />
        </div>
        {error && <Error title="Failed to send order" message="Try again later"/>}
        <p className='modal-actions'>
        {actions}
        </p>
    </form>
    </Modal>
  )
}
