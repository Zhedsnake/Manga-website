# Manga.me

## Описание


> Это приложение для чтения и просмотра пользователями манги, ранобэ и аниме. 
> 
> Пример подобных сайтов: https://desu.me/


## Установка


1. Клонируйте репозиторий:

    ```bash
    git clone https://github.com/Zhedsnake/poizon-api_test
    ```

2. Установка зависимостей в client и server:

    ```bash
    cd server &&\
    npm i &&\
    cd ../ &&\
    cd client &&\
    npm i 
    ```
   
## Способы запуска локально

### Docker

#### Для разработки

1. Воспользуйтесь командой в корне проекта для разработки:

    ```bash
    docker-compose -f docker-compose.dev.yml up -d
    ```
2. Перейдите в `http://localhost:4000` в вашем веб-браузере.

#### Для тестирований

1. Воспользуйтесь командой в корне проекта для тестирования:

    ```bash
    docker-compose -f docker-compose.test-client.yml up -d
    ```

### Node.js 

> **Примечание:** Не рекомендуется запускать без Docker, так как разработка происходит под Docker. Однако, вы можете запустить проект в режиме разработки, если необходимо.


1. Перейдите в каталог server и запустите его в режиме разработчика:

    ```bash
    cd server &&\
    npm run dev
    ```
   
2. Перейдите в каталог client и запустите его в режиме разработчика:

    ```bash
    cd client &&\
    npm run dev
    ```


## Использование

1. Перейдите в `http://localhost:3000` в вашем веб-браузере.

## Стек технологий

- React
- Redux/toolkit
- TypeScript
- Bootstrap
- React Router
- Node
- Express
- MongoDB
- Jest
- @testing-library/react

## Контакты

- **Email:** besedin-2003@internet.ru
- **Telegram:** https://t.me/zhedforeigner
- **GitHub:** https://github.com/Zhedsnake