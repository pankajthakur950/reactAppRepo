import React from 'react';

function UserHeader(props) {
  console.log("UserHeader"+props.userId);
    
  return (
  <h4>Header</h4>
  );
}

export default React.memo(UserHeader);
