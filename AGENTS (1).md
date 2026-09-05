# AGENTS.md

## 1. Project Overview

### Project Name
[ENTER PROJECT NAME]

### Problem Statement
Develop an AI-enabled learning platform that identifies competency gaps, recommends personalized training through integration with the iGOT Karmayogi ecosystem, and generates quizzes and multiple-choice questions (MCQs) from uploaded learning materials to strengthen capacity building in India's Official Statistical System.

### Project Objective
Build a reliable, secure, maintainable and user-focused learning platform that combines learning-content processing, competency analysis, personalized training recommendations and AI-generated assessments.

### Primary Users
[ENTER TARGET USERS]

### Core Features
- User and profile management
- Competency-gap identification
- Personalized training recommendations
- iGOT Karmayogi ecosystem integration
- Learning-material upload and processing
- AI-generated quizzes and MCQs
- Assessment and scoring
- Learning/progress tracking
- Multilingual support where required

---

## 2. Tech Stack

### Frontend
[ENTER FRONTEND TECHNOLOGY]

### Backend
[ENTER BACKEND TECHNOLOGY]

### Database
[ENTER DATABASE TECHNOLOGY]

### AI / ML
[ENTER AI/ML TECHNOLOGY OR MODEL]

### APIs / Integration
[ENTER API AND INTEGRATION TECHNOLOGIES]

### Deployment
[ENTER DEPLOYMENT PLATFORM]

### Development Tools
[ENTER DEVELOPMENT TOOLS]

> Agents MUST NOT introduce a new major technology without first checking the existing project architecture and requirements.
> Agents MUST NOT introduce a take tech stack based decision on its own.

---

## 3. Project Architecture

### Architecture Pattern
[ENTER ARCHITECTURE/PATTERN]

### Major Components
1. User Interface
2. Authentication and Authorization
3. User/Competency Profile
4. Learning Material Management
5. Document Processing
6. AI/LLM Service
7. Competency-Gap Analysis
8. Recommendation Engine
9. Quiz/MCQ Generation
10. Assessment and Progress Tracking
11. iGOT Karmayogi Integration
12. Database/Persistence Layer
13. Logging, Monitoring and Error Handling

### Component Responsibilities
[ENTER PROJECT-SPECIFIC ARCHITECTURE DETAILS]

### Data Flow
[ENTER DATA FLOW]

Agents MUST preserve separation of concerns and MUST NOT place unrelated business logic into a single component.

---

## 4. Functional Requirements

### Competency-Gap Analysis
- Analyze available competency/assessment information.
- Identify missing or weak competency areas.
- Produce explainable results where possible.
- Do not claim certainty when the underlying data is insufficient.

### Personalized Training
- Use identified competency gaps to recommend relevant learning.
- Recommendations MUST be relevant to the user's competency needs.
- Avoid fabricated courses, links or learning resources.
- Clearly distinguish verified platform content from AI-generated suggestions.

### Learning Material Processing
- Accept only supported file types.
- Validate uploaded files before processing.
- Extract usable text/content safely.
- Handle empty, corrupted or unsupported documents gracefully.

### Quiz and MCQ Generation
- Generate questions from the supplied learning material.
- Questions MUST be grounded in the source material.
- Each MCQ MUST contain:
  - A clear question
  - Appropriate answer options
  - One unambiguous correct answer
  - An explanation where supported
  - Source/content reference where feasible
- Do not invent facts that are not supported by the source material.
- Avoid duplicate or trivially reworded questions.

### Assessment
[ENTER ASSESSMENT-SPECIFIC REQUIREMENTS]

---

## 5. Testing Rules

All new features MUST include appropriate testing.

### Minimum Testing Areas
- Functional testing
- Unit testing
- Integration testing
- API testing
- Input-validation testing
- Error-handling testing
- Security testing
- AI-output validation
- Document-processing testing
- iGOT integration testing where applicable

### AI Testing
AI-generated output MUST be checked for:
- Correctness
- Relevance
- Source grounding
- Completeness
- Duplicate questions
- Ambiguous answers
- Unsupported claims
- Unsafe or inappropriate content

### Regression Testing
Existing functionality MUST NOT be broken by a new feature.

Agents MUST run the relevant tests before declaring work complete.

