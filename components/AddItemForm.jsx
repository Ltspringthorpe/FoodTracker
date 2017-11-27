import React from 'react';
import ReactDOM from 'react-dom';

export default class AddItemForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      dropDownItem: "cust"
    }
  }

  handleSelect(event) {
    event.preventDefault();
    this.setState({ dropDownItem: event.target.value });
  }

  submitAddItem(event) {
    event.preventDefault();
    var errors = false;
    //this is horrible, but I can't put a form inside a table
    var food = event.currentTarget.parentElement.parentElement.firstChild.firstChild.value;
    if (!food) { errors = true };
    if (!this.props.nutritionInfo[food]) {
      var nutritionInfo = this.props.nutritionInfo;
      var calories = event.currentTarget.parentElement.parentElement.children[1].firstChild.value || "0";
      var carbs = event.currentTarget.parentElement.parentElement.children[2].firstChild.value || "0";
      var fat = event.currentTarget.parentElement.parentElement.children[3].firstChild.value || "0";

      if ((!parseInt(calories) && calories !== "0") ||
          (!parseInt(carbs) && carbs !== "0") ||
          (!parseInt(fat) && fat !=="0")) {
          errors = true;

      } else {
        nutritionInfo[food] = {
          calories: calories,
          carbs: carbs,
          fat: fat,
        }
        this.props.updateState({ nutritionInfo: nutritionInfo });
      }
    }

    if(!errors) {
      var foodItems = this.props.foodItems;
      foodItems.push(food);
      this.setState({
        dropDownItem: "cust"
      });
      this.props.updateState({
        foodItems: foodItems,
        addFormVisible: false
      });
    } else {
      window.alert('invalid values');
    }
  }

  cancelAddItem() {
    this.props.updateState({ addFormVisible: false });
    this.setState({ dropDownItem: "cust" });
  }

  render() {
    var dropdownOptions = [<option key="cust" value="cust">Custom</option>];
    Object.keys(this.props.nutritionInfo).forEach(function(food) {
      dropdownOptions.push(
        <option key={food} value={food}>{food}</option>)
    });

    var AddItem;
    var CustomItem;
    if (this.state.dropDownItem !== "cust") {
      AddItem = (
        <tr>
          <td><select onChange={this.handleSelect.bind(this)}>{dropdownOptions}</select></td>
          <td><input disabled className="calories-input" value={this.props.nutritionInfo[this.state.dropDownItem].calories}/></td>
          <td><input disabled className="carbs-input" value={this.props.nutritionInfo[this.state.dropDownItem].carbs}/></td>
          <td><input disabled className="fat-input" value={this.props.nutritionInfo[this.state.dropDownItem].fat}/></td>
          <td className="add-cancel">
            <button type="submit" onClick={this.submitAddItem.bind(this)}>Add</button>
            <button type="submit" onClick={this.cancelAddItem.bind(this)}>Cancel</button>
          </td>
        </tr>
      );
      CustomItem = (<tr></tr>);

    } else {
      AddItem = (
        <tr>
          <td><select onChange={this.handleSelect.bind(this)}>{dropdownOptions}</select></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      );
      CustomItem = (
        <tr>
          <td><input className="name-input" placeholder="name"/></td>
          <td><input className="calories-input" placeholder="calories"/></td>
          <td><input className="carbs-input" placeholder="carbs"/></td>
          <td><input className="fat-input" placeholder="fat"/></td>
          <td className="add-cancel">
            <button type="submit" onClick={this.submitAddItem.bind(this)}>Add</button>
            <button type="submit" onClick={this.cancelAddItem.bind(this)}>Cancel</button>
          </td>
        </tr>
      );
    }

    return (
      <tfoot>
        {AddItem}
        {CustomItem}
      </tfoot>
    )
  }
}
