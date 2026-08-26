# AI-Enabled Learning & Competency Platform

### Smart India Hackathon — 15-Day MVP Wireframe & Product Specification

**Project Type:** AI-enabled learning and competency assessment platform
**Technology:** MERN Stack
**Primary Goal:** Identify competency gaps, generate personalized learning recommendations, and generate quizzes/MCQs from uploaded learning materials for capacity building in India's Official Statistical System.

---

# 1. Product Vision

The platform will provide a simple learning → assessment → analysis → recommendation cycle.

```text
Upload Learning Material (Data from Karmayogi Portal)
          ↓
   AI Understands Content
          ↓
    Generate MCQs / Quiz
          ↓
       User Attempts
          ↓
   Analyse Performance
          ↓
 Identify Competency Gaps
          ↓
Personalized Recommendations
          ↓
      Improve & Retake
```

The prototype should demonstrate this complete journey rather than attempting to reproduce a complete enterprise lms.

---

# 2. Primary User Journey

### Step 1 — User Auth

User:

* Creates account
* Logs in
* Enters the learning dashboard
* Use react routes and protected routes

### Step 2 — Dashboard

Dashboard provides an overview of:

* Overall competency score
* Learning progress
* Recent quizzes
* Identified competency gaps
* Recommended learning
* Uploaded materials (Optional as data we will fetch from Karmayogi Portal)
* Quick actions

### Step 3 — Learning Materials

User can:

* Upload learning material
* View uploaded documents
* See document name
* See document type
* See upload date
* See processing status
* Open/remove material

Supported prototype formats should initially prioritize:

* PDF
* DOCX
* TXT

No Need to confugure it for all size

### Step 4 — AI Quiz Generation

User selects a learning material and chooses:

* Number of questions
* Difficulty
* Topic, if applicable

AI generates MCQs containing:

* Question
* Four options
* Correct answer
* Explanation
* Topic
* Difficulty

### Step 5 — Quiz Attempt

Quiz interface provides:

