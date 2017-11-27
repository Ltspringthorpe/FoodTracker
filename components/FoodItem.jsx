import React from 'react';
import ReactDOM from 'react-dom';
// import NutritionInfo from './../FakeDatabase/NutritionInfo.js';

export default class FoodItem extends React.Component {

  constructor(props) {
    super(props);
    this.state = { food: props.food };
  };

  componentWillReceiveProps(newProps) {
    var food = newProps.food;
    this.setState({ food: food })
  };

  render() {
    if (!this.state.food) {
      return <tbody></tbody>;
    };

    var rowColor = 'blue';
    if (this.props.index % 2) {
      rowColor = 'white';
      // alternate row color
    }

    var food = this.state.food;
    if (this.props.nutritionInfo[this.state.food]) {
      food = this.props.nutritionInfo[this.state.food];
    };

    return (
      <tbody>
      <tr className={rowColor}>
        <td>{this.state.food}</td>
        <td>{food.calories}</td>
        <td>{food.carbs}</td>
        <td>{food.fat}</td>
        <td className="always-white">
          <button
            className="delete-button"
            id={this.props.index}
            onClick={this.props.deleteItem.bind(this)}>
            x
          </button>
        </td>
      </tr>
      </tbody>
    )
  };

}
