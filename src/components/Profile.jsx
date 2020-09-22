import React, { useState, useEffect } from "react";

const Profile = ({ auth }) => {
  const [profile, setProfile] = useState();
  const [error, setError] = useState("");

  useEffect(() => {
    auth.getProfile((profile, err) => {
      setProfile(profile);
      setError(err);
    });
  }, [auth]);

  if (!profile) return null;

  return (
    <div>
      <h1>Profile</h1>
      {error ? (
        <p>{error}</p>
      ) : (
        <>
          <p>{profile.nickname}</p>
          <img
            style={{ maxHeight: 50, maxWidth: 50 }}
            src={profile.picture}
            alt="profile"
          />
          <pre>{JSON.stringify(profile, null, 2)}</pre>
        </>
      )}
    </div>
  );
};

export default Profile;
