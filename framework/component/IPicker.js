import React, { PureComponent } from 'react';
import { Picker } from 'react-native';

class IPicker extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      value: props.selectedValue
    };
  }

  render() {
    const { input, onValueChange, ...rest } = this.props;

    return (
      <Picker
        selectedValue={this.state.value}
        onValueChange={value => {
          if (input) {
            input.onChange(value);
            onValueChange && onValueChange(value);
          }
          this.setState({ value });
        }}
        {...rest}
      />
    );
  }
}

IPicker.Item = Picker.Item;

export default IPicker;
