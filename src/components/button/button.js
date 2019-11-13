import React from 'react';
import '../../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class Button extends React.Component {
    render() {
        return (
            <div className="col-3 calculator-button" onClick={() => this.props.handleClick(this.props.children)}>{this.props.children}</div>
        );
    }
}

export default Button;