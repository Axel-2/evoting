# E-Voting (React + Pyodie + FastAPI + Redis)

Quellcode meiner Demonstration einer Online-Abstimmung, die im Rahmen meiner Maturaarbeit erstellt wurde

- React => Client
- FastAPi => Python server
- Tailwind => CSS framework
- Pyodide => Python-Code im Browser
- Redis => Datenbank

# Aufbau des Repos

Dieses Repo enthält den Quellcode für das Frontend (React Application) und den Server (FastAPI Server in Python).

/fronted -> Client code (React)

/backend -> Backend code (Fatsapi)


# Die Webseite selbst starten

## Wie man den Server startet (FastAPI)

1. Docker installieren (https://www.docker.com/)
2. Run diese Befehle (macOS):

```
cd backend 
docker compose up -d
```

## Wie man den Client startet (React)

1. Node.js installieren (https://nodejs.org/en)
2. Run diese Befehle (macOS)

```
cd frontend
npm  install
npm run dev
```