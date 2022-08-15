import React from 'react';
import PT from 'prop-types';

const Example = (props) => {
  return (
    <div>
      Example: {props?.count}
    </div>
  );
};

Example.propTypes = {
  count: PT.number.isRequired
};

export default Example;
