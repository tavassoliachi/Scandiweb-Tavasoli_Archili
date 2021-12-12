import styles from "./Blackdrop.styles.module.css"
import { PureComponent } from "react"
export default class Blackdrop extends PureComponent{
    constructor(props) {
        super(props);
        this.state = {
            blackdropOffset:80 
        };
        this.handleScroll = this.handleScroll.bind(this);
    }
    
    handleScroll() {
        if (window.pageYOffset >= 80 && this.state.scroll !== 0) {
            this.setState({ blackdropOffset: 0 });
        } else if (window.pageYOffset < 80) {
            this.setState({ blackdropOffset: 80-window.pageYOffset });
        }
    }

    componentDidMount() {
        window.addEventListener("scroll", this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
    }

    render() {
        return <div className={styles.blackdrop} onClick={()=>this.props.setCartIsOpen(false)} style={{top:this.state.blackdropOffset}}/>;
    }
}