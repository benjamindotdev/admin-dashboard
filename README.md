# 📌 Project Overview: Notification System Prototype

This project was built as part of a **technical assignment for a senior full-stack developer role**. The goal was to demonstrate the design and implementation of a **modular notification system** with real-time frontend updates and simulated email delivery.

I completed the build in **under two days**, using **Next.js 15 (App Router), TypeScript, Mantine UI**, and mock backend logic. I used AI tools like Claude and ChatGPT to assist with boilerplate setup, but took a **senior-level approach** in reviewing, refactoring, and extending the codebase for clarity, modularity, and maintainability.

The system simulates real-world product lifecycle events, provides real-time notification updates, and includes a lightweight admin dashboard for managing and filtering system messages.

---

## 🤝 My Approach

While I don’t yet hold a formal senior title, I approached this task with a **senior mindset** and product focus:

- Broke down vague requirements into **clear, testable components**
- Prioritized **clean architecture over clever hacks**
- Used AI **intentionally** to reduce boilerplate, not to replace decision-making
- Built both **user-facing and admin-facing flows**, with an eye toward real-world usage and extendability

Backend logic is **fully simulated** using mock data and realistic async flows. The structure was designed to be **database-ready**, but remains lightweight for demo purposes.

---

## 📝 Notes & Assumptions

### 📬 Email Integration

- Email sending was **initially implemented**, but later disabled to avoid unnecessary API usage after the opportunity concluded.
- Templates include **dynamic placeholders** (e.g. `{{userName}}`, `{{productName}}`) to simulate realistic transactional email behavior.
- A simple Brevo-style service is included to demonstrate how messages could be structured and triggered.

### 💾 Data Handling

- All data is **stored in-memory** (no external DB).
- Mock objects reflect real-world structures (users, products, orders, notifications).
- Data is reset on refresh — no persistence layer (e.g. localStorage, DB, etc.) was included.

### ⚡ Event Simulation

- Events like “Listing created” or “Order placed” are **triggered via the UI** or simulated using `setTimeout`.
- Real-time updates are handled with **React Context** — no polling or WebSockets were included due to scope and time constraints.

### 🧠 Assumptions

- **All users are assumed authenticated** — no login system or role-based gating.
- **Admin pages are public** for demo simplicity.
- UI/UX was loosely modeled after provided references, using Mantine components and structure.
- **Email content and UI fidelity** were simplified to focus on core logic and deliverability.

### 🔮 Future Improvements

If this were to be developed further:

- Add a real **database layer** (e.g., Prisma/PostgreSQL)
- Integrate **authenticated Brevo transactional emails**
- Implement **role-based access and route protection**
- Replace React Context with **WebSocket or Server-Sent Events**
- Store and track **notification read/unread state** with filters per user

---

## 🧑‍💻 Final Thoughts

While the opportunity itself didn’t lead to a role, it offered a valuable chance to practice rapid prototyping, modular architecture, and real-time logic simulation using modern tools. I’m especially glad to have experienced **Mantine UI in production-style conditions**, and I look forward to expanding my experience with **NestJS** in future backend projects.

This project reflects how I solve problems when stakes are high, time is short, and the requirements are open-ended. I'm proud of the result — and even more so of the mindset behind it.
