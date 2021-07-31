import React from 'react';

import CalcButton from './CalcButton'

class CalcKeypad extends React.Component{
    render(){
        return(
            <div className="calculator-keypad">
                <div className="calculator-keypad__row">
                    <CalcButton text="Clear"  calcButtonProp="clear" onCalcButtonPressed={this.props.clearCalculations}/>
                    <CalcButton text="/"  calcButtonProp="operators" onCalcButtonPressed={this.props.handleOperation}/>
                </div>
                <div className="calculator-keypad__row">
                    <CalcButton text="7" calcButtonProp="numbers" onCalcButtonPressed={this.props.handleNumber}/>
                    <CalcButton text="8" calcButtonProp="numbers" onCalcButtonPressed={this.props.handleNumber}/>
                    <CalcButton text="9" calcButtonProp="numbers" onCalcButtonPressed={this.props.handleNumber}/>
                    <CalcButton text="-" calcButtonProp="operators" onCalcButtonPressed={this.props.handleOperation}/>
                </div>
                <div className="calculator-keypad__row">
                    <CalcButton text="4" calcButtonProp="numbers" onCalcButtonPressed={this.props.handleNumber}/>
                    <CalcButton text="5" calcButtonProp="numbers" onCalcButtonPressed={this.props.handleNumber}/>
                    <CalcButton text="6" calcButtonProp="numbers" onCalcButtonPressed={this.props.handleNumber}/>
                    <CalcButton text="+" calcButtonProp="operators" onCalcButtonPressed={this.props.handleOperation}/>
                </div>
                <div className="calculator-keypad__row">
                    <CalcButton text="1" calcButtonProp="numbers" onCalcButtonPressed={this.props.handleNumber}/>
                    <CalcButton text="2" calcButtonProp="numbers" onCalcButtonPressed={this.props.handleNumber}/>
                    <CalcButton text="3" calcButtonProp="numbers" onCalcButtonPressed={this.props.handleNumber}/>
                    <CalcButton text="=" calcButtonProp="operators" onCalcButtonPressed={this.props.handleOperation}/>
                </div>
            </div>
        );
    }
}

export default CalcKeypad;