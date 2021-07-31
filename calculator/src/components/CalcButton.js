import React, { Component } from 'react'

export default class CalcButton extends Component {
  render() {
    return (
        <button className={this.props.calcButtonProp} 
                onClick={()=> this.props.onCalcButtonPressed(this.props.text)}>
            {this.props.text}
        </button>
    )
  }
}
