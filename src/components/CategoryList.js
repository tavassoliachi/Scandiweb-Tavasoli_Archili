import React, { Component } from 'react';
import styles from "./CategoryList.styles.module.css"
import { Link } from 'react-router-dom';
class Categorylist extends Component {
    render() {
        const catFetchedList = this.props.categoryList
        const catList = ["all"]
        catFetchedList &&(
            Object.keys(catFetchedList).map((el)=>
                catList.push(catFetchedList[el].name)
            )
        )
        return (
            <div className={styles.categories} >
                 {catList.map((el)=>{
                    return <Link to='/categories' key={el} onClick={()=>this.props.handleCatChange(el)} className={this.props.currCategory===el?.toLowerCase() ? styles.activeCategory : styles.category}>{el.toUpperCase()}</Link>
                })}
            </div>
        );
    }
}

export default Categorylist;
