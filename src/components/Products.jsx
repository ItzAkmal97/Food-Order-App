import { useContext } from 'react'
import { currencyFormatter } from '../util/formatting';
import CartContext from '../store/CartContext';
import Button from './Button';
import useHttp from '../hooks/useHttp';

const requestConfig = {}
export default function Products() {
    const cartCtx = useContext(CartContext)
    
    const {data: loadedMeals, isLoading, error} =  useHttp('http://localhost:3000/meals', requestConfig, [])

function handleAddItem(mealId) {
    cartCtx.addItem(mealId)
}

    if(isLoading){
        return <p className="center">Loading...</p>
    }

    if(error){
        return <Error title="Could'nt load data" message={error} />;
    }


  return (

        <ul id="meals">    
            {loadedMeals.map((meal) => {
               return <li className="meal-item" key={meal.id}>
                <article>
                <img src={`http://localhost:3000/${meal.image}`} alt={meal.name} />
                <div>
                    <h3>{meal.name}</h3>
                    <p className='meal-item-price'>
                        {currencyFormatter.format(meal.price)}
                    </p>
                    <p className='meal-item-description'>{meal.description}</p>
                </div> 
               <p className='meal-item-actions'>
                <Button onClick={() => handleAddItem(meal)}>Add to Cart</Button>
                </p>
               </article>
               </li>
            })}
        </ul>
  )
}