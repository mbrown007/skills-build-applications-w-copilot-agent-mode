# OctoFit Tracker Frontend

React 19 presentation tier for the OctoFit Tracker multi-tier application.

## Environment

Define `VITE_CODESPACE_NAME` in `.env.local` when running in GitHub Codespaces:

```bash
VITE_CODESPACE_NAME=your-codespace-name
```

When `VITE_CODESPACE_NAME` is set, API requests use:

```text
https://$VITE_CODESPACE_NAME-8000.app.github.dev/api/[component]/
```

When `VITE_CODESPACE_NAME` is unset, API requests safely fall back to:

```text
http://localhost:8000/api/[component]/
```
