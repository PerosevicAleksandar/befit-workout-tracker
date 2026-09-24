# BeFit Frontend Foundation

Create the initial frontend version of a web application called BeFit.

BeFit is a simple workout tracking MVP for a university assignment. Users will eventually be able to register, log in, record workouts, and review their workout history.

For this first step, focus only on the frontend structure, routing, responsive design, and UI.

Do NOT connect Supabase or implement real authentication/database functionality yet. Use mock data where data is needed.

Technology

Use:

React

Vite

JavaScript

HTML/CSS

Tailwind CSS may be used for styling

Keep the project structure and dependencies simple. Do not introduce unnecessary frameworks or complex architecture.

Pages

Create the following pages and routes:

Login

Register

Home

Add Workout

My Workouts

Workout Details using a dynamic /workouts/:id route

Set up working navigation between these pages.

Navigation

For the main application, create a responsive navbar containing:

BeFit | Home | Add Workout | My Workouts | Light/Dark Mode | Logout

Use a mobile-friendly navigation menu on smaller screens.

For now, Logout does not need real authentication logic.

Home

Create a sporty dashboard-style Home page.

Hero section:

Welcome back, Alex 👋

Add a short motivational sentence about staying consistent with workouts.

Include two CTA buttons:

Add Workout

View My Workouts

Below the hero, display two cards using mock data:

Total Workouts: 8

Last Workout: Full Body

Add Workout

Create the frontend form with:

Workout Type — required dropdown:

Full Body

Upper Body

Lower Body

Cardio

Other

Date — required date input

Duration — required number input in minutes

Comment — optional textarea

Add a prominent Save Workout button.

For now, the form does not need to save data anywhere.

My Workouts

Create a responsive table using mock workout data.

Columns:

Workout

Date

Duration

Delete

Display several example workouts.

Sort/display the examples from newest to oldest.

The workout name/type should be clickable and navigate to /workouts/:id.

Do not display comments in the table.

Also design an empty state that can later be shown when there are no workouts:

No workouts yet. Go to the gym! 💪

Your workout history is waiting for you.

Include an Add Workout button in the empty state.

Workout Details

Create a dynamic Workout Details page.

Using mock data for now, display:

Workout Type

Date

Duration

Comment

Include:

Back to My Workouts

Delete Workout

Delete does not need real functionality yet.

Login

Create a Login form containing:

Email

Password

Log In button

Include:

Don't have an account? Create Account

The link should navigate to Register.

Register

Create a Register form containing:

Username

Email

Password

Confirm Password

Create Account button

Include:

Already have an account? Log In

The link should navigate to Login.

Do not implement real authentication yet.

Design

The design should feel modern, sporty, clean, and energetic, while remaining simple and appropriate for a university MVP.

Light Mode

Use:

White main background

Blue primary/accent color

Dark text

Light gray secondary surfaces

Dark Mode

Use:

Black or very dark gray main background

Red primary/accent color

White/light text

Dark gray secondary surfaces

Implement a working Light/Dark mode toggle.

Persist the selected theme locally so it remains selected after a page refresh.

Use accent colors mainly for buttons, active navigation, links, icons, and interactive states rather than large background areas.

Use clean typography, good spacing, subtle rounded corners, readable forms, and clear CTA buttons.

Make the entire application responsive for desktop and mobile.

Important Scope Limitation

For this step:

Do NOT connect Supabase

Do NOT implement real authentication

Do NOT create database tables

Do NOT implement real data saving

Do NOT implement real delete functionality

Do NOT add additional features

Use mock data where necessary.

The goal of this step is to create a clean and working frontend foundation that will later be connected to Supabase.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://fitness-companion-kit.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/3a851aa8-391a-4057-b7cb-94e2c8f4cfdc).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
