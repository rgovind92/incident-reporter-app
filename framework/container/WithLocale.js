import React from 'react';

import LocaleContext from '../app/context/LocaleContext';
import strings from '../config/strings';

const fallback = {
  currentLocale: 'en-US',
  strings,
  switchLocale: () => {}
};

export default props =>
  <LocaleContext.Consumer>
    {(context = fallback) => props.children(context)}
  </LocaleContext.Consumer>;
