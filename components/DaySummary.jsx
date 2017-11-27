import React from 'react';
import ReactDOM from 'react-dom';
import FoodItem from './FoodItem.jsx';
import AddItemForm from './AddItemForm.jsx';
import NutritionInfo from './../FakeDatabase/NutritionInfo.js';
import MyDiet from './../FakeDatabase/MyDiet.js';

export default class DaySummary extends React.Component {

  constructor(props) {
    super(props);
    var foodItems = MyDiet[new Date(Date.now()).getDay()];
    this.state = {
      date: props.date,
      nutritionInfo: NutritionInfo,
      foodItems: foodItems,
      addFormVisible: false,
    };
  };

  componentWillReceiveProps(newProps) {
    var date = newProps.date;
    var foodItems = [];
    var dayOfTheWeek = newProps.date.getDay();
    if (newProps.date <= new Date(Date.now())) {
      foodItems = MyDiet[dayOfTheWeek];
    }
    this.setState({
      date: date,
      foodItems: foodItems
    });
  };

  addItem(event) {
    event.preventDefault();
    this.setState({ addFormVisible: true });
  }

  deleteItem(event) {
    event.preventDefault();
    var id = event.target.id;
    var foodItems = this.state.foodItems;
    foodItems.splice(id, 1);
    this.setState({ foodItems: foodItems });
  }

  updateState(newState) {
    this.setState(newState);
  }

  createTable() {
    var TableHead = (
      <thead className="table-head">
      <tr>
        <th className="food-column">Food</th>
        <th className="calories-column">Calories</th>
        <th className="carbs-column">Carbs (g)</th>
        <th className="fat-column">Fat (g)</th>
        <th className="delete-column"></th>
      </tr>
      </thead>
    );

    var FoodList =  [];
    var totalCalories = 0;
    var totalCarbs = 0;
    var totalFat = 0;

    for (var i=0; i<this.state.foodItems.length; i++) {
      FoodList.push(
        <FoodItem
          index={i}
          key={i}
          food={this.state.foodItems[i]}
          nutritionInfo={this.state.nutritionInfo}
          name={this.state.foodItems[i].food || this.state.foodItems[i]}
          deleteItem={this.deleteItem.bind(this)}
          />
      );
      totalCalories += parseInt(this.state.nutritionInfo[this.state.foodItems[i]].calories);
      totalCarbs += parseInt(this.state.nutritionInfo[this.state.foodItems[i]].carbs);
      totalFat += parseInt(this.state.nutritionInfo[this.state.foodItems[i]].fat);
    }

    var AddItem = (
      <tfoot>
      <tr>
        <td><button className="add-item-button" onClick={this.addItem.bind(this)}>Add Item</button></td>
      </tr>
      </tfoot>
    );

    if (this.state.addFormVisible) {
      AddItem = (
        <AddItemForm
          nutritionInfo={this.state.nutritionInfo}
          foodItems={this.state.foodItems}
          updateState={this.updateState.bind(this)}
          />
      );
    }

    var Summary = (
      <tbody className="totals">
      <tr>
        <td>Total</td>
        <td>{totalCalories}</td>
        <td>{totalCarbs}</td>
        <td>{totalFat}</td>
        <td></td>
      </tr>
      </tbody>
    );

    return (
      <table>
        {TableHead}
        {FoodList}
        {Summary}
        {AddItem}
      </table>
    );
  }

  render() {
    if (!this.state.date) {
      return <div></div>;
    };

    var Table = this.createTable();
    if (this.state.date.getTime() > new Date(Date.now()).getTime()) {
      Table = (<span>Nothing to see yet!</span>);
    }

    return (
      <div className="day-summary">
        {Table}
      </div>
    )
  };

}
