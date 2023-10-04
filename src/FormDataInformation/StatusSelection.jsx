import React, { useEffect, useState } from 'react';
import supabase from '../config/supabase';

const customStyles = {
  container: {
    display: 'flex',
    width: '300px', // Adjust the width as needed
    borderRadius: '4px',
    borderColor: '#ccc',
    overflow: 'hidden',
  },
  option: {
    flex: '1',
    padding: '8px',
    cursor: 'pointer',
    textAlign: 'center',
    borderRight: '1px solid #ccc',
    backgroundColor: 'white',
  },
  selectedOption: {
    backgroundColor: '#007bff',
    color: 'white',
  },
};

function StatusSelection({ selectedStatusId, onStatusChange }) {
  const [statusOptions, setStatusOptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStatusOptions() {
      try {
        const { data, error } = await supabase.from('articlestatus').select('*');
        if (error) {
          throw error;
        }

        setStatusOptions(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching status options:', error);
        // Handle error as needed
      }
    }

    fetchStatusOptions();
  }, []);

  return (
    <div style={customStyles.container}>
      {loading ? (
        <div>Loading...</div>
      ) : (
        statusOptions.map((option) => (
          <div
            key={option.status_id}
            onClick={() => onStatusChange(option.status_id)}
            style={{
              ...customStyles.option,
              ...(selectedStatusId === option.status_id
                ? customStyles.selectedOption
                : {}),
            }}
          >
            {option.status_name}
          </div>
        ))
      )}
    </div>
  );
}

export default StatusSelection;
