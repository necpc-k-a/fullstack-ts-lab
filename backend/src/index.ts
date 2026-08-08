import express, { Request, Response } from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import { User, CreateUserDto, UpdateUserDto } from '@shared/types';

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// 1. READ (一覧取得)
app.get('/api/users', async (req: Request, res: Response<User[] | { error: string }>) => {
  try {
    const users = await prisma.user.findMany({
      orderBy: { id: 'asc' },
    });
    res.json(users);
  } catch (err) {
    console.error('GET /api/users エラー詳細: ', err);
    res.status(500).json({ error: 'DB Error' });
  }
});

// 2. CREATE (追加)
app.post('/api/users', async (req: Request<{}, {}, CreateUserDto>, res: Response<User | { error: string }>) => {
  // CREATE時は id がまだ存在しないため CreateUserDto を使用
  const { name, email } = req.body;
  try {
    const newUser = await prisma.user.create({
      data: { name, email },
    });
    res.status(201).json(newUser);
  } catch (err) {
    console.error('POST /api/users エラー詳細: ', err);
    res.status(500).json({ error: 'DB Error' });
  }
});

// 3. UPDATE (更新)
app.put('/api/users/:id', async (req: Request<{ id: string }, {}, UpdateUserDto>, res: Response<User | { error: string }>) => {
  const id = parseInt(req.params.id);
  const { name, email } = req.body;
  try {
    const updateUser = await prisma.user.update({
      where: { id },
      data: { name, email },
    });
    res.json(updateUser);
  } catch (err) {
    console.error('PUT /api/users/:id エラー詳細: ', err);
    res.status(500).json({ error: 'DB Error' });
  }
});

// 4. DELETE (削除)
app.delete('/api/users/:id', async (req: Request<{ id: string }>, res: Response) => {
  const id = parseInt(req.params.id);
  try {
    await prisma.user.delete({
      where: { id },
    });
    res.status(204).send();
  } catch (err) {
    console.error('DELETE /api/users/:id エラー詳細: ', err);
    res.status(500).json({ error: 'DB Error' });
  }
});

const PORT = 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});