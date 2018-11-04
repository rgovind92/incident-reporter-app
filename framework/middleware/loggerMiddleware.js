import { createLogger } from 'redux-logger';
import RNFS from 'react-native-fs';
import config from '../config';
//import { PermissionsAndroid } from 'react-native';
import { noop } from '../util';


// TODO: Request permissions before accessing the file
const path = RNFS.DocumentDirectoryPath + '/ic_' + config.appName + '_log.txt';
RNFS.writeFile(path, '', 'utf8').then(noop).catch(noop);

export default createLogger({
  predicate: (getStore, action) => {
    const type = action.type.split('/')[0];

    if (type !== 'persist') {
      RNFS.appendFile(path, JSON.stringify(action) + '\n', 'utf8')
        .then(() => {
          RNFS.readFile(path)
            .then(noop)
            .catch(noop);
        })
        .catch(noop);
    }
    return true;
  }
});