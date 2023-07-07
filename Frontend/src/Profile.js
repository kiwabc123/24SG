import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Profile.css';
function Profile() {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    // Fetch profile data from the API based on the ID
    axios.get(`http://localhost:3001/api/Users/${id}`)
      .then(response => {
        const profileData = response.data;
        console.log(profileData)
        setProfile(profileData.data);
      })
      .catch(error => {
        console.error('Failed to fetch profile data:', error);
      });
  }, [id]);

  if (!profile) {
    return <div>Loading profile data...</div>;
  }

  return (
    <div className="profile-container"> {/* Apply a CSS class to the container div */}
      <h2 className="profile-title">Profile Page</h2> {/* Apply a CSS class to the title heading */}
      <p className="profile-id">Profile ID: {id}</p> {/* Apply a CSS class to the ID paragraph */}
      <div className="profile-info">
        <div className="profile-avatar">
          <img src={profile.avatarUrl} alt="Avatar" className="avatar-image" /> {/* Apply a CSS class to the avatar image */}
        </div>
        <div className="profile-details">
          <p className="profile-name">Name: {profile.name}</p> {/* Apply a CSS class to the name paragraph */}
          <p className="profile-email">Email: {profile.email}</p> {/* Apply a CSS class to the email paragraph */}
          {/* Add additional profile information and components */}
        </div>
      </div>
    </div>
  );
}

export default Profile;



