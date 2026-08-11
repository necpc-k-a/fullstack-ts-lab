import { Header } from './components/Header';
import { UserForm } from './components/UserForm';
import { UserList } from './components/UserList';
import { Toast } from './components/Toast';
import { useUsers } from './hooks/useUsers';

export default function App() {

  const { users, loading, error, toast, hideToast, addUser, deleteUser, updateUser } = useUsers();

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <Toast
        message={toast?.message ?? null}
        type={toast?.type}
        onClose={hideToast}
      />
      <Header title="ユーザー管理システム（CRUD）" />
      <main className="max-w-4xl mx-auto px-4 pb-12">
        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-200 text-red-700 rounded-md text-sm">
            エラー: {error}
          </div>
        )}
        <UserForm onAddUser={addUser} />

        {loading ? (
          <div className="text-center py-8 text-slate-500">読み込み中...</div>
        ) : (
          <UserList users={users} onDeleteUser={deleteUser} onUpdateUser={updateUser} />
        )}
      </main>
    </div>
  );
}