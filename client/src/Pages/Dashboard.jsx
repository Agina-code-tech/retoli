import { useEffect, useState } from 'react';

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch(
          'https://charity-minds-backend.onrender.com/api/v1/users',
        );

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || 'Failed to fetch users');
        }

        if (result.success && Array.isArray(result.data)) {
          setUsers(result.data);
        } else {
          throw new Error(
            'Server response structure does not match documentation.',
          );
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-purple-500">
            Retoli User Dashboard
          </h1>

          <div className="w-24 h-1 bg-purple-500 rounded-full mt-3"></div>

          <p className="text-gray-400 mt-3">
            Manage and monitor registered users
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-900 rounded-2xl p-6 border border-purple-900 shadow-[0_0_20px_rgba(168,85,247,0.12)]">
            <h2 className="text-gray-400 text-sm uppercase tracking-wide">
              Total Users
            </h2>

            <p className="text-5xl font-bold text-white mt-3">{totalUsers}</p>
          </div>

          <div className="bg-gray-900 rounded-2xl p-6 border border-purple-900 shadow-[0_0_20px_rgba(168,85,247,0.12)]">
            <h2 className="text-gray-400 text-sm uppercase tracking-wide">
              Users This Month
            </h2>

            <p className="text-5xl font-bold text-white mt-3">
              {usersThisMonth}
            </p>
          </div>
        </div>

        <div className="mb-6">
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="bg-gray-900 border border-gray-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="">All Months</option>
            <option value="1">January</option>
            <option value="2">February</option>
            <option value="3">March</option>
            <option value="4">April</option>
            <option value="5">May</option>
            <option value="6">June</option>
            <option value="7">July</option>
            <option value="8">August</option>
            <option value="9">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>
        </div>

        <div className="bg-gray-900 rounded-2xl border border-purple-900 overflow-hidden shadow-[0_0_20px_rgba(168,85,247,0.12)]">
          <table className="w-full">
            <thead className="bg-purple-900/40">
              <tr>
                <th className="text-left p-4 text-purple-300">Name</th>

                <th className="text-left p-4 text-purple-300">Email</th>

                <th className="text-left p-4 text-purple-300">
                  Registration Date
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredUsers.map((user) => (
                <tr
                  key={user._id}
                  className="border-t border-gray-800 hover:bg-gray-800 transition"
                >
                  <td className="p-4 text-white">{user.name}</td>

                  <td className="p-4 text-gray-300">{user.email}</td>

                  <td className="p-4 text-gray-300">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredUsers.length === 0 && (
            <div className="p-6 text-center text-gray-400">No users found.</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
