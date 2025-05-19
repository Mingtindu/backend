import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = 3000;

app.use(express.json()); // To parse JSON in requests

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataPath = path.join(__dirname, 'data', 'users.json');

// Helper: Read users from file
function readUsers() {
  const data = fs.readFileSync(dataPath);
  return JSON.parse(data);
}

// Helper: Write users to file
function writeUsers(users) {
  fs.writeFileSync(dataPath, JSON.stringify(users, null, 2));
}

// GET all users
app.get('/users', (req, res) => {
  const users = readUsers();
  res.json(users);
});

// POST a new user
app.post('/users', (req, res) => {
  const users = readUsers();
  const newUser = {
    id: Date.now(),
    name: req.body.name
  };
  users.push(newUser);
  writeUsers(users);
  res.status(201).json(newUser);
});

// PUT (update) a user
app.put('/users/:id', (req, res) => {
  const users = readUsers();
  const userId = parseInt(req.params.id);
  const userIndex = users.findIndex(u => u.id === userId);

  if (userIndex === -1) {
    return res.status(404).json({ message: 'User not found' });
  }

  users[userIndex].name = req.body.name || users[userIndex].name;
  writeUsers(users);
  res.json(users[userIndex]);
});

// DELETE a user
app.delete('/users/:id', (req, res) => {
  const users = readUsers();
  const userId = parseInt(req.params.id);
  const updatedUsers = users.filter(u => u.id !== userId);

  if (updatedUsers.length === users.length) {
    return res.status(404).json({ message: 'User not found' });
  }

  writeUsers(updatedUsers);
  res.json({ message: 'User deleted successfully' });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
