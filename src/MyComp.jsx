
import React from 'react';
import ReactDOM from 'react-dom';

function Test() {
  return (
    <div>
      test 2
    </div>
  );
}

// Use this syntax instead of extends React.Component for a stateless function.
function MyComp() {
  return (
    <div>
      test
      <Test />
    </div>
  );
}

ReactDOM.render(<MyComp />, document.getElementById('main'));

export default MyComp;
