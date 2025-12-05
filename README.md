# supabase-dashboard-template

A beginner-friendly full-stack CRUD template for a personal dashboard where each user can manage their own data. Uses Supabase Auth and row-level security to ensure users only access their own content. Perfect as a foundation for to-do apps, habit trackers, bookmarks, private notes, or any "my data only" project.

## Features

- 🔐 **Authentication** - Email/password authentication with Supabase Auth
- 🔒 **Row-Level Security** - Automatic data isolation per user
- 📱 **Responsive Design** - Works on desktop and mobile devices
- 🌙 **Dark Mode** - Automatic dark mode support
- ⚡ **Real-time Updates** - Live data synchronization using Supabase real-time
- 🎨 **Modern UI** - Clean, accessible interface built with Tailwind CSS
- 📝 **Full CRUD** - Create, Read, Update, and Delete operations
- 🚀 **Next.js 14** - Built with the latest Next.js App Router

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Supabase (PostgreSQL + Auth + Real-time)
- **Deployment**: Vercel-ready

## Getting Started

### Prerequisites

- Node.js 18+ installed
- A Supabase account (free tier works great)
- npm or yarn package manager

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd supabase-dashboard-template
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Supabase**
   - Go to [Supabase Dashboard](https://app.supabase.com)
   - Create a new project (or use an existing one)
   - Go to Project Settings → API
   - Copy your Project URL and anon/public key

4. **Configure environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

5. **Set up the database**
   - In Supabase Dashboard, go to SQL Editor
   - Run the migration file: `supabase/migrations/001_create_items_table.sql`
   - This creates the `items` table with Row-Level Security policies

6. **Run the development server**
   ```bash
   npm run dev
   ```

7. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
supabase-dashboard-template/
├── app/                      # Next.js App Router pages
│   ├── auth/                 # Authentication pages
│   │   ├── login/
│   │   └── signup/
│   ├── dashboard/            # Protected dashboard pages
│   ├── globals.css           # Global styles
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Home page (redirects)
├── components/               # React components
│   ├── auth/                # Auth-related components
│   └── dashboard/            # Dashboard components
├── utils/                    # Utility functions
│   └── supabase/             # Supabase client utilities
├── supabase/                 # Supabase configuration
│   └── migrations/           # Database migrations
├── middleware.ts             # Next.js middleware for auth
└── package.json
```

## Database Schema

The template includes a simple `items` table as an example:

- `id` - UUID primary key
- `user_id` - References auth.users (automatically set)
- `title` - Text (required)
- `description` - Text (optional)
- `created_at` - Timestamp
- `updated_at` - Timestamp

Row-Level Security policies ensure:
- Users can only see their own items
- Users can only create items for themselves
- Users can only update/delete their own items

## Customization

### Adding New Tables

1. Create a new migration file in `supabase/migrations/`
2. Follow the same RLS pattern as the items table
3. Create components similar to `ItemsList`, `AddItemModal`, etc.
4. Add routes in `app/dashboard/`

### Styling

The project uses Tailwind CSS. Modify `app/globals.css` or component classes to customize the appearance.

### Authentication

The authentication flow uses Supabase Auth. To add OAuth providers (Google, GitHub, etc.), configure them in your Supabase Dashboard under Authentication → Providers.

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Environment Variables for Production

Make sure to set these in your deployment platform:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## License

ISC

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## Support

If you encounter any issues or have questions, please open an issue on GitHub.
