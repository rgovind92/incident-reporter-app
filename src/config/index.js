import navigation from './navigation';
import menuConfig from './menuConfig';
import strings from './strings';
import sampleresponses from './sampleresponses';
import colors from './colors';

export default {
  navigation,
  debug: null,
  strings,
  mockLatency: 100,
  sampleresponses,
  colors,
  exclude: ['loggerMiddleware'],
  menuConfig
};
