import { useState } from "react";
import EditProfile from "../../components/user/EditProfile";
import UserProfile from "../../components/user/UserProfile";

const Profile = () => {
  const [editing, setEditing] = useState(false);

  const toggleEditing = () => setEditing(!editing);

  return (
    <div>
      {editing ? (
        <EditProfile toggleEditing={toggleEditing} />
      ) : (
        <UserProfile toggleEditing={toggleEditing} />
      )}
    </div>
  );
};

export default Profile;
