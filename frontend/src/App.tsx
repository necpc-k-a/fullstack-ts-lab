import { Header } from './components/Header';
import { UserForm } from './components/UserForm';
import { UserList } from './components/UserList';
import { useUsers } from './hooks/useUsers';

export default function App() {

  const { users, loading, error, addUser, deleteUser } = useUsers();

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
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
          <UserList users={users} onDeleteUser={deleteUser} />
        )}
      </main>
    </div>
  );
}