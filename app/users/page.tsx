import Link from 'next/link';

interface User {
  user_id: number;
  first_name: string;
  last_name: string;
  profile_pic: string;
}

const UsersPage = async () => {
  const res = await fetch('http://127.0.0.1:8000/users');
  const users: User[] = await res.json();

  return (
    <div className="flex flex-col gap-2">
      {users.map((user) => (
        <Link key={user.user_id} href={`/users/${user.user_id}`}>
          {user.first_name} {user.last_name}
        </Link>
      ))}
    </div>
  );
};

export default UsersPage;