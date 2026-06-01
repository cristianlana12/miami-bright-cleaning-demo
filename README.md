# Miami Bright Cleaning Demo

Premium cleaning service website and booking management system built as a commercial software demo.

This project demonstrates how a local service business can use a modern website, online booking form, admin dashboard, cloud database, backend API and email automation to manage customer requests more efficiently.

## Overview

**Miami Bright Cleaning** is a fictional cleaning company demo created to showcase a complete digital solution for small and medium-sized service businesses.

The system allows customers to request cleaning services online and allows the business owner or admin to manage those requests from a private dashboard.

When a booking is created or its status changes, the customer receives automatic email notifications.

## Main Features

* Premium responsive landing page
* Modern blue-themed UI with cards and clean layout
* Service sections for cleaning business offers
* Online booking form
* Estimated price calculation by service type
* Supabase database integration
* FastAPI backend integration
* Automatic email notification when a booking is received
* Automatic email notification when a booking is confirmed
* Automatic email notification when a booking is completed
* Automatic email notification when a booking is cancelled
* Protected admin dashboard
* Booking status management
* Filters by booking status
* Commercial system explanation section

## Tech Stack

### Frontend

* React
* Vite
* TypeScript
* React Router
* CSS custom styling
* Supabase Auth

### Backend

* Python
* FastAPI
* Uvicorn
* Supabase Python Client
* SMTP email integration

### Database and Auth

* Supabase
* PostgreSQL
* Supabase Authentication
* Row Level Security policies

## Project Structure

```txt
miami-bright-cleaning/
│
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── config.py
│   │   ├── database.py
│   │   ├── notifications.py
│   │   ├── schemas.py
│   │   └── routers/
│   │       └── bookings.py
│   │
│   ├── requirements.txt
│   └── .env
│
├── src/
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── Services.tsx
│   │   ├── WhyChooseUs.tsx
│   │   ├── AutomationDemo.tsx
│   │   ├── SystemIncludes.tsx
│   │   ├── Pricing.tsx
│   │   ├── BookingForm.tsx
│   │   ├── Testimonials.tsx
│   │   ├── Footer.tsx
│   │   └── ProtectedRoute.tsx
│   │
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── AdminLogin.tsx
│   │   └── AdminDashboard.tsx
│   │
│   ├── lib/
│   │   ├── api.ts
│   │   └── supabaseClient.ts
│   │
│   ├── types/
│   │   └── booking.ts
│   │
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
│
├── package.json
├── vite.config.ts
└── README.md
```

## Booking Workflow

### Customer Flow

1. The customer visits the landing page.
2. The customer selects a cleaning service.
3. The customer completes the booking form.
4. The frontend sends the request to the FastAPI backend.
5. The backend stores the booking in Supabase.
6. The backend sends an automatic email confirming that the request was received.

### Admin Flow

1. The admin logs into the private dashboard.
2. The admin reviews new booking requests.
3. The admin can update the booking status:

   * Pending
   * Confirmed
   * Completed
   * Cancelled
4. The backend updates the booking in Supabase.
5. The backend sends an automatic email to the customer based on the new status.

## Booking Status Email Notifications

The system sends automatic email notifications for the following events:

| Event               | Email Sent                 |
| ------------------- | -------------------------- |
| New booking created | Booking request received   |
| Booking confirmed   | Booking request confirmed  |
| Booking completed   | Cleaning service completed |
| Booking cancelled   | Booking request cancelled  |

## Environment Variables

### Frontend `.env`

Create a `.env` file in the frontend root:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_API_URL=http://localhost:8000
```

### Backend `.env`

Create a `.env` file inside the `backend` folder:

```env
SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

FRONTEND_URL=http://localhost:5173

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_google_app_password
SMTP_FROM=Miami Bright Cleaning <your_email@gmail.com>