---

## 6. Agent Behaviour

Agents MUST:

1. Read and follow this `AGENTS.md` before modifying the project.
2. Inspect the existing code before creating new files or changing architecture.
3. Prefer small, focused and maintainable changes.
4. Reuse existing utilities and components when appropriate.
5. Follow the project's established naming and coding conventions.
6. Explain important architectural or implementation decisions.
7. Protect existing functionality.
8. Handle errors explicitly.
9. Always run optimised ethical hacking approaches to check for vulnerabily and fix it

Agents MUST NOT:

- Rewrite the entire project unnecessarily.
- Remove working functionality without justification.
- Expose API keys, credentials or secrets.
- Hard-code sensitive information.
- Invent iGOT APIs, endpoints or credentials.
- Treat AI-generated information as automatically correct.
- Add dependencies without a valid reason.
- Change the agreed tech stack without approval.
- Mark incomplete work as complete.

### User-Specified Agent Instructions
[ENTER ADDITIONAL AGENT BEHAVIOUR RULES]

---

## 7. Coding Standards

### General
- Write readable, maintainable and modular code.
- Use meaningful names.
- Keep functions/classes focused on a single responsibility.
- Avoid unnecessary duplication.
- Add comments only where they provide meaningful context.
- Prefer clear code over clever code.

### Naming
[ENTER NAMING CONVENTIONS]

### Formatting
[ENTER FORMATTING/LINTING RULES]

### Documentation
[ENTER DOCUMENTATION REQUIREMENTS]

---

## 8. API Rules

- Validate all incoming API data.
- Return consistent response structures.
- Use appropriate HTTP status codes.
- Handle authentication and authorization correctly.
- Never expose internal errors, credentials or sensitive information.
- Implement appropriate timeout and failure handling.
- Document API contracts.

### API Format
[ENTER API RESPONSE/REQUEST STANDARD]

### Authentication
[ENTER AUTHENTICATION METHOD]

### External APIs
[ENTER EXTERNAL API RULES]

---

## 9. AI Integration Rules

### AI Responsibilities
[ENTER EXACT AI RESPONSIBILITIES]

### Prompting
- Prompts MUST clearly define the task and expected output.
- Prompts MUST provide relevant source context.
- Structured output SHOULD be used wherever reliable parsing is required.
- Prompts MUST avoid requesting unsupported facts.

### AI Output
AI output MUST be treated as untrusted/generated data until validated.

The application SHOULD:
- Validate generated structure.
- Validate required fields.
- Check source grounding.
- Detect obvious contradictions or unsupported claims.
- Handle malformed model responses.
- Provide fallback behaviour when AI services fail.

### Model Configuration
[ENTER MODEL/PROVIDER DETAILS]

---

## 10. AI Accuracy Rules

Accuracy is a critical requirement.

For learning-content and MCQ generation:

1. Prefer information explicitly present in the uploaded source.
2. Do not fabricate facts, statistics, courses or references.
3. Do not create an answer merely because it sounds plausible.
4. If the source does not contain enough information, state that the information is insufficient.
5. MCQs MUST have one clearly correct answer unless the question type explicitly permits otherwise.
6. Explanations MUST be consistent with the source.
7. Generated content SHOULD be reviewed/validated before being presented as authoritative.
8. Where confidence or uncertainty matters, communicate it clearly.

### Accuracy Threshold / Evaluation Method
[ENTER YOUR AI ACCURACY CRITERIA]

---

## 11. iGOT Karmayogi Integration Rules

- Use only officially provided/approved integration mechanisms.
- Keep integration logic isolated from unrelated business logic.
- Never hard-code credentials or tokens.
- Store secrets using secure environment/configuration mechanisms.
- Validate external API responses.
- Handle API timeouts, unavailable services and invalid responses gracefully.
- Do not assume an external API contract; verify the actual specification before implementation.
- Log useful technical errors without exposing sensitive information.

### iGOT APIs / Endpoints
[ENTER VERIFIED iGOT API DETAILS]

### Authentication / Authorization
[ENTER VERIFIED AUTHENTICATION DETAILS]

### Integration Workflow
[ENTER iGOT INTEGRATION WORKFLOW]

---

## 12. Multilingual Rules

