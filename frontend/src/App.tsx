import { Header } from './components/Header';
import { UserForm } from './components/UserForm';
import { UserList } from './components/UserList';
import { useUsers } from './hooks/useUsers';

export default function App() {

  const { users, loading, error, addUser, deleteUser } = useUsers();

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <Header title="ユーザー管理システム（CRUD）" />
      {error && (
        <div style={{ color: 'red', marginBottom: '15px' }}>
          エラー: {error}
        </div>
      )}
      <UserForm onAddUser={addUser} />

      {loading ? (
        <p>読み込み中...</p>
      ) : (
        <UserList users={users} onDeleteUser={deleteUser} />
      )}
    </div>
  );
}