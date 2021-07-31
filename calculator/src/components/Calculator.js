import React from 'react';
import PropTypes from 'prop-types';

import CalcScreen from './CalcScreen';
import CalcKeypad from './CalcKeypad';

class Calculator extends React.Component {
    //prop type validator
    static propTypes = {
        text: PropTypes.number.isRequired
    }
    constructor(props){
        super(props);
        console.log(props.text);
        //props are immutable, can't do....
        //props.text = "def";
        this.enterNewNumber = true;
        this.operand1 = null;
        this.operand2 = null;
        this.state = {
            screenVal : 0,
            currentOperation : null,
            text:"Some text"
        };
    }
    handleNumber = (value) =>{
        if(this.state.screenVal &&  this.state.screenVal.toString().length <= 15 && !this.enterNewNumber){
            this.setState({screenVal: `${this.state.screenVal +""+ value}`});
        }else{
            this.enterNewNumber = false;
            this.setState({screenVal: value});
        }
    }
    clearCalculations = () =>{
        this.operand1 = null;
        this.operand2 = null;
        this.setState({
            screenVal : 0,
            currentOperation : null
        });
    }
    calculateResult = () => {
        let operand1 = Number(this.operand1);
        let operand2 = Number(this.operand2);
        switch(this.state.currentOperation){
            case '+':
                return operand1 + operand2;
            case '-':
                return operand1 - operand2;
            case '*':
                return operand1 * operand2;
            case '/':
                return operand1 / operand2;
            default:
                return;
        }
    }
    handleOperation = (value) =>{
        let result;
        if(!this.operand1){
            this.operand1 = this.state.screenVal;
            this.setState({currentOperation: value === '=' ? null : value });
            this.enterNewNumber = value === '=' ? false : true;
            return;            
        }
        if(this.operand1 && this.state.currentOperation){
            this.operand2 = this.state.screenVal;
            result = this.enterNewNumber ? this.state.screenVal : this.calculateResult();
            this.operand1 = value === '=' ? null : result;
            this.operand2 = null;
            this.setState({currentOperation: value === '=' ? null : value, 
                           screenVal: result});
            this.enterNewNumber = true;
        }
    }
    onValueChange = (e) =>{
        console.log("e.target.value" + e.target.value);
        this.setState({screenVal: e.target.value});
    }
    handleClick= (e) =>{
        
        //this.state.text = "some another text";
        console.log("text updated...");
        //force re-render..
        //this.forceUpdate();
    }
    render(){
        return (
            <div className="ui container calculator">
                <div onClick={this.handleClick}>{this.state.text}</div>
                <CalcScreen value={this.state.screenVal} onValueChange={this.onValueChange}/>
                <CalcKeypad handleNumber={this.handleNumber} 
                            handleOperation={this.handleOperation}
                            clearCalculations = {this.clearCalculations}
                />
            </div>
        )
    }
}
/*Calculator.propTypes = {
    text: PropTypes.number.isRequired
}*/

export default Calculator;