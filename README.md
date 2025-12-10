# HR Workflow Builder – React Project

This is a mini HR Workflow Builder application developed using **React and React Flow**.  
The goal of this project is to visually design, configure, and simulate internal HR workflows like employee onboarding, approvals, and automated actions.

This project was built as part of a technical assignment to demonstrate skills in:
- Frontend architecture
- Visual workflow systems
- Dynamic form handling
- Mock API simulation
- Business logic implementation

---

##  Features

- Visual drag-and-drop workflow builder
- Five custom workflow nodes:
  - Start Node  
  - Task Node  
  - Approval Node  
  - Automated Node  
  - End Node  
- Sidebar to add nodes dynamically
- Connect nodes using arrows
- Right-side panel to edit node details
- Start node metadata support (key/value pairs)
- Approval auto-approval based on metadata
- Automated node actions (Email, Document generation)
- Workflow validation (Start & End required)
- Simulation engine with step-by-step execution log
- Delete nodes and edges using keyboard
- Fully modular and scalable React structure

---

##  Node Configuration Details

###  Start Node
- Title
- Metadata (key-value pairs)

###  Task Node
- Title
- Description
- Assignee
- Due Date
- Custom Fields

###  Approval Node
- Title
- Approver Role
- Auto-Approval Threshold (based on metadata)

###  Automated Node
- Action Selection (Send Email / Generate Document)
- Dynamic Parameters (To, Subject, Template, etc.)

###  End Node
- End Message
- Summary Flag

---

##  Workflow Simulation

The simulation engine performs the following:
- Validates whether Start and End nodes exist
- Reads metadata from Start Node
- Applies approval logic using metadata and threshold
- Executes automated actions
- Displays a clean step-by-step execution log

Example simulation output:
- Metadata is loaded
- Approval is auto-approved or marked for manual approval
- Automated email or document is triggered
- Workflow ends successfully

---

##  Tech Stack Used

- React (Vite)
- React Flow
- JavaScript
- CSS
- Mock API Simulation

---

##  How to Run the Project

1. Install dependencies:
npm install  

2. Start the development server:
npm run dev

3. Open in browser
