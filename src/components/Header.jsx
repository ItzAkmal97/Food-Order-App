import React from 'react'
import logoImg from '../assets/logo.jpg'
import Button from './Button'
import {useContext } from 'react'
import CartContext from '../store/CartContext'
import userProgressContext from '../store/userProgressContext'
export default function Header() {

  const cartCtx = useContext(CartContext)
  const userProgressCtx = useContext(userProgressContext)

  const totalCartItems = cartCtx.items.reduce((totalNumberOfItems, item) => {
    return totalNumberOfItems + item.quantity;
  }, 0)

  function handleShowCart(){
    userProgressCtx.showCart()
  }

  return (
    <header id="main-header">
      <div id="title">
      <img id='img' src={logoImg} alt="logo" />
      <h1>Food Order</h1>
      </div>
      <div className="cart">
      <nav>
       <Button onClick={handleShowCart} textOnly={true} >
          Cart ({totalCartItems})
        </Button>    
      </nav> 
    </div>
    </header>
  )
}
