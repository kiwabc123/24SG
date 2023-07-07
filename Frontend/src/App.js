import React, { useState, useEffect } from 'react';
import DataTable, { createTheme } from 'react-data-table-component';
import './App.css';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '400px', // Set the width of the modal content
    padding: '20px', // Add padding to the modal content
    borderRadius: '8px', // Add border radius to the modal content
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)', // Add a box shadow to the modal content
    backgroundColor: '#fff', // Set the background color of the modal content
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Set the background color of the modal overlay
  },
};



const columns = [
  {
    name: 'Avatar',
    cell: row => <img src={row.avatarUrl} alt="Avatar" className="avatar-image round" />,
    sortable: true,
  },
  {
    name: 'Name',
    selector: row => row.name,
    sortable: true,
  },
  {
    name: 'Age',
    selector: row => row.age,
    sortable: true,
  },
  {
    name: 'Email',
    selector: row => row.email,
    sortable: true,
  },


];


// createTheme creates a new theme named solarized that overrides the build in dark theme
createTheme('solarized', {
  text: {
    primary: '#268bd2',
    secondary: '#2aa198',
  },
  background: {
    default: '#002b36',
  },
  context: {
    background: '#cb4b16',
    text: '#FFFFFF',
  },
  divider: {
    default: '#073642',
  },

}, 'dark');

function App() {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const openModal = (userId) => {
    setUpdateId(userId);
    setIsUpdateModalOpen(true);
  };
  const [updateId, setUpdateId] = useState('');
  const [updateName, setUpdateName] = useState('');
  const [updateEmail, setUpdateEmail] = useState('');
  const [updateAge, setUpdateAge] = useState('');
  const [updateAvatarUrl, setUpdateAvatarUrl] = useState('');

  const handleUpdateNameChange = (e) => {
    setUpdateName(e.target.value);
  };

  const handleUpdateEmailChange = (e) => {
    setUpdateEmail(e.target.value);
  };

  const handleUpdateAgeChange = (e) => {
    setUpdateAge(e.target.value);
  };

  const handleUpdateAvatarUrlChange = (e) => {
    setUpdateAvatarUrl(e.target.value);
  };

  const handleUpdateUser = async (e) => {
    const parsedAge = parseInt(updateAge, 10);
    // console.log(updateName, updateEmail, typeof updateAge, updateAvatarUrl, updateId, typeof parsedAge);
    const name = updateName
    const email = updateEmail

    const avturl = updateAvatarUrl
    try {
      const response = await axios.put(`http://localhost:3001/api/Users/${updateId}`,
        {

          "name": name,
          "age": parsedAge,
          "email": email,
          "avatarUrl": avturl
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        });
      // Reset the form fields
      setUpdateName('');
      setUpdateEmail('');
      setUpdateAge('');
      setUpdateAvatarUrl('');


      setIsUpdateModalOpen(false);

      return response.data; // Return the response data if needed
    } catch (error) {
      console.error('Failed to update user:', error);
      // Handle the error as needed (e.g., show error message)
      throw error; // Throw the error if needed
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/Users/');
      const users = response.data;
      setData(users);
      setFilteredData(users);
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    }
  };

  const history = useHistory();

  const handleRowClicked = (row) => {
    history.push(`/profile/${row._id}`);
  };

  const handleSearch = async (event) => {
    const value = event.target.value;
    setSearchText(value);

    try {
      const response = await axios.get(`http://localhost:3001/api/Users/?q=${value}`);
      const users = response.data;
      setFilteredData(users);
    } catch (error) {
      console.error('Failed to fetch filtered user data:', error);
      setFilteredData([]);
    }
  };

  const handleDelete = async (id) => {

    try {
      await axios.delete(`http://localhost:3001/api/Users/${id}`);
      const updatedData = data.filter(item => item._id !== id);
      setFilteredData(updatedData);
      alert('User deleted successfully');
    } catch (error) {
      console.error('Failed to delete user:', error);
    }
  };

  return (
    <div className="container">
      <div className="content">
        <div className="search-bar">
          <input
            type="text"
            value={searchText}
            onChange={handleSearch}
            placeholder="Searching..."
            
          />
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
        </div>

        

        <Modal
          isOpen={isUpdateModalOpen}
          onRequestClose={() => setIsUpdateModalOpen(false)}
          contentLabel="Update User Modal"
          style={customStyles}
          ariaHideApp={false}
        >
          <div className="update-modal-content">
            <h2 className="modal-title">Update User</h2>
            <form onSubmit={handleUpdateUser}>
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  value={updateName}
                  onChange={handleUpdateNameChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  value={updateEmail}
                  onChange={handleUpdateEmailChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="age">Age:</label>
                <input
                  type="number"
                  id="age"
                  value={updateAge}
                  onChange={handleUpdateAgeChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="avatarUrl">Avatar URL:</label>
                <input
                  type="text"
                  id="avatarUrl"
                  value={updateAvatarUrl}
                  onChange={handleUpdateAvatarUrlChange}
                />
              </div>

              <div className="button-group">
                <button type="submit" className="update-button">Update</button>
                <button onClick={() => setIsUpdateModalOpen(false)} className="close-button">Close</button>
              </div>
            </form>
          </div>
        </Modal>

        <DataTable
          columns={[
            ...columns,
            {
              name: 'Actions',
              cell: row => (
                <div className="button-container">
                  <button className="button" onClick={() => handleDelete(row._id)}>
                    Delete
                  </button>
                  <button className="button" onClick={() => openModal(row._id)}>Update</button>

                </div>
              ),
              ignoreRowClick: true,
              width: '10rem',
              button: true,
            },
          ]}
          theme="solarized"
          data={filteredData}
          onRowClicked={handleRowClicked}
        />
      </div>
    </div>
  );
}

export default App;