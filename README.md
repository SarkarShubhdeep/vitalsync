# VitalsSync

VitalsSync is a modern, high-performance monorepo application for tracking health vitals. It demonstrates a seamless full-stack type-safe architecture using **Bun**, **Fastify**, and **Next.js**.

## 🚀 Features

- **Full-Stack Type Safety**: End-to-end type safety from the Database -> API -> SDK -> Frontend.
- **Zero-Config Database**: Automatically falls back to an **in-memory MongoDB** if no local instance is found. No Docker or local install required to test.
- **Auto-Generated SDK**: The client-side SDK is automatically generated from the backend OpenAPI/Swagger definition.
- **Modern UI**: A clean, "brutalist" aesthetic dashboard built with Next.js 15 and Tailwind CSS.
- **Monorepo Architecture**: Managed efficiently with Bun Workspaces.

## 🛠️ Tech Stack

### **Runtime & Package Manager**
- **[Bun](https://bun.sh/)**: Fast All-in-one JavaScript runtime.

### **Backend (`packages/server`)**
- **[Fastify](https://fastify.dev/)**: High-performance web framework.
- **[TypeBox](https://github.com/sinclairzx81/typebox)**: JSON Schema validation and type inference.
- **[Mongoose](https://mongoosejs.com/)**: MongoDB object modeling.
- **[Swagger / OpenAPI](https://github.com/fastify/fastify-swagger)**: Auto-generated API documentation.
- **[MongoDB Memory Server](https://github.com/nodkz/mongodb-memory-server)**: For zero-config development.

### **Frontend (`packages/web`)**
- **[Next.js 15](https://nextjs.org/)**: React Framework with App Router.
- **[Tailwind CSS](https://tailwindcss.com/)**: Utility-first CSS framework (Customized for sharp corners).
- **TypeScript**: Strict typing.

### **SDK (`packages/sdk`)**
- **[OpenAPI Typescript Codegen](https://github.com/ferdikoomen/openapi-typescript-codegen)**: Generates a strongly-typed fetch client from the Server's Swagger output.

## 🏁 Getting Started

### 1. Install Dependencies
In the root directory:
```bash
bun install
```

### 2. Run Development Servers
You can run the entire stack with a single command from the root:

```bash
bun run dev
```

This will start:
- **Backend API**: `http://localhost:4000` (Documentation at `/documentation`)
- **Frontend App**: `http://localhost:3000`

*Note: If `bun run dev` in the root doesn't suit your workflow, you can run them individually:*

**Backend**:
```bash
cd packages/server
bun run dev
```

**Frontend**:
```bash
cd packages/web
bun run dev
```

## 📦 Project Structure

```
vitalsync/
├── packages/
│   ├── server/      # Fastify Backend + MongoDB
│   ├── web/         # Next.js Frontend
│   └── sdk/         # Shared Auto-generated Client
├── package.json     # Root Monorepo Config
└── task.md          # Project Roadmap
```

## 🔄 Development Workflow

When modifying the Backend API:
1. Update Schema/Routes in `packages/server`.
2. The server will auto-reload.
3. Switch to `packages/sdk` and run `bun run generate` to update the client.
4. The `packages/web` frontend now has access to the updated types and methods.
