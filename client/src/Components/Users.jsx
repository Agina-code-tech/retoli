import { useState } from 'react';

function Users() {
  const [selectedMonth, setSelectedMonth] = useState('');

  const users = [
    { id: 1, name: 'John', registeredAt: '2026-01-15' },
    { id: 2, name: 'Sarah', registeredAt: '2026-03-10' },
  ];

  const filteredUsers = users.filter((user) => {
    if (!selectedMonth) return true;

    const month = new Date(user.registeredAt).getMonth() + 1;

    return month === Number(selectedMonth);
  });

  return (
    <div>
      <h2>Users</h2>

      <select
        value={selectedMonth}
        onChange={(e) => setSelectedMonth(e.target.value)}
      >
        <option value="">All Months</option>
        <option value="1">January</option>
        <option value="2">February</option>
        <option value="3">March</option>
      </select>

      {filteredUsers.map((user) => (
        <p key={user.id}>
          {user.name} - {user.registeredAt}
        </p>
      ))}
    </div>
  );
}
