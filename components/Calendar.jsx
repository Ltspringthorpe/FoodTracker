import React from 'react';
import ReactDOM from 'react-dom';
import DaySummary from './DaySummary.jsx';

export default class Calendar extends React.Component {

  constructor(props) {
    super(props);
    var today = this.getToday();
    this.state = { date: today };
  };

  getToday() {
    var today = new Date(Date.now());
    // round down to midnight 00:00:00:00
    today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0);
    today.setMilliseconds(0);
    return today;
  };

  decrementDate(event) {
    event.preventDefault();
    var date = new Date(this.state.date.getTime() - 86400000); //86400000 is milliseconds in one day
    this.setState({ date: date });
  }

  incrementDate(event) {
    event.preventDefault();
    var date = new Date(this.state.date.getTime() + 86400000); //86400000 is milliseconds in one day
    this.setState({ date: date });
  }

  pickDate(event) {
    event.preventDefault();
    if (event.type === "change") {
      var newDate = event.currentTarget.valueAsDate;
      newDate.setHours(newDate.getHours() + 8);
    }
    if (event.type === "click") {
      var newDate = this.getToday();
    }
    this.setState({ date: newDate });
  }

  formatDate(date) {
    var month = date.getMonth() + 1; // month is zero-indexed, jan = 0 etc.
    if (month < 10) { month = "0" + month }

    var dateNumber = date.getDate();
    if (dateNumber < 10) { dateNumber = "0" + dateNumber }

    var year = date.getFullYear();
    if (year < 10) { year = 2000 + year }
    if (year > 2020) { year = 2020 }

    return year +"-"+ month +"-"+ dateNumber;
  }

  render() {
    if (!this.state.date) {
      return <div></div>;
    };

    var formattedDate = this.formatDate(this.state.date);
    var options = { weekday:'long', day:'numeric', month:'long'};

    var TodayButton = <div className="today-button-none"></div>;
    if (this.state.date.getTime() !== this.getToday().getTime()) {
      TodayButton = <button className="today-button" onClick={this.pickDate.bind(this)}>Today</button>
    }

    var minDate = new Date();
    minDate.setFullYear(2000, 0, 1);
    var maxDate = new Date();
    maxDate.setFullYear(2020, 11, 30);

    return (
      // &lt; is < and &gt is >
      <div>
        <div className="date-bar">
          <button className="date-nav-button"
            disabled={this.state.date.getTime() <= minDate.getTime()}
            onClick={this.decrementDate.bind(this)}>&lt;
          </button>
          <div className="date-string">{this.state.date.toLocaleString('en-US', options)}</div>
          <button className="date-nav-button"
            disabled={this.state.date.getTime() >= maxDate.getTime()}
            onClick={this.incrementDate.bind(this)}>&gt;
          </button>

          <input className="date-picker"
            type="date"
            onChange={this.pickDate.bind(this)}
            value={formattedDate}
            min="2000-01-01"
            max="2020-12-31"
            />

          {TodayButton}
        </div>

        <DaySummary date={this.state.date}/>

      </div>
    )
  };

}
