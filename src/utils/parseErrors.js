/**
 * Importing node modules
 */
import _ from 'lodash';
/**
 * Exporting default function
 */
export default function(errors) {
  const result = {};
  _.forEach(errors, (val, key) => {
    result[key] = val.message;
  });

  return result;
}
