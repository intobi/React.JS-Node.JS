import React from 'react';
import '../../App.css'

class History extends React.Component {
    render() {
        return(
            <div className="input" onClick={() => this.props.handleClick()}>{this.props.children}</div>
        );
    }
}

export default History;