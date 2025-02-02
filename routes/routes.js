// routes/routes.js

const express = require('express');
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');
const router = express.Router();

// Настройка хранилища для загрузки аватаров
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// Маршрут для обновления профиля пользователя
router.post('/profile/update', async (req, res) => {
  const { newEmail, currentPassword, newPassword } = req.body;

  // Здесь замените на текущий хэш пароля пользователя из базы данных
  const hashedPassword = "$2b$10$hashExample"; 

  // Проверка текущего пароля
  if (currentPassword) {
    const passwordMatch = await bcrypt.compare(currentPassword, hashedPassword);
    if (!passwordMatch) {
      return res.status(400).json({ message: "Неверный текущий пароль" });
    }
  } else {
    return res.status(400).json({ message: "Текущий пароль обязателен" });
  }

  // Хеширование нового пароля (если указан)
  let newHashedPassword;
  if (newPassword) {
    newHashedPassword = await bcrypt.hash(newPassword, 10);
  }

  // Обновление данных пользователя
  const updatedUser = {
    email: newEmail || 'user@example.com',
    password: newHashedPassword || hashedPassword,
  };

  res.json({ message: "Данные обновлены", updatedUser });
});

// Маршрут для загрузки аватара
router.post('/upload-avatar', upload.single('avatar'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'Ошибка при загрузке аватара.' });
  }

  const avatarPath = req.file.path;

  // Обновление аватара пользователя
  res.json({ message: "Аватар обновлен!", avatarPath });
});

// Другие маршруты можно добавлять здесь...

module.exports = router;
