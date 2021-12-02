import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MyComponent extends Component {
  static defaultProps = {
    name: '기본 이름',
  };
  static propTypes = {
    name: PropTypes.string,
    favoriteNumber: PropTypes.number.isRequired,
  };

  render() {
    const { name, favoriteNumber, children } = this.props;
    return (
      <div>
        Hello. My name is {name}. <br />
        children value {children}
        <br />
        My favorite number is {favoriteNumber}.
      </div>
    );
  }
}

export default MyComponent;
