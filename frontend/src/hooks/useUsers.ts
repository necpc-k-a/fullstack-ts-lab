import { useState, useEffect, useCallback } from 'react';
import { User, CreateUserDto, UpdateUserDto } from '@shared/types';
import { ToastType } from '../components/Toast';

export interface ToastState {
  message: string;
  type: ToastType;
}

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  // 処理結果通知用の状態
  const [toast, setToast] = useState<ToastState | null>(null);

  // 処理結果通知表示
  const showToast = useCallback((message: String, type: ToastType = 'success') => {
    setToast({ message, type });
  }, []);
  // 処理結果通知非表示
  const hideToast = useCallback(() => {
    setToast(null);
  }, []);

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
      const errMsg = err instanceof Error ? err.message : '予期せぬエラーが発生しました';
      setError(errMsg);
      console.error(errMsg);
      showToast(errMsg, 'error');
    } finally {
      setLoading(false);
    }
  }, [API_URL, showToast]);

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
      const resNewUser = await res.json();
      setUsers((prev) => [...prev, newUser]);
      setError(null);
      await fetchUsers(); // 一覧を再取得して画面更新
      showToast(`「${resNewUser.name}」さんを追加しました`, 'success');
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : '追加時にエラーが発生しました';
      setError(errMsg);
      console.error(errMsg);
      showToast(errMsg, 'error');
      throw err;
    }
  };

  // 3. DELETE: ユーザーの削除
  const deleteUser = async (id: number) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('ユーザーの削除に失敗しました');
      setUsers((prev) => prev.filter((user) => user.id !== id));
      setError(null);
      await fetchUsers(); // 一覧を再取得して画面更新
      showToast(`ユーザーを削除しました`, 'success');
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : '削除時にエラーが発生しました';
      setError(errMsg);
      console.error(errMsg);
      showToast(errMsg, 'error');
    }
  };

  // 4. UPDATE: ユーザーの更新
  const updateUser = async (id: number, updateUser: UpdateUserDto) => {
    setError(null);
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateUser),
      });
      if (!res.ok) throw new Error('ユーザーの更新に失敗しました');
      const resUpdateUser = await res.json();
      setUsers((prev) => prev.map((u) => (u.id === id ? updateUser : u)));
      setError(null);
      await fetchUsers();
      showToast(`「${resUpdateUser.name}」さんの情報を更新しました`, 'success');
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : '更新時にエラーが発生しました';
      setError(errMsg);
      console.error(errMsg);
      showToast(errMsg, 'error');
      throw err;
    }
  };

  return {
    users,
    loading,
    error,
    toast,
    hideToast,
    addUser,
    deleteUser,
    updateUser,
    refetchUsers: fetchUsers,
  };
};