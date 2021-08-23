# Zournal-Server

Zournal Server Node API is a TypeScript NodeJs application that provide APIs for working of Zournal-Client application.

## API Reference

---

### User

---

#### Login User

```http
  POST /user/login
```

|   Field    | Example data     |
| :--------: | ---------------- |
|  `email`   | root@zournal.com |
| `password` | root             |

#### Register User

```http
  POST /user
```

|   Field    | Example data     |
| :--------: | ---------------- |
|   `name`   | Root Zournal     |
|  `email`   | root@zournal.com |
| `password` | root             |

## Installation

Run this project using node, follow these guidelines:

```bash
  git clone https://github.com/abhishek-geek/zournal.git
  cd zournal
  cd server
  npm install
```

### Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT` - Any Empty Port for localhost

`MONGODB_URI` - MongoDB connection string

`YOUTUBE_TOKEN` - list of several YouTube API keys separated by ','

#### Example:

```
PORT=5000
MONGODB_URI=<mongo:connection-string>
SECRET=key_for_JSON_Web_Token
```

To run Development server

```bash
  npm run dev
```

Or run using

```bash
  npm start
```

---
