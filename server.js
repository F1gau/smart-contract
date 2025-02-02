const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const supabase = require('@supabase/supabase-js');
const profileRoutes = require('./routes/routes');

const app = express();
const supabaseUrl = 'https://ttcejsprccuutdlxqxbk.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR0Y2Vqc3ByY2N1dXRkbHhxeGJrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk4NTAxOTIsImV4cCI6MjA0NTQyNjE5Mn0.N446WOAxzLFZ8lhjHrwvZDN-aKwg4cPUXP54s6UWNAc'; // Замените на ваш ключ Supabase
const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

// Настройка загрузки файлов для аватаров
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Подключаем статические файлы из папки public
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static('uploads'));

// Маршруты профиля
app.use('/profile', profileRoutes);

// Маршрут для загрузки аватара
app.post('/upload-avatar', upload.single('avatar'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'Ошибка загрузки файла' });
  }
  res.json({ message: 'Аватар загружен', filePath: `/uploads/${req.file.filename}` });
});

// Маршрут для авторизации пользователя
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const { data, error } = await supabaseClient.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return res.status(400).json({ message: 'Ошибка авторизации' });
  }

  res.json({ message: 'Авторизация успешна', user: data.user });
});

// Маршрут для регистрации пользователя
app.post('/register', async (req, res) => {
  const { email, password } = req.body;
  const { data, error } = await supabaseClient.auth.signUp({
    email,
    password,
  });

  if (error) {
    return res.status(400).json({ message: 'Ошибка регистрации', error: error.message });
  }

  res.json({ message: 'Регистрация успешна', user: data.user });
});

// Маршруты для HTML-страниц
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'hello.html')));
app.get('/dashboard', (req, res) => res.sendFile(path.join(__dirname, 'public', 'dashboard.html')));
app.get('/login', (req, res) => res.sendFile(path.join(__dirname, 'public', 'login.html')));
app.get('/register', (req, res) => res.sendFile(path.join(__dirname, 'public', 'register.html')));
app.get('/profile', (req, res) => res.sendFile(path.join(__dirname, 'public', 'profile.html')));

// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
