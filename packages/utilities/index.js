const _ = require('lodash');

const formatData = (data) => {
  return _.map(data, item => {
    return {
      ...item,
      formatted: true
    };
  });
};

module.exports = { formatData };