* Question navigation
* Answer selection
* Progress indicator
* Submit button
* Basic validation (shouldn't be displayed onn frontend it is backend logic)
* Score calculation

### Step 6 — Competency Analysis

After submission:

```text
Quiz Performance
       ↓
Topic-wise Analysis
       ↓
Competency Score
       ↓
Gap Identification
```

Example:

| Competency          | Score | Status       |
| ------------------- | ----: | ------------ |
| Data Collection     |   88% | Strong       |
| Sampling            |   72% | Moderate     |
| Data Analysis       |   48% | Weak         |
| Statistical Methods |   39% | Critical Gap |

### Step 7 — Personalized Recommendations

The system recommends learning based on identified gaps.

Example:

```text
Critical Gap
Data Analysis

Recommended Learning
→ Data Analysis Fundamentals
→ Statistical Interpretation
→ Data Analysis Practice Quiz
```

### Step 8 — Progress Tracking

The dashboard updates based on subsequent quiz attempts.

---

# 3. Website Structure / Main Pages

## A. Landing Page

Purpose:

Introduce the platform and explain its value.

### Sections

* Navbar
* Hero section
* Problem statement
* How the platform works
* AI-powered features
* Competency analysis explanation
* Learning journey
* CTA
* Footer

### Primary CTA

**Start Learning**

---

# B. Authentication

## Login

Features:

* Email 
* Password 
* Login
* Remember session
* Redirect to dashboard

## Registration

Features:

* Name
* Email (email verification is mandatory)
* Password
* Confirm password
* Basic validation
* Account creation


---

# C. Dashboard

This is the primary application screen.

### Header

* Logo
* Search, if useful
* Notifications
* User profile
* Logout

### Overview Cards

* Overall competency
* Learning materials
* Quizzes completed
* Learning progress

### Competency Overview

Visual representation of:

* Strong areas
* Moderate areas
* Weak areas
* Critical gaps

### Recommended Learning

Cards containing:

* Topic
* Reason for recommendation
* Difficulty
* Estimated learning time
* Start button

### Recent Activity

Examples:

* Quiz completed
* New material uploaded
* Competency improved
* Recommendation generated

---

# D. Learning Materials

### Material Library

Each material card contains:

* Document icon
* Title
* Type
* Upload date
* Processing status
* Generate Quiz
* View
* Delete

### Upload Material

Features:

* Drag & drop
* File picker
* File validation
* Upload progress
* Processing state
* Success/error state

Example states:

```text
Uploading...
Processing...
Ready
Failed
```

---

# E. Material Details

Displays:

* Document title
* Description/metadata
* Topics detected by AI
* Processing status
* Generate Quiz
* Previous quizzes
* Basic document information

---

# F. Quiz Generator

User chooses:

```text
Material
Number of Questions
Difficulty
Topic
```

Optional future controls:

* Time limit

---

# G. Quiz Interface

### Components

* Quiz title
* Progress indicator
* Current question
* Four options
* Next
* Previous
* Question navigation
* Submit quiz

### Smaller UX features

* Selected-answer state
* Unanswered-question warning
* Confirmation before submission
* Loading state
* Error state

---

# H. Quiz Results

Displays:

* Total score
* Percentage
* Correct answers
* Incorrect answers
* Topic-wise performance
* Difficulty-wise performance
* Explanation/review

Primary CTA:

**View Competency Analysis**

Secondary CTA:

**Try Again**

---

# I. Competency Analysis

This is one of the most important pages for the SIH problem statement.

### Overall Competency

Large score visualization.

### Competency Categories

```text
Strong
Moderate
Weak
Critical
```

### Topic Analysis

Each competency should show:

* Topic
* Score
* Status
* Improvement trend

### Gap Analysis

Example:

```text
Your highest competency gap:

Data Analysis

Current Level: Weak
Score: 42%

Why this was identified:
Your recent assessments show low performance
in questions related to data analysis.
```

---

# J. Personalized Recommendations

Recommendation cards contain:

* Topic
* Current competency
* Reason
* Recommended material
* Priority
* Start learning
* Take assessment

The recommendation engine should primarily use quiz performance in the MVP.

---

# K. Progress / Analytics

Optional but recommended if time permits.

Displays:

* Score progression
* Quiz history
* Competency improvement
* Completed learning
* Weak-area improvement

Do not spend excessive development time on advanced analytics.

---

# L. Profile

Basic profile:

* Name
* Email
* Learning statistics
* Completed quizzes
* Competency summary
* Logout

Advanced profile customization is not required for MVP.

---


# 4. AI & Product Generation Tools

We will deliberately use AI throughout the development lifecycle.

## Product/UI Design

### Google Stitch

Primary use:

* Initial UI concepts
* Page structure

### Figma AI

Primary use:

* Wireframes
* UI refinement
* Prototyping

### Canva AI

Primary use:

* Presentation graphics
* Icons/visual assets where appropriate
* Hackathon presentation
* Marketing/hero graphics if required

---

# 5. Development AI Tools

## Antigravity + Gemini

Primary development assistant.

Use for:

* React development
* Tailwind implementation
* Node/Express assistance
* Debugging
* Refactoring
* API integration
* Database assistance
* Documentation
* Testing assistance

The team should not blindly accept generated code.

Every major generated implementation should be:

```text
Generate
   ↓
Understand
   ↓
Review
   ↓
Test
   ↓
Integrate
```

## Claude

Use selectively for:

* Difficult architectural problems
* Complex debugging
* Prompt engineering
* Reviewing approaches
* Special cases where another model provides better reasoning

## Vercel

Primary deployment platform for the frontend and, where appropriate, compatible backend/API deployment.

---

# 6. AI/API Strategy

The project should prioritize **low-cost, high-performance, easy-to-integrate APIs**.

The AI API should support:

* Text generation
* Structured JSON output
* MCQ generation
* Content analysis
* Competency analysis
* Recommendation generation

### Important architecture principle

Do not tightly couple the frontend directly to the AI provider.

Use:

```text
React
  ↓
Our Express API
  ↓
AI Provider
```

This allows us to replace the AI provider later without rewriting the frontend.

---

#78. Recommended AI Integration Approach

Because the team has limited backend/AI integration experience, we should use the simplest reliable architecture.

### Step 1

Frontend uploads material.

### Step 2

Backend receives the file.

### Step 3

Backend extracts text.

### Step 4

Backend sends controlled prompt + extracted content to AI API.

### Step 5

AI returns structured JSON.

Example conceptual response:

```json
{
  "questions": [
    {
      "question": "What is sampling?",
      "options": [
        "Option A",
        "Option B",
        "Option C",
        "Option D"
      ],
      "answer": "Option B",
      "explanation": "Explanation...",
      "topic": "Sampling",
      "difficulty": "Medium"
    }
  ]
}
```

### Step 6

Backend validates the response.

### Step 7

MongoDB stores the quiz.

### Step 8

React displays it.

This keeps AI integration manageable.

---

# 9. API Selection Principle

Before implementation, we will compare currently available AI APIs based on:

| Requirement              | Priority  |
| ------------------------ | --------- |
| Low cost/free tier       | Very High |
| Structured JSON output   | Very High |
| Good reasoning           | High      |
| Fast response            | High      |
| Large context            | High      |
| Easy Node.js integration | Very High |
| Documentation            | High      |
| Reliability              | Very High |

**The exact provider/model should be finalized immediately before implementation rather than hard-coded into this document**, because pricing, free tiers, model availability, and limits can change.

Our implementation should also keep the provider behind one backend service such as:

```text
services/
└── aiService.js
```

This means changing providers later should require minimal changes.

AI-assisted implementation instructions will be written step-by-step for the team when we reach this stage.

---

# 10. Text Tags / Semantic HTML Strategy

The frontend should use meaningful HTML elements rather than creating the entire application from generic `<div>` elements.

### Primary semantic tags

```text
<header>
<nav>
<main>
<section>
<article>
<aside>
<footer>
<form>
<label>
<button>
<input>
<textarea>
<select>
<h1>
<h2>
<h3>
<p>
<ul>
<ol>
```

# 11. Core MERN Data Models

Initial MongoDB collections should remain simple.

### User

```text
User
├── name
├── email
├── password
├── competencyScore
└── createdAt
```

### Material

```text
Material
├── userId
├── title
├── fileType
├── fileUrl/reference
├── extractedText/reference
├── topics
├── status
└── createdAt
```

### Quiz

```text
Quiz
├── userId
├── materialId
├── title
├── questions
├── score
├── competencyData
└── createdAt
```

### Recommendation

```text
Recommendation
├── userId
├── topic
├── reason
├── priority
├── recommendedContent
└── createdAt
```

These schemas can evolve as development progresses.

---

# 12. Documentation Files

The repository will maintain several Markdown files that act as project memory and instructions for both humans and AI development tools.

## `README.md`

Will cover:

* Project overview
* Problem statement
* Solution
* Features
* Technology stack
* Setup instructions
* Project structure
* Running locally
* Deployment
* Team
* Future scope

This is the **public-facing project documentation**.

---

## `AGENT.md`

Will contain instructions/context for AI coding agents.

It should eventually cover:

* Project architecture
* Coding conventions
* Folder structure
* Technology decisions
* Development rules
* Important constraints
* API conventions
* Component conventions
* Things AI agents must not modify unnecessarily

This becomes the **AI development context file**.

---

## `WIREFRAME.md`

Will contain:

* Website structure
* User journey
* Page hierarchy
* Feature inventory
* Component relationships
* MVP boundaries
* Planned screens
* Navigation structure

This document represents **what we are building**.

---

## `DESIGN.md`

Will contain:

* Design system
* Color palette
* Typography
* Spacing
* Buttons
* Cards
* Forms
* Navigation
* Responsive behavior
* Component styling rules
* UI/UX principles

This represents **how the product should look and feel**.

---


# 13. GitHub Development Strategy

Repository structure:

```text
project/
│
├── client/
│   ├── src/
│   └── ...
│
├── server/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── middleware/
│   └── ...
│
├── README.md
├── agent.md
├── wireframe.md
├── design.md
├── architecture.md
└── .gitignore
```

Team workflow:

```text
main
  │
  └── development
        │
        ├── feature/auth
        ├── feature/dashboard
        ├── feature/quiz
        ├── feature/ai
        └── feature/competency
```

No direct experimentation on `main`.

---

# 15. MVP Boundary

## MUST HAVE

The final demo must successfully demonstrate:

```text
Login
 ↓
Dashboard
 ↓
Upload Learning Material
 ↓
AI Quiz Generation
 ↓
Take Quiz
 ↓
Results
 ↓
Competency Gap
 ↓
Personalized Recommendation
```

If this works reliably, we have a legitimate MVP.

---

# 16. SHOULD HAVE (Currently not required)

If time permits:

* Progress graphs
* Topic trends
* Better document library
* Quiz history
* Improved recommendations
* Search
* Better animations
* Advanced dashboard analytics

---

# 17. Final Product Story

The entire prototype should communicate one simple idea:

> **The platform understands what a learner needs to learn, tests what they know, identifies what they don't know, and recommends what they should learn next.**

The strongest demo should therefore follow one realistic learner:

```text
"I have learning material."
          ↓
"I upload it."
          ↓
"AI creates an assessment."
          ↓
"I take the assessment."
          ↓
"The system analyses my competency."
          ↓
"It identifies my gaps."
          ↓
"It recommends what I should learn next."
```

That single journey should remain the centre of the product throughout the 15-day development period.

---

# 19. Development Rule

Every proposed feature should pass this question:

**Does this help demonstrate the core problem statement?**

If:

**YES → Build it.**

**MAYBE → Build only if MVP is stable.**

**NO → Put it in future scope.**

The goal is not to demonstrate how many technologies we can use.