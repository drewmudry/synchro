interface UserDetails {
  user_id: number;
  first_name: string;
  last_name: string;
  profile_pic: string;
  Birthdate: string;
  Department: string;
  Title: string;
  reports_to: string;
}

const UserPage = async ({ params }: { params: { userid: string } }) => {
  const { userid } = params;
  const res = await fetch(`http://127.0.0.1:8000/users/${userid}`);
  const user: UserDetails = await res.json();

  return (
    <div>
      <h1>{user.first_name} {user.last_name}</h1>
      <img src={user.profile_pic} alt="Profile" />
      <p>Birthdate: {user.Birthdate}</p>
      <p>Department: {user.Department}</p>
      <p>Title: {user.Title}</p>
      <p>Reports to: {user.reports_to}</p>
    </div>
  );
};

export default UserPage;