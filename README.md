# 🎯 Taskify - A Modern Trello Clone

![Taskify Banner](./public/logo.svg)

A powerful, modern Trello clone built with Next.js, featuring a sleek UI and robust functionality for task management. Designed to help teams collaborate efficiently and manage projects seamlessly.

## ✨ Features

- 📋 **Dynamic Board Creation**: Create and manage multiple boards for different projects
- 📱 **Responsive Design**: Works seamlessly across desktop, tablet, and mobile devices
- 🔄 **Real-time Updates**: Instantly sync changes across all users
- 🎨 **Customizable Lists**: Create, edit, and reorder lists within boards
- 🎯 **Drag & Drop**: Intuitive drag and drop interface for cards and lists
- 👥 **Multi-Organization Support**: Manage different teams and workspaces
- 🔐 **Authentication**: Secure authentication system using Clerk
- 🌐 **Internationalization**: Support for multiple languages
- 🎨 **Modern UI**: Built with Tailwind CSS and Shadcn components

## 🚀 Tech Stack

- [Next.js 14](https://nextjs.org/) - React Framework
- [Bun](https://bun.sh/) - Package Manager
- [Prisma](https://www.prisma.io/) - Database ORM
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Clerk](https://clerk.dev/) - Authentication
- [Shadcn/ui](https://ui.shadcn.com/) - UI Components
- [React Query](https://tanstack.com/query/latest) - Server State Management
- [Zustand](https://github.com/pmndrs/zustand) - Client State Management

## 🛠️ Installation

1. Clone the repository:

```bash
git clone https://github.com/AdanSerrano/trello-clone.git
```

2. Install dependencies:

```bash
bun install
```

3. Set up environment variables:

```bash
cp .env.example .env
```

4. Configure your environment variables:

```env
DATABASE_URL=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=
NEXT_PUBLIC_CLERK_SIGN_UP_URL=
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=
```

5. Run database migrations:

```bash
bunx prisma generate or bun prisma generate
bunx prisma db push or bun prisma db push
```

6. Start the development server:

```bash
bun run dev
```

## 📦 Project Structure

```
taskify/
├── actions/          # Server action of next js 14 directory
├── app/              # Next.js app directory
├── components/       # Reusable UI components
├── lib/              # Utility functions and configurations
├── hooks/            # Custom React hooks
├── prisma/           # Database schema and migrations
├── public/           # Static assets
├── types/            # TypeScript type definitions
└── config/            # Configuration METADATA
```

## 🌟 Key Features Explained

### Organizations and Boards

- Create multiple organizations
- Manage boards within organizations
- Invite team members
- Set permissions and roles with clerk

### Lists and Cards

- Create unlimited lists
- Add cards with rich descriptions
- Drag and drop functionality
- Activity logging

## 🙏 Acknowledgments

- Inspired by [Trello](https://trello.com)
- UI components from [Shadcn/ui](https://ui.shadcn.com/)
- Authentication by [Clerk](https://clerk.dev/)
- Prisma ORM from [Prisma](https://www.prisma.io/)
- Unsplash manager to image select to board [Unsplash](https://unsplash.com/)

## 📧 Contact

Your Name - [@AdanSerrano](https://github.com/AdanSerrano)

Project Link: [https://github.com/AdanSerrano/trello-clone.git](https://github.com/AdanSerrano/trello-clone.git)

---

### 📱 Direct Contact

- **Email:** adanu0503@gmail.com
- **Phone:** +507 6195 - 6454
- **Location:** Panamá, Ciudad de Panamá

### 💼 Professional Profiles

- **GitHub:** [@AdanSerrano](https://github.com/AdanSerrano)
- **LinkedIn:** [Adán Serrano - Software Enginner](https://www.linkedin.com/in/ad%C3%A1n-serrano-98712120b/)
- **Portfolio:** Soon...

---

<p align="center">Built with ❤️ using Next.js and Bun</p>
