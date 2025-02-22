# PPDK Frontend

## Installation

1. Clone the repository:

```bash
git clone https://github.com/zyq-m/ppdk-frontend.git
cd ppdk-frontend
```

2. Install

```bash
npm install
```

## Running application

1. Run the app:

```bash
npm run dev
```

2. Deploy

Execute this command one-by-one

```bash
cd var/www/ppdk-front
npm install
cd server
npm run build
sudo systemctl restart nginx
```
