import React, {useState, useEffect} from 'react';
import {Link, Route, Switch} from 'react-router-dom';
import {useRouteMatch} from 'react-router-dom';
import axios from 'axios';
import * as yup from 'yup';
import schema from './formSchema'

const initialFormValues = {
    name: '',
    size: '',
    sauce: '',
    pepperoni: '',
    sausage: '',
    mushroom: '',
    peppers: '',
    instructions: '',
  }
  
  const initialFormErrors = {
    name: '',
    size: '',
    sauce: '',
  }
  
  const initialDisabled = true;
  


export default function Form() {
    const [formValues, setFormValues] = useState(initialFormValues);
    const [formErrors, setFormErrors] = useState(initialFormErrors);
    const [disabled, setDisabled] = useState(initialDisabled);
    const [pizzas, setPizzas] = useState([]);
    
    /* checking disabled for submission*/
    useEffect(()=>{
        schema.isValid(formValues).then(valid=>{
          setDisabled(!valid)
        });
      }, [formValues])


      /*changing values/setting form values on change of input and checking for/updating form errors */
      const onChange = e => {
        const {name, value, checked, type} = e.target;
        const newValue = type === 'checkbox' ? checked : value;
        change(name, newValue);
    }

    const change = (name, value) => {
        if (name==='name' || name==='size'||name==='sauce') {
        validate(name, value);
        }
        setFormValues({
          ...formValues,
          [name]: value
        })
      }

    const validate = (name, value) => {
        console.log(name);
        console.log(value)
      yup.reach(schema, name)
      .validate(value)
      .then(valid=>{
        setFormErrors({
          ...formErrors, [name]: ''
        })
      })
      .catch(err=>{
        setFormErrors({
          ...formErrors, [name]: err.errors[0]
        })
      })
    } 

    /* on submission */
    const onSubmit = e => {
        e.preventDefault();
        submit();
    }

    const submit = () => {
        const newPizza = {
          name: formValues.name.trim(),
          size: formValues.size.trim(),
          sauce: formValues.sauce.trim(),
          toppings: ['pepperoni', 'sausage', 'mushroom', 'peppers'].filter(topping=>
            formValues[topping]===true
          )
        }
        postPizza(newPizza);
      }

      const postPizza = newPizza => {
        axios.post('https://reqres.in/api/pizza', newPizza)
        .then(res=>{
            console.log(res)
          setPizzas([...pizzas, {...newPizza, id:res.data.id}]);
          setFormValues(initialFormValues);
        })
        .catch(err=>{
          console.log(err)
        })
      }

    return (
        <div>
            {pizzas.map(pizza=>{
                    return (
                        <div>
                        <h4>***Order Number {pizza.id}***</h4>
                        <h4>Order for: {pizza.name}</h4>
                        <h4>Size: {pizza.size}</h4>
                        <h4>Sauce: {pizza.sauce}</h4>
                        <h4>Toppings: {pizza.toppings.map(topping=>` ${topping}`)}</h4>
                        <h4>Special Instructions: {pizza.instructions}</h4>
                        </div>
                      
                    )
                })}
            <h1>Order Form!</h1>
            <form onSubmit={onSubmit}>
                    <label htmlFor='name'>Enter your name <br></br>
                    <input
                    value={formValues.name}
                    onChange={onChange}
                    name='name'
                    type='text' /><br></br>
                    </label>
                    <p>{formErrors.name}</p>
                    <label htmlFor='size'>
                        What size pizza do you want?<br></br>
                        <select
                        onChange={onChange}
                        value={formValues.size}
                        name='size'>
                            <option value=''>Select a size</option>
                            <option value='small'>Small</option>
                            <option value='medium'>Medium</option>
                            <option value='large'>Large</option>
                        </select>
                    </label>
                    <p>{formErrors.size}</p>
                    <p>What kind of sauce do you want?</p>
                    <label htmlFor='red'>Red
                        <input type='radio'
                        name='sauce'
                        value='red'
                        checked={formValues.sauce==='red'}
                        onChange={onChange} /><br></br>
                    </label>
                    <label htmlFor='white'>White
                        <input type='radio'
                        name='sauce'
                        value='white'
                        checked={formValues.sauce==='white'}
                        onChange={onChange} /><br></br>
                    </label>
                    <label htmlFor='bbq'> bbq
                        <input type='radio'
                        name='sauce'
                        value='bbq'
                        checked={formValues.sauce==='bbq'}
                        onChange={onChange} /><br></br>
                    </label>
                    <p>{formErrors.sauce}</p>
                    <p>Toppings</p>
                    <label htmlFor='pepperoni'>pepperoni
                        <input
                        type='checkbox'
                        name='pepperoni'
                        checked={formValues.pepperoni}
                        onChange={onChange} /><br></br>
                    </label>
                    <label htmlFor='sausage'>sausage
                        <input
                        type='checkbox'
                        name='sausage'
                        checked={formValues.sausage}
                        onChange={onChange} /><br></br>
                    </label>
                    <label htmlFor='mushroom'>mushroom
                        <input 
                        type='checkbox'
                        name='mushroom'
                        checked={formValues.mushroom}
                        onChange={onChange} /><br></br>
                    </label>
                    <label htmlFor='peppers'>peppers
                        <input
                        type='checkbox'
                        name='peppers'
                        checked={formValues.peppers}
                        onChange={onChange} /><br></br>
                    </label>
                    <label htmlFor='instructions'>Special Instructions?<br></br>
                        <input 
                        type='text'
                        name='instructions'
                        value={formValues.instructions}
                        onChange={onChange} />
                    </label><br></br>
                    <button disabled={disabled}>Order Now!</button>
            </form>
            
        </div>
    )
}
