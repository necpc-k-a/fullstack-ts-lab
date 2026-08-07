import React, { useState, useEffect } from 'react';
import { User, CreateUserDto } from '@shared/types'; // 共通型のインポート

export default function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  // バックエンドAPIのURL
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8081';
  const API_URL = `${API_BASE_URL}/api/users`;

  // 1. READ: ユーザー一覧の取得
  const fetchUsers = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error('データの取得に失敗しました:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // 2. CREATE: ユーザーの新規追加
  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    const newUser: CreateUserDto = { name, email };

    try {
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
      });

      setName('');
      setEmail('');
      fetchUsers(); // 一覧を再取得して画面更新
    } catch (error) {
      console.error('追加に失敗しました:', error);
    }
  };

  // 3. DELETE: ユーザーの削除
  const handleDelete = async (id: number) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      fetchUsers(); // 一覧を再取得して画面更新
    } catch (error) {
      console.error('削除に失敗しました:', error);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>ユーザー管理システム (CRUD)</h1>

      {/* 追加フォーム */}
      <form onSubmit={handleAdd} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="名前"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ marginRight: '10px', padding: '5px' }}
        />
        <input
          type="email"
          placeholder="メールアドレス"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ marginRight: '10px', padding: '5px' }}
        />
        <button type="submit" style={{ padding: '5px 10px' }}>
          追加 (Create)
        </button>
      </form>

      {/* 一覧表示 */}
      <h2>ユーザー一覧 (Read / Delete)</h2>
      <ul>
        {users.map((u) => (
          <li key={u.id} style={{ marginBottom: '8px' }}>
            {u.name} ({u.email}){' '}
            <button
              onClick={() => handleDelete(u.id)}
              style={{ marginLeft: '10px', color: 'red' }}
            >
              削除
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}