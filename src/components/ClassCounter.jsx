import React from 'react';

class ClassCounter extends React.Component {
  constructor(props) {
    super();
    this.state = {
      count: 0,
    };

    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
  }

  increment() {
    // setCount(count + 1);
    this.setState({ count: this.state.count + 1 });
  }
  decrement() {
    // setCount(count - 1);
    this.setState({ count: this.state.count - 1 });
  }

  render() {
    return (
      <div>
        <h1>{this.state.count}</h1>
        <button onClick={this.increment}>increment</button>
        <button onClick={this.decrement}>decrement</button>
      </div>
    );
  }
}

export default ClassCounter;
