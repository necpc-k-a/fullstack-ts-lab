import express, { Request, Response } from 'express';
import cors from 'cors';
import { Pool } from 'pg';
import { User, CreateUserDto, UpdateUserDto } from '@shared/types';

const app = express();
app.use(cors());
app.use(express.json());

// PostgreSQLへの接続
const pool = new Pool({
  // Docker-Composeで設定した環境変数を使用して接続情報を取得
  connectionString: process.env.DATABASE_URL
});

// 1. READ (一覧取得)
app.get('/api/users', async (req: Request, res: Response<User[] | { error: string }>) => {
  try {
    const result = await pool.query<User>('SELECT * FROM users ORDER BY id ASC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'DB Error' });
  }
});

// 2. CREATE (追加)
app.post('/api/users', async (req: Request<{}, {}, CreateUserDto>, res: Response<User | { error: string }>) => {
  // CREATE時は id がまだ存在しないため CreateUserDto を使用
  const { name, email } = req.body;
  try {
    const result = await pool.query<User>(
      'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
      [name, email]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'DB Error' });
  }
});

// 3. UPDATE (更新)
app.put('/api/users/:id', async (req: Request<{ id: string }, {}, UpdateUserDto>, res: Response<User | { error: string }>) => {
  const id = parseInt(req.params.id);
  const { name, email } = req.body;
  try {
    const result = await pool.query<User>(
      'UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *',
      [name, email, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'DB Error' });
  }
});

// 4. DELETE (削除)
app.delete('/api/users/:id', async (req: Request<{ id: string }>, res: Response) => {
  const id = parseInt(req.params.id);
  try {
    await pool.query('DELETE FROM users WHERE id = $1', [id]);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'DB Error' });
  }
});

app.listen(3000, '0.0.0.0', () => {
  console.log('Server running on http://0.0.0.0:3000');
});