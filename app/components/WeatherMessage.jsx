var React = require('react');

var WeatherMessage = (props) => {
  return (
    <h3 className="text-center">It's {props.temp} degrees celcius in {props.location}</h3>
  );
};

module.exports = WeatherMessage;
