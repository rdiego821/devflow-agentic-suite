# 🚀 DevFlow Agentic Suite

Modular platform for the agentic automation of the **SDLC** (Software Development Life Cycle), designed to integrate Artificial Intelligence capabilities into backend development workflows in **Java / Spring Boot**, local code analysis via **MCP Server (Python)**, and an interactive dashboard built with **React & TypeScript**.

---

## 🏗️ Monorepo Architecture

```text
devflow-agentic-suite/
├── docs/                             # Architecture diagrams and glossary
├── mcp-server-python/                # MCP server for local context and tools
├── spring-boot-generator-engine/     # Java code and JUnit test generator
└── frontend/                         # Dashboard UI in React + Vite
```

## ✨ Key Features
Modular Backend Generation: Dynamically builds production-ready Java Spring Boot components (Entities, Repositories, Services, Controllers, and JUnit 5 tests) following Clean Architecture principles.

Model Context Protocol (MCP) Integration: Exposes local project inspection and code analysis tools to AI assistants (Cursor, Claude Desktop, VS Code) via Python.

Backend-to-MCP Orchestration: Uses Java ProcessBuilder to bridge REST requests directly to local Python automation scripts.

Modern Developer Dashboard: Built with React, Vite, and Tailwind CSS featuring syntax-highlighted code output and instant clipboard utilities.

## 🛠️ Prerequisites & Tech Stack
Java Development Kit (JDK): Version 21+

Python: Version 3.10+ with an active virtual environment

Node.js: Version 18+ & npm

AI Engine: Ollama running locally for code auditing

## 🚀 Quick Start Guide

1. Clone the Repository

```bash
git clone [git@github.com:rdiego821/bid-agent-platform.git](git@github.com:rdiego821/bid-agent-platform.git)
cd devflow-agentic-suite
```

### 🐳 Running with Docker Compose (Recommended)

If you prefer to run the entire suite without installing local dependencies (like Node.js or Maven), you can spin up the containerized stack using Docker:

1. Ensure [Docker Desktop](https://www.docker.com/) is running on your machine.
2. From the root directory of the monorepo, execute:

```bash
docker compose up --build
```

Open your browser and access:

Frontend Dashboard: http://localhost:3000

Spring Boot Backend: http://localhost:8080

To stop the containers, press Ctrl + C or run:

```bash
docker compose down
```
### 🐳 Running without Docker

2. Start the Spring Boot Backend

```bash
cd spring-boot-generator-engine
mvn spring-boot:run
```

3. Start the React Frontend

```bash
cd frontend
npm install
npm run dev
```

4. Configure the Python MCP Server
Activate your virtual environment and verify dependencies inside mcp-server-python/:

```bash
cd mcp-server-python
.venv\Scripts\activate
pip install -r requirements.txt
```

## 🔌 Connecting the MCP Server to AI Clients
To allow AI assistants (like Cursor or Claude Desktop) to inspect your codebase, add the following configuration to your client's MCP settings:
```json
{
  "mcpServers": {
    "devflow-inspector": {
      "command": "C:\\devflow-agentic-suite\\mcp-server-python\\.venv\\Scripts\\python.exe",
      "args": [
        "C:\\devflow-agentic-suite\\mcp-server-python\\app\\main.py"
      ]
    }
  }
}

```

📝 License
Distributed under the MIT License. See LICENSE for more information.

