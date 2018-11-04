import React, { Component } from 'react';

const ThemeContext = React.createContext();

class ThemeProvider extends Component {
  constructor(props) {
    super(props);    

    this.state = {
      colors: props.colors,
      updateColor: (key, value) => {
        const colors = { ...this.state.colors };
        colors[key] = value;
        this.setState({
          colors
        });
      },

      borderRadius: 0,
      updateBorderRadius: borderRadius => this.setState({ borderRadius })
    };
  }

  render() {
    return (
      <ThemeContext.Provider value={this.state}>
        {this.props.children}
      </ThemeContext.Provider>
    );
  }
}

export { ThemeProvider };
export default ThemeContext;
