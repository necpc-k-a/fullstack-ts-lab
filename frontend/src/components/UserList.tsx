import React, { useState } from 'react';
import { User, UpdateUserDto } from '@shared/types';

interface UserListProps {
  users: User[];
  onDeleteUser: (id: number) => Promise<void>;
  onUpdateUser: (id: number, updateUser: UpdateUserDto) => Promise<void>;
}

export const UserList: React.FC<UserListProps> = ({ users, onDeleteUser, onUpdateUser }) => {

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');

  // 編集モード開始処理
  const handleEditClick = (user: User) => {
    setEditingId(user.id);
    setEditName(user.name);
    setEditEmail(user.email);
  };

  // 編集モードキャンセル処理
  const handleEditCancel = () => {
    setEditingId(null);
    setEditName('');
    setEditEmail('');
  };

  // 保存処理
  const handleEditSave = async (id: number) => {
    if (!editName.trim() || !editEmail.trim()) return;

    const updateUserDto: UpdateUserDto = {
      name: editName.trim(),
      email: editEmail.trim(),
    };
    try {
      await onUpdateUser(id, updateUserDto);
      setEditingId(null);
    } catch (err) {
      // エラー処理はフック側に任せる
    }
  };

  if (users.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-8 text-center text-slate-500">
        ユーザが登録されていません。
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
      {/* ヘッダー部分 */}
      <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-800">ユーザー一覧</h2>
        <span className="text-xs font-medium text-slate-500 bg-slate-200 px-2.5 py-1 rounded-full">
          {users.length} 件
        </span>
      </div>

      {/* カード形式のリスト表示 */}
      <ul className="divide-y divide-slate-100">
        {users.map((user) => {
          const isEditing = editingId === user.id;

          return (
            <li key={user.id} className="p-4 sm:p-6 hover:bg-slate-50/80 transition-colors">
              {isEditing ? (
                /* 編集モード時 */
                <div className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-slate-500 mb-1 font-medium">名前</label>
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="w-full px-3 py-1.5 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="名前"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-500 mb-1 font-medium">メールアドレス</label>
                      <input
                        type="email"
                        value={editEmail}
                        onChange={(e) => setEditEmail(e.target.value)}
                        className="w-full px-3 py-1.5 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="メールアドレス"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end space-x-2 pt-2">
                    <button
                      onClick={() => handleEditSave(user.id)}
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md text-xs font-medium transition-colors"
                    >
                      保存
                    </button>
                    <button
                      onClick={handleEditCancel}
                      className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-md text-xs font-medium transition-colors"
                    >
                      キャンセル
                    </button>
                  </div>
                </div>
              ) : (
                /* 通常表示時 */
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center space-x-4 min-w-0">
                    <div className="min-w-0">
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold text-slate-900 truncate">{user.name}</span>
                      </div>
                      <p className="text-sm text-slate-500 truncate">{user.email}</p>
                    </div>
                  </div>

                  {/* 操作ボタン */}
                  <div className="flex items-center space-x-2 self-end sm:self-center shrink-0">
                    <button
                      onClick={() => handleEditClick(user)}
                      className="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-700 font-medium rounded-md text-xs border border-amber-200 transition-colors"
                    >
                      編集
                    </button>
                    <button
                      onClick={() => onDeleteUser(user.id)}
                      className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 font-medium rounded-md text-xs border border-red-200 transition-colors"
                    >
                      削除
                    </button>
                  </div>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};