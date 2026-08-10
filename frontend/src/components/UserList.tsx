import React from 'react';
import { User } from '@shared/types';

interface UserListProps {
  users: User[];
  onDeleteUser: (id: number) => Promise<void>;
}

export const UserList: React.FC<UserListProps> = ({ users, onDeleteUser }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-4 bg-slate-50 border-b border-slate-200">
        <h2 className="text-lg font-semibold text-slate-800">ユーザー一覧</h2>
      </div>
      {users.length === 0 ? (
        <p className="p-6 text-center text-slate-500">ユーザが登録されていません。</p>
      ) : (
        <ul className="divide-y divide-slate-200">
          {users.map((u) => (
            <li key={u.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
              <span className="font-medium text-slate-900">{u.name}</span>
              <span className="text-sm text-slate-500">{u.email}</span>
              <button
                onClick={() => onDeleteUser(u.id)}
                className="px-3 py-1 text-sm bg-red-50 hover:bg-red-100 text-red-600 font-medium rounded transition-colors"
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