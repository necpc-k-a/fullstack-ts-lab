import React from 'react';
import { User } from '@shared/types';

interface UserListProps {
  users: User[];
  onDeleteUser: (id: number) => Promise<void>;
}

export const UserList: React.FC<UserListProps> = ({ users, onDeleteUser }) => {
  return (
    <div>
      <h2>ユーザー一覧</h2>
      {users.length === 0 ? (
        <p>ユーザが登録されていません。</p>
      ) : (
        <ul>
          {users.map((u) => (
            <li key={u.id} style={{ marginBottom: '8px' }}>
              {u.name} ({u.email}){' '}
              <button
                onClick={() => onDeleteUser(u.id)}
                style={{ marginLeft: '10px', color: 'red' }}
              >
                削除
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};