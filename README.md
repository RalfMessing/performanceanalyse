# Conduit – RealWorld Example App

> Bachelorarbeit von **Ralf Messing** an der Johannes Kepler Universität Linz (JKU)

Dieses Repository enthält die modifizierte [RealWorld](https://realworld.show)-Referenzanwendung **Conduit** – eine Medium-ähnliche Blogging-Plattform, die als Grundlage für eine Performanceanalyse im Rahmen der Bachelorarbeit dient.

Das Ziel ist es, gezielt verbreitete **Anti-Patterns** einzuführen, deren Auswirkungen auf die Performance zu messen und anschließend Optimierungen vorzunehmen und zu evaluieren.

---

## Projektstruktur

```
conduit/
├── frontend/   # Angular 20 – SPA-Frontend
└── backend/    # Spring Boot 3 + Java 21 – REST-API
```

### Frontend

Basiert auf [angular-realworld-example-app](https://github.com/realworld-apps/angular-realworld-example-app) (MIT-Lizenz).
Pre-Angular 21 Upgrade Commit 766c1a7c9f9f2cbd993c1aa56b9fb66482dc2104 

- Angular 20 mit Zone.js
- JWT-Authentifizierung über localStorage
- Lazy-loaded Routes

```bash
cd frontend
bun run start        # Dev-Server auf http://localhost:4200
bun run build        # Production Build
bun run test         # Unit-Tests (Vitest)
bun run test:e2e     # E2E-Tests (Playwright)
```

### Backend

Basiert auf [realworld-java21-springboot3](https://github.com/1chz/realworld-java21-springboot3) (MIT-Lizenz).

- Spring Boot 3, Java 21, H2 In-Memory-Datenbank
- Hexagonale Architektur (Ports & Adapters)
- JWT-Auth via Spring OAuth2 Resource Server
- Virtuelle Threads (`spring.threads.virtual.enabled=true`)

```bash
cd backend
./gradlew :realworld:bootRun   # API-Server auf http://localhost:8080
./gradlew test                 # Alle Tests ausführen
./gradlew spotlessApply        # Code formatieren
```

---

## Lokales Setup

**Voraussetzungen:**
- [Bun](https://bun.sh/docs/installation) (für das Frontend)
- JDK 21 (für das Backend)

```bash
# Repository klonen
git clone <repo-url>
cd conduit

# Frontend starten
cd frontend && bun install && bun run start

# Backend starten (in einem separaten Terminal)
cd backend && ./gradlew :realworld:bootRun
```

Das Frontend läuft auf `http://localhost:4200` und kommuniziert mit dem Backend auf `http://localhost:8080`.

---

## Funktionsumfang

| Feature            | Beschreibung                                          |
| ------------------ | ----------------------------------------------------- |
| Authentifizierung | Registrierung, Login, Logout via JWT |
| Artikel | Erstellen, Lesen, Bearbeiten, Löschen (CRUD) |
| Kommentare | Erstellen und Löschen von Kommentaren |
| Feed | Globaler Feed, persönlicher Feed, Tag-Filter |
| Soziale Features | Artikel favorisieren, Autoren folgen |
| Profil | Profilseite mit eigenen und favorisierten Artikeln |

---

## Lizenz

- **Frontend-Code**: [MIT License](frontend/LICENSE)
- **Backend-Code**: [MIT License](backend/LICENSE)
- Modifikationen im Rahmen der Bachelorarbeit von Ralf Messing, JKU Linz, 2025/2026
