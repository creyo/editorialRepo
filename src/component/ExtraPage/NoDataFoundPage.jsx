import React from 'react';

const containerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
};

const messageStyle = {
  fontSize: '24px',
  fontWeight: 'bold',
  color: 'red',
};

function NoDataFoundPage() {
  return (
    <div style={containerStyle}>
      <div>
        <p style={messageStyle}>No data found for this user</p>
      </div>
    </div>
  );
}

export default NoDataFoundPage;
