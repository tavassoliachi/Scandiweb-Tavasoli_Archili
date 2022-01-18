import './App.css';
import Routes from './components/Routes';
import Header from './components/Header/Header.jsx';
import { BrowserRouter } from 'react-router-dom';
import Blackdrop from './components/Blackdrop';
import { Component } from 'react';
export class App extends Component{

  constructor(){
    super()
    this.state={
      currency:"USD",
      category:"all",
      cart:[],
      cartIsOpen:false,
      isOpen:false,
      darken:false,
      blackdropOffset:80
    }
    this.changeCurrency = this.changeCurrency.bind(this)
    this.changeCategory = this.changeCategory.bind(this)
    this.changeQuantity = this.changeQuantity.bind(this)
    this.setIsOpen = this.setIsOpen.bind(this)
    this.setCartIsOpen = this.setCartIsOpen.bind(this)
    this.setCart = this.setCart.bind(this)
  }

  changeCurrency(el){
    if(!Boolean(this.state.currency===el)){
      this.setState({currency:el})
    } 
  }
  changeCategory(el){
    if(!Boolean(this.state.category===el)){
      this.setState({category:el})
    }  
  } 

  setCart(el){
        if(this.state.cart.length === 0){
          this.setState({cart:[el]})
        }else{
        var matchingOptions = []
        var newElement = true
        this.state.cart.filter((e)=>e.name === el.name).forEach(element => {
            matchingOptions = []
            element.options.forEach((opt)=>
            matchingOptions.push(
              Boolean(el.options.filter((opt2)=>opt2.name===opt.name)[0].value === opt.value)
            ))
            
            if(!(matchingOptions.includes(false)) || matchingOptions.length===0){
              var cart = this.state.cart
              cart.find((elem)=>elem.id===element.id).quantity = element.quantity+1
              this.setState({cart:cart})
              newElement=false
            }
        });
        if(newElement){
          this.setState({cart:[...this.state.cart,el]})
        }  }  
        }

        changeQuantity(id,num){
        var currQuantity = this.state.cart.filter((el)=>el.id===id)[0].quantity
        var cart = this.state.cart
        if(currQuantity === 1 && num === -1){
          
          this.setState({cart:[...this.state.cart.filter((el)=>!Boolean(el.id===id))]})
        }else{
          cart.find((el)=>el.id===id).quantity = currQuantity + num
          this.setState({cart:cart})
        }
        
    }

    setCartIsOpen(state){
        if(this.state.isOpen===true && state===true){
          this.setState({cartIsOpen:true,isOpen:false})
        }else{
          this.setState({cartIsOpen:state})
        }
    }
    setIsOpen(state){
      if(this.state.cartIsOpen===true && state===true){
        this.setState({isOpen:true,cartIsOpen:false})
      }else{
        this.setState({isOpen:state})
      }
    }

  render(){
  return (
  <div className='mainContainer'>
              {this.state.cartIsOpen &&(
                <Blackdrop setCartIsOpen={this.setCartIsOpen}/>
              )}
          <BrowserRouter>
              <Header key={this.state} setCartIsOpen={this.setCartIsOpen} setIsOpen={this.setIsOpen} 
              cartIsOpen={this.state.cartIsOpen} isOpen={this.state.isOpen} 
              changeCurrency={this.changeCurrency} currency={this.state.currency} 
              changeCategory={this.changeCategory} category={this.state.category} 
              cart={this.state.cart} setCart={this.setCart} changeQuantity={this.changeQuantity}/>

              <Routes currency={this.state.currency} category={this.state.category} 
                key={this.state.currency+this.state.category} 
                cart={this.state.cart} setCart={this.setCart}
                changeQuantity={this.changeQuantity}
                darken = {this.state.cartIsOpen || this.state.isOpen}
                />
                {console.log("hey")}
          </BrowserRouter>    
      </div>
    
  );
}}

export default App;
