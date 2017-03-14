var React = require('react');
var ErrorModal = require('ErrorModal');
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
    that.setState({
      errorMessage: undefined,
      isLoading: true,
      location: undefined,
      temp: undefined
    });

    OpenWeatherMap.getTemp(location).then(function (temp) {
      that.setState({
        isLoading: false,
        location: location,
        temp: temp
      });
    }, function (e) {
      that.setState({
        errorMessage: e.message,
        isLoading: false
      });
    });
  },
  componentDidMount: function() {
    var location = this.props.location.query.location;
    if (location && location.length > 0) {
      this.handleSearchLocation(location);
      window.location.hash = '#/';
    }
  },
  componentWillReceiveProps: function (newProps) {
    var location = newProps.location.query.location;
    if (location && location.length > 0) {
      this.handleSearchLocation(location);
      window.location.hash = '#/';
    }
  },
  render: function () {
    var {isLoading, location, temp, errorMessage} = this.state;

    function renderMessage () {
      if (isLoading) {
        return <h3 className="text-center">Fetching weather...</h3>;
      } else if (typeof temp === 'number' && location) {
        return <WeatherMessage location={location} temp={temp}/>;
      }
    };

    function renderError() {
      if (typeof errorMessage === 'string') {
        return (
          <ErrorModal message={errorMessage}/>
        );
      }
    };

    return (
      <div>
        <h1 className="text-center page-title">Get Weather</h1>
        <WeatherForm onSearchLocation={this.handleSearchLocation}/>
        {renderMessage()}
        {renderError()}
      </div>
    );
  }
});

module.exports = Weather;
