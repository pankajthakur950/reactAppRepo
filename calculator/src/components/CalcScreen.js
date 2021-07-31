import React from 'react';

export default class CalcScreen extends React.Component{
    constructor(props){
        super(props);
        this.state = {input: props.value};
        this.inputRef = React.createRef();
    }
    isNumberKey = event => { 
        let charCode = (event.which) ? event.which : event.keyCode;
        if (this.state.input.length >= 15 || (charCode > 31 && (charCode < 48 || charCode > 57))){
            event.preventDefault();
            return false;
        }
        return true;
    }
    static getDerivedStateFromProps(props, state){
        state.input = props.value;
        return state;
    }
    componentDidMount() {
        document.body.addEventListener('keypress', event => {
            console.log(event);
            let e ={target:{}};
            if(this.isNumberKey(event)){
               e.target.value = this.inputRef.current.value + "" +event.key;
               this.props.onValueChange(e);
            }
        });
    }
    componentWillUnmount() {
        document.body.removeEventListener('keypress');
    }
    render(){
        return(
            <div className="calculator-screen">
                <div className="calculator-screen__calculations"></div>
                <div className="calculator-screen__input">
                    <input type="text" value={this.state.input} 
                        ref ={this.inputRef}
                        onChange={this.props.onValueChange}
                        onKeyPress={this.isNumberKey}/>
                </div>
            </div>
        );
    }
}