### Supported Languages
[ENTER LANGUAGES]

### Translation Rules
- Preserve the meaning of the original learning material.
- Do not translate technical terms incorrectly.
- Maintain MCQ structure and answer correctness after translation.
- Avoid mixing languages unintentionally.
- Validate generated translations where accuracy is important.

### Language Detection
[ENTER LANGUAGE DETECTION REQUIREMENTS]

---

## 13. Security Rules

Security MUST be considered for every feature.

### Authentication & Authorization
- Enforce appropriate access control.
- Users MUST only access resources they are authorized to access.

### File Security
- Validate file type and size.
- Do not execute uploaded files.
- Store uploaded material securely.
- Prevent unauthorized access to uploaded content.
- Handle malicious or corrupted files safely.

### Secrets
- Never commit API keys, passwords, tokens or credentials.
- Use environment variables or an approved secrets-management mechanism.

### Data Protection
- Minimize collection of sensitive information.
- Protect user and learning data in transit and at rest where applicable.
- Do not expose private data in logs or AI prompts unnecessarily.

### Security Validation
[ENTER PROJECT-SPECIFIC SECURITY REQUIREMENTS]

---

## 14. File Structure

Use the following structure unless the project requirements require otherwise:

```text
project-root/
├── README.md
├── AGENTS.md
├── [frontend]/
├── [backend]/
├── [ai]/
├── [integration]/
├── [database]/
├── tests/
├── docs/
├── config/
└── .env.example
```

### Actual Project Structure
[ENTER FINAL FILE/FOLDER STRUCTURE]

Agents MUST place files in the appropriate existing directory rather than creating unnecessary duplicate folders.

---

## 15. Error Handling

The system MUST handle expected failures gracefully.

Examples:
- Invalid login
- Invalid file type
- File too large
- Corrupted document
- Empty learning material
- AI service unavailable
- AI response malformed
- iGOT API unavailable
- Database failure
- Network timeout
- Invalid user input

Users SHOULD receive clear, non-technical error messages while detailed technical information remains in secure logs.

---

## 16. Logging and Monitoring

- Log important application events.
- Do not log passwords, tokens, API keys or unnecessary personal data.
- Use appropriate log levels.
- Record failures needed for debugging.
- AI and external API failures SHOULD be traceable without exposing sensitive information.

### Monitoring Requirements
[ENTER MONITORING/LOGGING REQUIREMENTS]

---

## 17. Deadlines

### Project Start
[ENTER DATE]

### Major Milestones
[ENTER MILESTONES]

### Final Submission
[ENTER DEADLINE]

Agents MUST prioritize work according to the agreed milestone and deadline.

---

## 18. Definition of Done

A task is considered **Done** only when:

- [ ] The requested functionality is implemented.
- [ ] Code follows project coding standards.
- [ ] Existing functionality remains working.
- [ ] Appropriate tests are written and passing.
- [ ] Input validation is implemented.
- [ ] Error handling is implemented.
- [ ] Security requirements are satisfied.
- [ ] AI output is validated where applicable.
- [ ] External integrations are tested where applicable.
- [ ] Documentation is updated where required.
- [ ] No secrets or credentials are committed.
- [ ] The implementation matches the approved architecture.
- [ ] The feature has been reviewed against the original requirement.

### Final Acceptance Criteria
[ENTER PROJECT-SPECIFIC ACCEPTANCE CRITERIA]

---

## 19. Change Control

Before making a significant architectural change, the agent MUST:

1. Identify the reason for the change.
2. Explain the expected impact.
3. Check whether the existing architecture can satisfy the requirement.
4. Avoid unnecessary migration or rewrites.
5. Clearly document significant changes.

---

## 20. Final Agent Checklist

Before finishing any task, verify:

- [ ] I read `AGENTS.md`.
- [ ] I understood the existing architecture.
- [ ] I did not unnecessarily change the tech stack.
- [ ] I followed coding standards.
- [ ] I validated inputs.
- [ ] I handled errors.
- [ ] I considered security.
- [ ] I tested my changes.
- [ ] I validated AI-generated output where applicable.
- [ ] I did not expose secrets.
- [ ] I updated documentation when necessary.
- [ ] The implementation satisfies the requested requirement.
