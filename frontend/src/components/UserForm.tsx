import React, { useState, useId } from 'react';
import { CreateUserDto } from '@shared/types';

interface UserFormProps {
  onAddUser: (user: CreateUserDto) => Promise<void>;
}

interface FormErrors {
  name?: string;
  email?: string;
}

export const UserForm: React.FC<UserFormProps> = ({ onAddUser }) => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const nameInputId = useId();
  const emailInputId = useId();

  // 入力チェック用ロジック
  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!name.trim()) {
      newErrors.name = '名前を入力してください';
    }

    if (!email.trim()) {
      newErrors.email = 'メールアドレスを入力してください';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = '有効なメールアドレス形式で入力してください';
    }

    setErrors(newErrors);
    // エラーオブジェクトのキーが0個であればバリデーション通過
    return Object.keys(newErrors).length === 0;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // バリデーション実行
    if (!validate()) return;

    try {
      setIsSubmitting(true);
      await onAddUser({ name, email });
      // 成功したら入力欄とエラーをクリア
      setName('');
      setEmail('');
      setErrors({});
    } catch (err) {
      // 親側のエラーハンドリングに委ねる（必要に応じてここにも処理を追加可能）
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 mb-8">
      <h2 className="text-lg font-semibold text-slate-800 mb-4">新規ユーザー登録</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor={nameInputId} className="block text-sm font-medium text-slate-600 mb-1">名前</label>
          <input
            id={nameInputId}
            type="text"
            placeholder="名前"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
            }}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${errors.name
              ? 'border-red-500 focus:ring-red-200'
              : 'border-slate-300 focus:ring-blue-500 focus:border-transparent'
              }`
            }
          />
          {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor={emailInputId} className="block text-sm font-medium text-slate-600 mb-1">メールアドレス</label>
          <input
            id={emailInputId}
            type="email"
            placeholder="メールアドレス"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
            }}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${errors.email
              ? 'border-red-500 focus:ring-red-200'
              : 'border-slate-300 focus:ring-blue-500 focus:border-transparent'
              }`
            }
          />
          {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
        </div>
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full md:w-auto px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors">
        {isSubmitting ? '追加中...' : '追加'}
      </button>
    </form>
  );
};