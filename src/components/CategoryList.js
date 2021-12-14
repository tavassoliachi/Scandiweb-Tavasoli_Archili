import React, { Component } from 'react';
import styles from "./CategoryList.styles.module.css"
import { Link } from 'react-router-dom';
class Categorylist extends Component {
    constructor(){
        super()
        this.categories=[]
    }
    generateCategoryList(){
        const catFetchedList = this.props.categoryList
        this.categories = ["all"]
        catFetchedList &&(
            Object.keys(catFetchedList).map((el)=>
            this.categories.push(catFetchedList[el].name)
            )
        )
    }
    displayCategory(el){
        const handleClick = () =>{this.props.handleCatChange(el)} 
        return <Link to='/categories' key={el} 
                onClick={handleClick} 
                className={this.props.currCategory===el?.toLowerCase() ? styles.activeCategory : styles.category}
                >{el.toUpperCase()}</Link>
    }

    render() {
        this.generateCategoryList()
        return (
            <div className={styles.categories} >
                 {this.categories.map((el)=>{
                    return this.displayCategory(el)
                })}
            </div>
        );
    }
}

export default Categorylist;
