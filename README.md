# Портфоліо контент-креаторки

Це готовий адаптивний сайт на HTML, CSS та JavaScript. Не потрібні npm, збірка або платні сервіси.

## Файли
- `index.html` — структура сторінки
- `style.css` — оформлення та адаптивність
- `script.js` — список проєктів, фільтри та перегляд відео
- `assets/` — папка для фото й обкладинок

## Як додати свої відео
Відкрий `script.js` і знайди масив `projects` на початку файлу. Для кожної роботи зміни:
- `title` — назва відео
- `category` — одна з категорій: `product`, `beauty`, `lifestyle`, `ugc`
- `categoryLabel` — напис на картці
- `description` — короткий опис
- `thumbnail` — шлях до обкладинки, наприклад `assets/project-01.jpg`
- `video` — посилання на відео

Для YouTube використовуй формат вбудовування:
`https://www.youtube.com/embed/VIDEO_ID`

Для прямого MP4:
`assets/video-01.mp4` або повне HTTPS-посилання.

Порада: для великих відео краще використовувати YouTube, Vimeo або інший відеохостинг, а не зберігати MP4 у GitHub.

## Як додати фото на головний екран
Поклади фото в `assets/profile.jpg`. Потім у `index.html` знайди блок `photo-placeholder` і заміни його на:
`<img class="profile-image" src="assets/profile.jpg" alt="Фото контент-креаторки">`

Додай у `style.css`:
`.profile-image{width:100%;height:100%;object-fit:cover}`

## Контакти та соцмережі
У `index.html` знайди `hello@example.com`, Instagram та TikTok і заміни на свої реальні посилання.

## Публікація через Cloudflare
Завантаж усі файли та папку `assets` у корінь GitHub-репозиторію. У Cloudflare Pages вибери цей репозиторій. Для звичайного HTML-сайту:
- Framework preset: `None`
- Build command: порожньо
- Build output directory: `/` (або `.` якщо інтерфейс не приймає `/`)

Після кожного `Commit changes` Cloudflare автоматично оновить сайт.
