# Team Pulse Dashboard (Role-Based Views with Redux Toolkit)

A productivity monitoring dashboard that allows **Team Leads** to monitor team member statuses and assign tasks, while **Team Members** can update their status.  
Built with **React + Redux Toolkit**, styled using **CSS**.  
This project demonstrates **role-based UI rendering** with centralized state management.

---

##  Project Overview
- **Team Lead Mode**:
  - View all members with status badges (`Working`, `Break`, `Meeting`, `Offline`).
  - Assign tasks with member selection, title, and due date.
  - Filter members by status and sort them by number of active tasks.

- **Team Member Mode**:
  - Update personal status (one active at a time).
  - View assigned tasks with title, due date, and progress bar.
  - Update progress in steps of 10%. Tasks auto-complete at 100%.

- **State Management**:
  - All roles, members, and tasks are managed globally using **Redux Toolkit**.
---

## 🛠 Tech Stack
- **Frontend**: React (with Hooks)
- **State Management**: Redux Toolkit + React-Redux
- **Styling**: plain CSS
- **Optional Libraries**:  
  - date-fns (for date formatting)  

---

## 📌 Features
### Role Switching
- Toggle (top-right corner) to switch between `Team Lead` and `Team Member`.
- Current role & user tracked in Redux state.

### Team Lead View
1. **Status Monitor**: List of members with status badges + summary (e.g., `2 Working · 1 Meeting · 1 Break`).
2. **Assign Tasks**: Form with member dropdown, task title, and due date picker. Dispatch action to assign tasks.
3. **Filter & Sort**:  
   - Filter by status.  
   - Sort members by number of active (not completed) tasks.

### Team Member View
1. **Update Status**: Choose between `Working`, `Break`, `Meeting`, `Offline`. Only one active.
2. **Manage Tasks**:  
   - List of assigned tasks with title, due date, and progress bar.  
   - Buttons to increment/decrement progress in 10% steps.  
---

