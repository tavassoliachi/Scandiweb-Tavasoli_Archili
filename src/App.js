import './App.css';
import Routes from './components/Routes';
import Header from './components/Header/Header.jsx';
import { BrowserRouter, Link } from 'react-router-dom';
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
      darken:false
    }
  }

  render(){
  
  const changeCurrency = (el) =>{
    if(this.state.currency!==el){
      this.setState({currency:el})
    } 
  }
  const changeCategory = (el) =>{
    if(this.state.category!==el){
      this.setState({category:el})
    }  
  } 
  const setCart=(el)=>{
    if(this.state.cart.length == 0){
      this.setState({cart:[el]})
    }else{
    var matchingOptions = []
    var newElement = true
    this.state.cart.filter((e)=>e.name == el.name).forEach(element => {
        matchingOptions = []
        element.options.forEach((opt)=>
        el.options.filter((opt2)=>opt2.name==opt.name)[0].value == opt.value ? matchingOptions.push(true) : matchingOptions.push(false)
        )
        if(!(matchingOptions.includes(false)) || matchingOptions.length==0){
          var cart = this.state.cart
          cart.find((elem)=>elem.id=element.id).quantity = element.quantity+1
          this.setState({cart:cart})
          newElement=false
        }
    });
    if(newElement){
      this.setState({cart:[...this.state.cart,el]})
    }  }  }

    const changeQuantity=(id,num)=>{
        var currQuantity = this.state.cart.filter((el)=>el.id==id)[0].quantity
        var cart = this.state.cart
        if(currQuantity == 1 && num == -1){
          this.setState({cart:[...this.state.cart.filter((el)=>el.id!==id)]})
        }else{
          cart.find((el)=>el.id==id).quantity = currQuantity + num
          this.setState({cart:cart})
        }
        
    }

    const setCartIsOpen=(state)=>{
        if(this.state.isOpen==true && state==true){
          this.setState({cartIsOpen:true,isOpen:false})
        }else{
          this.setState({cartIsOpen:state})
        }
    }
    const setIsOpen=(state)=>{
      if(this.state.cartIsOpen==true && state==true){
        this.setState({isOpen:true,cartIsOpen:false})
      }else{
        this.setState({isOpen:state})
      }
    }
    
  return (
  <div style={{padding:"0 50px",position:"relative" }}>
            <div className="darkenM" style={this.state.cartIsOpen  ? undefined : {display:"none"}} onClick={()=>setCartIsOpen(false)}/>
          <BrowserRouter>
            <Header key={this.state} setCartIsOpen={setCartIsOpen} setIsOpen={setIsOpen} cartIsOpen={this.state.cartIsOpen} isOpen={this.state.isOpen} changeCurrency={changeCurrency} currency={this.state.currency} changeCategory={changeCategory} category={this.state.category} cart={this.state.cart} setCart={setCart} changeQuantity={changeQuantity}/>
            
            <Routes currency={this.state.currency} category={this.state.category} 
              key={this.state.currency+this.state.category} 
              cart={this.state.cart} setCart={setCart}
              changeQuantity={changeQuantity}
              darken = {this.state.cartIsOpen || this.state.isOpen}
              />
            </BrowserRouter>    
      </div>
    
  );
}}

export default App;
