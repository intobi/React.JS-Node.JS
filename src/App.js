import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from './components/button/button';
import Input from './components/input/input';
import History from './components/history/history';
import axios from 'axios';


class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      previousNumber: "",
      currentNumber: "0",
      operator: ""
    }
  }

  copy = () => {
    this.setState({ currentNumber: this.state.previousNumber });
  }

  addDot = () => {
    this.setState({ currentNumber: this.state.currentNumber + '.' })
  }

  addToInput = val => {
    this.setState({ currentNumber: this.state.currentNumber === '0' ? val : this.state.currentNumber + val })
  }

  clearEverything = () => {
    this.setState({ currentNumber: '0', previousNumber: '', operator: '' });
  }

  clearCurrent = () => {
    this.setState({ currentNumber: '0' });
  }

  clearChar = () => {
    this.setState({ currentNumber: this.state.currentNumber.length > 1 ? this.state.currentNumber.substr(0, this.state.currentNumber.length - 1) : '0' });
  }

  revers = () => {
    if (this.state.currentNumber !== '0')
      this.setState({ currentNumber: this.state.currentNumber.indexOf('-') === 0 ? this.state.currentNumber.substr(1, this.state.currentNumber.length - 1) : '-' + this.state.currentNumber });
  }

  addOperator = operator => {
    if (this.state.currentNumber !== '0') {
      if (this.state.previousNumber !== '' && this.state.operator !== '') {
        this.calculate();
      } else {
        this.setState({ previousNumber: this.state.currentNumber, currentNumber: '0' });
      }
    }
    this.setState({ operator: operator });
  }

  equals = () => {
    this.calculate();
    this.setState({ operator: '' });
  }

  calculate = () => {
    let data = { currentNumber: parseFloat(this.state.currentNumber), previousNumber: parseFloat(this.state.previousNumber), operator: this.state.operator };
    axios.post("http://localhost:3000", data)
      .then(response => {
        console.log(response);
        this.setState({ previousNumber: response.data, currentNumber: '0' });
      })
      .catch(error => {
        console.log(error);
      })
  }

  render() {
    return (
      <div className="container">
        <div className="calculator-wrapper">
          <div className="calculator">
            <div className="display">
              <History handleClick={this.copy}>{this.state.previousNumber}</History>
              <Input>{this.state.operator}</Input>
              <Input>{this.state.currentNumber}</Input>
            </div>
            <div className="row">
              <Button handleClick={this.clearEverything}>CE</Button>
              <Button handleClick={this.clearCurrent}>C</Button>
              <Button handleClick={this.clearChar}>&lt;</Button>
              <Button handleClick={this.addOperator}>/</Button>
            </div>
            <div className="row">
              <Button handleClick={this.addToInput}>7</Button>
              <Button handleClick={this.addToInput}>8</Button>
              <Button handleClick={this.addToInput}>9</Button>
              <Button handleClick={this.addOperator}>*</Button>
            </div>
            <div className="row">
              <Button handleClick={this.addToInput}>4</Button>
              <Button handleClick={this.addToInput}>5</Button>
              <Button handleClick={this.addToInput}>6</Button>
              <Button handleClick={this.addOperator}>-</Button>
            </div>
            <div className="row">
              <Button handleClick={this.addToInput}>1</Button>
              <Button handleClick={this.addToInput}>2</Button>
              <Button handleClick={this.addToInput}>3</Button>
              <Button handleClick={this.addOperator}>+</Button>
            </div>
            <div className="row">
              <Button handleClick={this.revers}>+/-</Button>
              <Button handleClick={this.addToInput}>0</Button>
              <Button handleClick={this.addDot}>.</Button>
              <Button handleClick={this.equals}>=</Button>
            </div>
          </div>
        </div>
      </div>
    );
  };
}

export default App;
