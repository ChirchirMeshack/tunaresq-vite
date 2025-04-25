# TunaResQ Frontend
TunaResQ is a platform connecting those in need with those who can help, creating a circular giving economy for Africans to support each other through fundraising, donations, and volunteering.

## 🛠️ Tech Stack

- **Frontend**:
  - [Next.js](https://nextjs.org/) - React framework for server-rendered applications
  - [React](https://reactjs.org/) - JavaScript library for building user interfaces
  - [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript
  - [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework

- **State Management**:
  - [Zustand](https://github.com/pmndrs/zustand) - Lightweight state management

- **Form Handling**:
  - [React Hook Form](https://react-hook-form.com/) - Form validation and handling
  - [Yup](https://github.com/jquense/yup) - Schema validation

- **Development Tools**:
  - [ESLint](https://eslint.org/) - JavaScript linting
  - [Prettier](https://prettier.io/) - Code formatting

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18.0.0 or higher)
- [npm](https://www.npmjs.com/) (v8.0.0 or higher) or [yarn](https://yarnpkg.com/) (v1.22.0 or higher) or [pnpm](https://pnpm.io/) (v7.0.0 or higher)
- [Git](https://git-scm.com/)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/kipkirui88/tunaresq_fe.git
cd tunaresq_fe
```
2. Install dependencies:

```bash
# Using npm
npm install

# Using yarn
yarn install

# Using pnpm
pnpm install
```

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```plaintext
# App
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Authentication (for future implementation)
# AUTH_SECRET=your-auth-secret
# NEXTAUTH_URL=http://localhost:3000

```

## 💻 Development

### Running the Project

To start the development server:

```shellscript
# Using npm
npm run dev

# Using yarn
yarn dev

# Using pnpm
pnpm dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

### Project Structure

```plaintext
tunaresq_fe/
├── app/                  # Next.js app directory
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Home page
│   └── globals.css       # Global styles
├── components/           # React components
│   ├── ui/               # UI components (shadcn/ui)
│   └── ...               # Feature components
├── store/                # Zustand store
│   └── waitlist-store.ts # Waitlist state management
├── public/               # Static assets
├── .env.local            # Environment variables (create this)
├── next.config.js        # Next.js configuration
├── tailwind.config.ts    # Tailwind CSS configuration
├── tsconfig.json         # TypeScript configuration
└── package.json          # Project dependencies and scripts
```
## 👥 Contributing

We welcome contributions from the community! Please read our [Contributing Guidelines](CONTRIBUTING.md) for details on how to submit pull requests, report issues, and contribute to the project.