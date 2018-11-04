import React, { Component, Fragment } from 'react';
import { StyleSheet } from 'react-native';
import { PopoverController, Popover } from 'react-native-modal-popover';

/* By using this component,
* you agree to hereby surrender all rights to control its visible prop.
* TODO: This component has a rare glitch when shown 
* and hidden immediately. Look for a better component.
*/
export default WrappedComponent =>
  class extends Component {
    render() {
      const { contentStyle, placement, render } = this.props;
      return (
        <PopoverController>
          {({
            openPopover,
            closePopover,
            popoverVisible,
            setPopoverAnchor,
            popoverAnchorRect
          }) => (
            <Fragment>
              <WrappedComponent
                {...this.props}
                ref={setPopoverAnchor}
                onPress={this.onPress.bind(null, openPopover)}
              />
              <Popover
                placement={placement || 'bottom'}
                contentStyle={[styles.content, contentStyle]}
                visible={popoverVisible}
                onClose={closePopover}
                fromRect={popoverAnchorRect}
                supportedOrientations={['portrait']}
              >
                {render ? render() : null}
              </Popover>
            </Fragment>
          )}
        </PopoverController>
      );
    }

    onPress = (openPopover, e) => {
      openPopover(e);
      this.props.onPress && this.props.onPress(e);
    };
  };

const styles = StyleSheet.create({
  content: {
    padding: 16,
    borderRadius: 2
  }
});
