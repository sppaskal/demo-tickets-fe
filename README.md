# Demo Tickets Front-End

A React + Vite front-end for browsing events and purchasing tickets, integrated with the `demo-tickets-api` back-end (https://github.com/sppaskal/demo-tickets-api). This project runs in Docker, serving the application at `http://localhost:5173`.

## Overview

This front-end provides a user interface for logging in, viewing events, and managing tickets. It communicates with the `demo-tickets-api` back-end via API calls.

## Prerequisites

- Docker and Docker Compose installed:
  - Windows/Mac: [Docker Desktop](https://www.docker.com/products/docker-desktop/) with WSL 2 enabled (Windows).
  - Linux: [Docker](https://docs.docker.com/engine/install/) and [Docker Compose](https://docs.docker.com/compose/install/).
- Git installed.
- `demo-tickets-api` repository cloned (see below).

## Setup Instructions

1. **Clone the Back-End Repository**

   The front-end requires the `demo-tickets-api` back-end:

   ```bash
   git clone https://github.com/sppaskal/demo-tickets-api.git
   ```

2. **Clone the Front-End Repository**

   Clone this repository into a sibling directory:

   ```bash
   git clone https://github.com/sppaskal/demo-tickets-fe.git
   ```

   Directory structure:
   ```
   ├── demo-tickets-api/
   ├── demo-tickets-fe/
   ```

3. **Run Both Applications**

   Start the back-end and front-end services:

   ```bash
   cd demo-tickets-api
   docker-compose up --build
   ```

   - Back-end API: `http://localhost:3000`
   - Front-end: `http://localhost:5173`

4. **Access the Application**

   - Open `http://localhost:5173/login` in your browser.
   - Log in with `alice@example.com` (seeded in the back-end).
   - Redirects to `http://localhost:5173/home` after login.

## Stopping the Application

From `demo-tickets-api`:

```bash
docker-compose down
```

## Notes

- See `demo-tickets-api` README for back-end setup details.
