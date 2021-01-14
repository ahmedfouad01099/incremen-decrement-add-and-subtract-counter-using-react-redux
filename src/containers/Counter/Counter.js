import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionsCreators from "../../store/actions/index";
import CounterControl from "../../components/CounterControl/CounterControl";
import CounterOutput from "../../components/CounterOutput/CounterOutput";
// import * as actionTypes from "../../store/actions/actions";

class Counter extends Component {
  state = {
    counter: 0,
  };

  counterChangedHandler = (action, value) => {
    switch (action) {
      case "inc":
        this.setState((prevState) => {
          return { counter: prevState.counter + 1 };
        });
        break;
      case "dec":
        this.setState((prevState) => {
          return { counter: prevState.counter - 1 };
        });
        break;
      case "add":
        this.setState((prevState) => {
          return { counter: prevState.counter + value };
        });
        break;
      case "sub":
        this.setState((prevState) => {
          return { counter: prevState.counter - value };
        });
        break;
      default:
        return null;
    }
  };

  render() {
    return (
      <div>
        <CounterOutput value={this.props.ctr} />
        <CounterControl
          label="Increment"
          clicked={this.props.onIncrementCounter}
        />
        <CounterControl
          label="Decrement"
          clicked={this.props.onDecrementCounter}
        />
        <CounterControl label="Add 5" clicked={this.props.onAddCounter} />
        <CounterControl
          label="Subtract 5"
          clicked={this.props.onSubtractCounter}
        />
        <hr />
        <button onClick={() => this.props.onStoreResult(this.props.ctr)}>
          Store Result
        </button>
        <ul>
          {this.props.storedResults.map((strResult) => {
            return (
              <li
                key={strResult.id}
                onClick={() => this.props.onDeleteResult(strResult.id)}
              >
                {strResult.value}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    ctr: state.ctr.counter,
    storedResults: state.res.results,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIncrementCounter: () => dispatch(actionsCreators.increment()),
    onDecrementCounter: () => dispatch(actionsCreators.decrement()),
    onAddCounter: () => dispatch(actionsCreators.add(5)),
    // here we easily could use val and get it from user input dynamiclly for example
    onSubtractCounter: () => dispatch(actionsCreators.subtract(5)),
    onStoreResult: (result) => dispatch(actionsCreators.storeResult(result)),
    onDeleteResult: (id) => dispatch(actionsCreators.deleteResult(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