WHATSAPP_ENABLED=false
```

Important:

* Never commit `.env` files.
* Never expose the Supabase Service Role Key in the frontend.
* Gmail SMTP requires a Google App Password, not the normal Gmail account password.

## Supabase Database

Create the `bookings` table using the following SQL:

```sql
create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),

  full_name text not null,
  email text not null,
  phone text not null,

  service_type text not null,
  booking_date date not null,
  booking_time time not null,

  address text not null,
  message text,

  status text not null default 'pending',
  estimated_price numeric(10,2),

  created_at timestamp with time zone default now()
);
```

Add status validation:

```sql
alter table public.bookings
drop constraint if exists bookings_status_check;

alter table public.bookings
add constraint bookings_status_check
check (
  status in ('pending', 'confirmed', 'completed', 'cancelled')
);
```

Add service type validation:

```sql
alter table public.bookings
drop constraint if exists bookings_service_type_check;

alter table public.bookings
add constraint bookings_service_type_check
check (
  service_type in (
    'house_cleaning',
    'deep_cleaning',
    'office_cleaning',
    'move_in_out',
    'airbnb_cleaning',
    'post_construction'
  )
);
```

## Supabase RLS Policies

Enable Row Level Security:

```sql
alter table public.bookings enable row level security;
```

Allow public booking creation:

```sql
drop policy if exists "Allow public booking insert" on public.bookings;

create policy "Allow public booking insert"
on public.bookings
for insert
to anon
with check (true);
```

Allow authenticated users to read bookings:

```sql
drop policy if exists "Allow authenticated booking select" on public.bookings;

create policy "Allow authenticated booking select"
on public.bookings
for select
to authenticated
using (true);
```

Allow authenticated users to update bookings:

```sql
drop policy if exists "Allow authenticated booking update" on public.bookings;

create policy "Allow authenticated booking update"
on public.bookings
for update
to authenticated
using (true)
with check (true);
```

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/miami-bright-cleaning-demo.git
cd miami-bright-cleaning-demo
```

### 2. Install frontend dependencies

```bash
npm install
```

### 3. Run the frontend

```bash
npm run dev
```

The frontend should run at:

```txt
http://localhost:5173
```

## Backend Setup

### 1. Enter the backend folder

```bash
cd backend
```

### 2. Create a virtual environment

```bash
python -m venv venv
```

### 3. Activate the virtual environment

On Windows:

```bash
venv\Scripts\activate
```

On macOS/Linux:

```bash
source venv/bin/activate
```

### 4. Install backend dependencies

```bash
pip install -r requirements.txt
```

### 5. Run the backend

```bash
uvicorn app.main:app --reload --port 8000
```

The backend should run at:

```txt
http://localhost:8000
```

FastAPI documentation is available at:

```txt
http://localhost:8000/docs
```

## Admin Access

The admin dashboard is located at:

```txt
http://localhost:5173/admin
```

The admin login page is located at:

```txt
http://localhost:5173/admin/login
```

Admin users are managed through Supabase Authentication.

## Demo Business Use Case

This project is designed as a software agency demo for service businesses such as:

* Cleaning companies
* Contractors
* Pool cleaning services
* Home repair businesses
* Beauty salons
* Barbershops
* Local maintenance companies
* Real estate service providers

The same structure can be adapted to any local service business that needs:

* A professional website
* Online booking
* Customer management
* Admin dashboard
* Email notifications
* Business process automation

## Future Improvements

Possible next features:

* Payment integration with Stripe
* Real WhatsApp notifications through Twilio or WhatsApp Cloud API
* Admin role management
* Booking calendar view
* Customer portal
* Invoice generation
* Service team assignment
* File/image uploads
* Analytics dashboard
* Deployment to production
* Mobile app version with Expo

## Author

Developed by Cristian Cordoba as part of a software development agency portfolio project.

## Purpose

This project was created to demonstrate how a modern software agency can help small and medium-sized businesses in the United States improve their digital presence, automate customer requests and manage operations through custom software.
