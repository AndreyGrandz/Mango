# Mango-Shopify

1. Клоним сборку
2. Устанавливаем @shopackify/mango, подробнее по ссылке: https://github.com/raylway/mango
4. Устанавливаем модуля в терминале проекта (комманда npm i). Для этого нужно установить изначально Node.js. Link: https://nodejs.org/uk/
5. Изменить конфиг под свой (config.yml) development: password: 'your_password' theme_id: "theme_id" store: "store_link"
6. Качаем все файлы с темы командой - mango download
7. Запускаем вочер командой mango watch

После скачивания всех файлов с темы (mango download) они попадут в shop/dist . нам нужно скопировать все папки с неё и добавить в папку shop/src.
Работаем всегда с папкой shop/src. Всё что будет изменено в ней, компилируется в папку shop/dist и её уже вочит mango watch.
Стили и скрипты пишем в папке shop/src/dev.
