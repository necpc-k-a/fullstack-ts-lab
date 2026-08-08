import { useState, useEffect, useCallback } from 'react';
import { User, CreateUserDto } from '@shared/types';

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // バックエンドAPIのURL
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8081';
  const API_URL = `${API_BASE_URL}/api/users`;

  // 1. READ: ユーザー一覧の取得
  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error('データの取得に失敗しました');
      const data: User[] = await res.json();
      setUsers(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : '予期せぬエラーが発生しました');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [API_URL]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // 2. CREATE: ユーザーの新規追加
  const addUser = async (newUser: CreateUserDto) => {
    setError(null);
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
      });
      if (!res.ok) throw new Error('ユーザーの追加に失敗しました');
      await fetchUsers(); // 一覧を再取得して画面更新
    } catch (err) {
      setError(err instanceof Error ? err.message : '追加時にエラーが発生しました');
      console.error(err);
    }
  };

  // 3. DELETE: ユーザーの削除
  const deleteUser = async (id: number) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('ユーザーの削除に失敗しました');
      await fetchUsers(); // 一覧を再取得して画面更新
    } catch (err) {
      setError(err instanceof Error ? err.message : '削除時にエラーが発生しました');
      console.error(err);
    }
  };

  return {
    users,
    loading,
    error,
    addUser,
    deleteUser,
    refetchUsers: fetchUsers,
  };
};