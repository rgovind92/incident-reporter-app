import React, { Component, PureComponent } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { IText } from '../../framework/component';
import { memoize } from 'lodash';
import { connect } from 'react-redux';
import { WithTheme, Ripple } from '../../framework/container';
import { incidentSelected } from '../actions';
import { push } from '../../framework/navigation';

class IncidentList extends Component {
  static navigationOptions = () => ({
    headerTitle: 'Incidents'
  });

  render() {
    return (
      <WithTheme>
        {({ colors: { dividerLight }}) =>
          <FlatList
            data={Object.values(this.props.incidents)}
            renderItem={this._renderItem}
            contentContainerStyle={getListStyle(dividerLight)}
            keyExtractor={(item, index) => '' + index}
          />}
      </WithTheme>
    )
  }

  _renderItem = ({ item }) =>
    <IncidentListItem
      incidentName={item.incidentName}
      incidentSelected={this.incidentSelected}
      isSelected={item.incidentName === this.props.selectedIncident} />

  incidentSelected = incidentName => {
    //alert();
    this.props.incidentSelected(incidentName);
    push('IncidentDetails');
  }
}

class IncidentListItem extends PureComponent {
  render() {
    return (
      <WithTheme>
        {({ colors: { primary, divider, dividerDark }}) =>
          <Ripple
            rippleSize={500}
            divider={!this.props.isSelected} 
            style={getItemStyle(
              this.props.isSelected ? primary : divider,
              dividerDark)}
            onPress={this.incidentSelected}>
            <IText divider={!this.props.isSelected}>
              {this.props.incidentName}
            </IText>
          </Ripple>}
      </WithTheme>
    )
  }

  incidentSelected = () => this.props.incidentSelected(this.props.incidentName);
}

const getListStyle = memoize(backgroundColor => StyleSheet.create({
  o: {
    backgroundColor,
    flex: 1
  }
}).o);

const getItemStyle = memoize((backgroundColor, borderBottomColor) => StyleSheet.create({
  o: {
    padding: 16,
    backgroundColor,
    borderBottomWidth: 2,
    borderBottomColor
  }
}).o);

const mapStateToProps = state => ({
  incidents: state.main.incidents,
  selectedIncident: state.main.selectedIncident
});

const mapDispatchToProps = dispatch => ({
  incidentSelected: incidentName => dispatch(incidentSelected(incidentName))
})

export default connect(mapStateToProps, mapDispatchToProps)(IncidentList);