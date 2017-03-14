var React = require('react');
var OpenWeatherMap = require('OpenWeatherMap');
var WeatherForm = require('WeatherForm');
var WeatherMessage = require('WeatherMessage');

var Weather = React.createClass({
  getInitialState: function () {
    return {
      isLoading: false
    }
  },
  handleSearchLocation: function (location) {
    var that = this;
    that.setState({isLoading: true});

    OpenWeatherMap.getTemp(location).then(function (temp) {
      that.setState({
        isLoading: false,
        location: location,
        temp: temp
      });
    }, function (error) {
      that.setState({isLoading: false});
      alert(error);
    });
  },
  render: function () {
    var {isLoading, location, temp} = this.state;

    function renderMessage () {
      if (isLoading) {
        return <h3 className="text-center">Fetching weather...</h3>;
      } else if (temp && location) {
        return <WeatherMessage location={location} temp={temp}/>;
      }
    }

    return (
      <div>
        <h1 className="text-center">Get Weather</h1>
        <WeatherForm onSearchLocation={this.handleSearchLocation}/>
        {renderMessage()}
      </div>
    );
  }
});

module.exports = Weather;
