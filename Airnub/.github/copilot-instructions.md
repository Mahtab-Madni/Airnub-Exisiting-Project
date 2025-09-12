# Copilot Instructions for Airnub

## Project Overview

- **Airnub** is a Node.js/Express web application with an MVC-like structure.
- Main directories:
  - `controller/`: Route logic (auth, host, store, error handling)
  - `Models/`: Data models (favorite, home, user)
  - `Routes/`: Express routers for auth, host, and store
  - `utils/`: Utility functions (database, path)
  - `views/`: EJS templates (organized by feature)
  - `public/`: Static assets (CSS)

## Key Patterns & Conventions

- **Controllers**: Each feature (auth, host, store) has a dedicated controller in `controller/`.
- **Routing**: Route files in `Routes/` import controllers and define endpoints. Example: `authRouter.js` uses `authController.js`.
- **Models**: Simple JS files in `Models/` (not using Mongoose/ORM by default).
- **Views**: EJS templates grouped by feature. Shared partials in `views/partials/`.
- **Error Handling**: Centralized in `controller/error.js` and `views/404.ejs`.
- **Static Files**: Served from `public/`.
- **Tailwind CSS**: Configured via `tailwind.config.js` and `output.css`.

## Developer Workflows

- **Start Dev Server**: Use `nodemon` (see `nodemon.json`).
  - Example: `npx nodemon App.js` (from `Airnub/`)
- **Build CSS**: Tailwind output is in `output.css`. Update via Tailwind CLI if needed.
- **Debugging**: Console logs are common; no custom debug tooling.

## Integration Points

- No database or external API integration by default (models are plain JS).
- Add new features by creating a controller, model, route, and EJS view.

## Project-Specific Advice

- Follow the existing folder structure for new features.
- Use EJS partials for shared UI (header, errors, etc.).
- Keep business logic in controllers, not routes.
- Use utility modules for shared logic (see `utils/`).

## Examples

- To add a new store feature:
  1. Create `storeController.js` in `controller/`
  2. Add routes in `storeRouter.js` in `Routes/`
  3. Add views in `views/store/`
  4. Add model in `Models/` if needed

---

For questions or unclear patterns, review similar features or ask for clarification.
