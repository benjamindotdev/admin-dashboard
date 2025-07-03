# 📌 Project Overview: Trendies Notification System

This project was built as a technical assignment for a **senior full-stack developer role at Trendies**. The goal was to demonstrate the design and implementation of a **modular notification system** with real-time frontend updates and simulated email delivery via Brevo.

I completed this build in **under two days**, using a combination of **Next.js 15 (App Router), TypeScript, Mantine UI**, and mock backend logic. I used AI tools like Claude and ChatGPT to generate boilerplate where helpful, but took a **senior-level approach** in reviewing, structuring, and extending the codebase to ensure clarity, modularity, and maintainability.

This submission simulates key lifecycle events, supports real-time notification display, and includes a simple admin dashboard for managing and filtering system events.

---

## 🤝 My Approach

While I don’t yet hold a formal senior title, my process reflects a **senior mindset**:

- I broke down vague requirements into **modular, testable components**
- I prioritized **clarity over cleverness** and designed for easy future extension
- I used AI intentionally to reduce boilerplate, but focused on **clean architecture and real-world logic**
- I built both **user-facing and admin-facing flows**, with attention to UI polish, state management, and event flow

All backend logic is **simulated using in-memory mock data** and realistic async event flows. The structure is intentionally **database-ready**, while remaining lightweight and easy to extend.

---

## 📝 Notes & Assumptions

### 📬 Email Integration

- Email sending is **simulated only** — messages are logged to the console using a Brevo-style helper function.
- Templates include **dynamic placeholder values** (e.g. `{{userName}}`, `{{productName}}`), and simulate how real transactional emails might be structured.
- In a production environment, this would be swapped for **actual Brevo API integration** using authenticated keys and templated email content.

### 💾 Data Handling

- All data is **mocked and stored in-memory** using arrays and React state (no database connection).
- Data types for users, products, orders, and notifications are designed to reflect **realistic backend structures** for future persistence.
- Refreshing the page resets all data — no `localStorage` or persistent storage is used.

### ⚡ Event Simulation

- System events (e.g. “Listing created”, “Order placed”) are **manually triggered** through UI buttons or simulated with `setTimeout`.
- Real-time UI updates are handled via **React Context**, with no WebSocket or polling implementation.
- This approach was chosen to keep the system **simple and focused**, in line with the brief and time constraints.

### 🧠 Assumptions

- All users are assumed to be **authenticated** — no login or access control was implemented.
- Admin routes are **publicly accessible** in this demo for simplicity.
- Figma references were used to loosely guide layout and component choices, with design fidelity approximated using Mantine UI components.
- Email templates were simplified for **speed and clarity**, not for full branding polish.

### 🔮 Future Improvements

If this were being shipped for production, the next steps would include:

- Adding **database support** (e.g. PostgreSQL with Prisma) for persistent notifications and user data.
- Integrating **Brevo with actual transactional templates** and error handling.
- Securing admin routes with **authentication and role-based access control**.
- Supporting **WebSocket-based real-time notification updates** per user.
- Implementing **read/unread state per user** with filtering and persistence.

---

## 🧑‍💻 Final Thoughts

The project has a great way for me to experience the benefits of Mantine in a short period of time. While the backend was simulated, I look forward to also adding Nest.js to my resume, if I am successful with the application.
