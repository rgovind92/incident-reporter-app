import thunkMiddleWare from 'redux-thunk';
import { navigationMiddleware } from './navigationMiddleware';
import loggerMiddleware from './loggerMiddleware';

export { navigationMiddleware, addListener } from './navigationMiddleware';
export default { navigationMiddleware, thunkMiddleWare, loggerMiddleware };