export default menuCode => {
  switch (menuCode) {
    case 'MOB010':
      return {
        key: 'Map',
        id: 'Map',
        icon: 'list'
      };
    case 'MOB011':
      return {
        key: 'Incidents',
        icon: 'chevron-left',
        id: 'Incidents'
      };
    case 'MOB012':
      return {
        key: 'Incident Map',
        icon: 'chevron-left',
        id: 'IncidentMap'
      };
    case 'MOB013':
      return {
        key: 'Profile',
        id: 'Profile',
        icon: 'credit-card'
      };
    case 'MOB014':
      return {
        key: 'Switch Theme',
        id: 'SwitchTheme',
        icon: 'braille'
      };
  }
};
