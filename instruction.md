Build a modern Admin Dashboard for a university journal management system inspired by Open Journal Systems (OJS).

System Name:
JESAM Peer Review and Article Approval System (RER)

Theme:

- Green and white academic theme
- Modern SaaS dashboard style
- Elegant research/university branding
- Clean typography
- Responsive design

Tech Stack:

- React
- TypeScript
- Tailwind CSS
- React Router
- shadcn/ui
- Lucide React
- Recharts

Requirements:

- Use mock/sample data only
- Component-based architecture
- Responsive layout
- Professional UX/UI
- Smooth hover interactions
- Modern dashboard cards
- Reusable components

Main Layout:

- Collapsible sidebar
- Sticky top navbar
- Main content area
- Responsive mobile/tablet support

Sidebar Menu:

- Dashboard
- Article Management
- Plagiarism Checker
- Reviewer Management
- User Management
- Publication Settings

Pages:

1. Dashboard

- Statistics cards
- Workflow charts
- Submission analytics
- Recent submissions table
- Article status overview

2. Article Management

- Search/filter articles
- Article data table
- Article details drawer/modal
- Reviewer assignment
- Revision comments
- Approve/reject workflow
- Publish article
- Status badges:
    - Submitted
    - Under Review
    - Revision Required
    - Accepted
    - Rejected
    - Published

Include:

- AI article summary panel
- AI summary chat box
- Reviewer comments section
- Timeline activity log

3. Plagiarism Checker

- Upload manuscript UI
- Similarity score card
- Risk indicators
- Mock plagiarism report
- Visualization charts

4. Reviewer Management

- Reviewer cards/table
- Expertise tags
- Assignment tracking
- Review progress status

5. User Management

- User table
- Role assignment
- Activate/deactivate actions
- Add User modal (with form validation)

Design Requirements:

- Use modern cards and tables
- Rounded corners
- Soft shadows
- Consistent spacing
- Elegant status badges
- Analytics charts
- Professional academic feel

Folder Structure:

- /components
- /pages
- /data
- /types
- /layouts

Use reusable components wherever possible.

---

## Implementation Status

### Completed

All pages and components have been fully implemented.

**Packages installed:**
- `react-router-dom` — client-side routing
- `recharts` — charts and data visualizations

**Folder structure created:**

```
src/
  types/index.ts          — TypeScript types (Article, Reviewer, User, etc.)
  data/mockData.ts        — Mock articles (with unique HTML abstracts per article), reviewers, users, chart data
  contexts/
    AuthContext.tsx        — Auth context: currentUser, login(), logout(); persisted in sessionStorage
  layouts/MainLayout.tsx  — Root layout with Sidebar + Navbar + Outlet
  components/
    Sidebar.tsx           — Collapsible sidebar with active NavLink highlighting
    Navbar.tsx            — Sticky top bar with notifications, user avatar dropdown (profile + logout)
  pages/
    Login.tsx             — Full-page login screen with branding panel + form + demo accounts
    Dashboard.tsx         — Stats cards, AreaChart, PieChart, BarChart, recent table
    ArticleManagement.tsx — Article list with search/filter; navigates to /articles/:id
    ArticleDetail.tsx     — Standalone article detail page with 4-tab interface + sidebar
    CreateArticle.tsx     — Submit new article form with rich-text abstract editor (saves as HTML)
    PlagiarismChecker.tsx — Upload UI, RadialBar gauge, source BarChart, flagged sections report
    ReviewerManagement.tsx — Reviewer cards with expertise tags, stats, progress bar; "View Profile" navigates to /reviewers/:id
    ReviewerDetail.tsx    — Standalone reviewer detail page with full review history and performance metrics
    UserManagement.tsx    — User table with role/status controls + Add User modal; eye icon navigates to /users/:id
    UserDetail.tsx        — Comprehensive user activity page with article history, activity feed, permissions, quick actions
    PublicationSettings.tsx — Editable settings form (journal info, submission, plagiarism, notifications)
  App.tsx                 — AuthProvider + BrowserRouter; RequireAuth guard redirects to /login; nested routes under MainLayout
  index.css               — Tailwind import + .abstract-editor placeholder CSS
```

**Per-page details:**

**Login** (`Login.tsx`) — `/login`
- Full-page split layout: left branding panel (green gradient) + right white form panel
- Left panel: JESAM logo + leaf icon, system title ("Peer Review & Article Approval System"), three feature bullets, UP System footer; decorative radial circles
- Right panel: email input (with format validation), password input (with show/hide toggle), green "Sign In" button with loading spinner, global error message
- Demo accounts grid (2×2): Admin / Editor / Reviewer / Author — click to auto-fill email + password
- Mock auth: matches email against USRS; any password accepted for demo; failure shows inline error
- Session persisted in `sessionStorage` (survives page refresh but clears on tab close)
- `RequireAuth` wrapper in App.tsx: unauthenticated access to any route redirects to `/login`

**Navbar** (updated)
- Shows real logged-in user: avatar initials derived from `currentUser.name`, name + role shown on desktop
- Avatar is now a clickable button that opens a profile dropdown:
  - User card: avatar, full name, email, role badge
  - "View Profile" button → navigates to `/users/:id` for the current user
  - "Sign Out" button → calls `logout()` + navigates to `/login`
- Dropdown closes on outside click (via `mousedown` listener on `document`)
- Notification dropdown behaviour unchanged

**Dashboard**
- 6 stat cards: Total Articles, Under Review, Accepted, Published, Active Reviewers, Avg. Review Time
- AreaChart — submission trend (6 months) with submissions/accepted/rejected series
- PieChart — article status distribution (donut) with legend
- BarChart — reviewer activity (completed vs pending)
- Recent submissions table (last 5 articles)

**Article Management** (`ArticleManagement.tsx`)
- Search bar (title, author, ID) + status chip filters (All / Submitted / Under Review / Revision Required / Accepted / Rejected / Published)
- Articles table with similarity score color coding (green/amber/red)
- "View" button navigates to `/articles/:id` (ArticleDetail page)
- "Submit Article" button navigates to `/articles/new` (CreateArticle page)

**Create Article** (`CreateArticle.tsx`) — `/articles/new`
- Breadcrumb: Article Management → Submit New Article
- Two-column layout: left form (2/3) + right sidebar (1/3)
- Left — article metadata form:
  - Article title input with validation
  - Author name + email (side-by-side)
  - Category dropdown (10 JESAM categories)
  - Keywords tag input with Enter-to-add, × to remove, quick-add suggestion chips
  - Manuscript file upload (PDF / DOCX): drag-and-drop zone or click-to-browse; shows filename + size + × remove button after selection; accepts only .pdf/.docx with inline error for invalid types
- Left — abstract rich-text editor (blog-style, saves as HTML):
  - Formatting toolbar: **Bold**, *Italic*, H2, H3, P, Bullet list, Numbered list, Blockquote
  - `contentEditable` div using `document.execCommand` for formatting
  - Styled live preview with Tailwind arbitrary child selectors (h2, h3, p, ul, ol, blockquote)
  - `.abstract-editor` CSS class with `::before` placeholder (defined in `index.css`)
  - Error ring on empty submit attempt
- Client-side form validation with inline error messages
- Success state (spinner + message) then auto-redirect to `/articles` after 2.2 s
- Right sidebar: Submission Guidelines card, Abstract Editor Tips (keyboard reference), What Happens Next workflow steps

**Article Detail** (`ArticleDetail.tsx`) — `/articles/:id`
- Breadcrumb: Article Management → article ID
- Header card: title, author, category, submitted date, status badge
- Always-visible action buttons: Accept / Reject / Request Revision / Assign Reviewer / Publish / Download PDF (conditional on status)
- Two-column layout: left (2/3) + right sidebar (1/3)
- Left — pill tab navigation with 4 panels:
  - **Overview** — abstract rendered as styled HTML (`dangerouslySetInnerHTML`) with h2/p/ul/blockquote formatting; keyword chips; assigned reviewers list with star rating
  - **Reviewer Comments** — reviewer comment cards with recommendation tag + editorial note input
  - **AI Summary** — static AI-generated summary panel + live Claude chat with suggestion prompts
  - **Timeline** — activity log with emoji icons mapped per event type
- Right sidebar:
  - Article Details metadata card (ID, submitted, category, author, email, reviewer count, plagiarism score)
  - Status History mini-timeline (first 4 timeline events)
  - Current Status card with contextual description
- Not-found state with back button when article ID is invalid

**Plagiarism Checker**
- Drag-and-drop file upload (PDF/DOCX) + browse button
- Quick-check list of existing manuscripts
- RadialBarChart gauge showing similarity score
- Risk level indicator (Low / Moderate / High) with color and icon
- Quoted / Paraphrased / Original percentage breakdown
- Horizontal BarChart for source breakdown (journals, conferences, theses, etc.)
- Mock flagged sections report with highlighted text and source citations

**Reviewer Management** (`ReviewerManagement.tsx`)
- Summary stat bar (total reviewers, assigned, completed, avg rating)
- Search + Active/Inactive filter
- Reviewer cards (grid layout) showing:
  - Avatar with initials, institution, star rating
  - Expertise tags
  - Assigned / Completed / Pending stats
  - Review completion progress bar
  - "View Profile" button navigates to `/reviewers/:id`
- Pending reviews alert banner
- **Add Reviewer modal:**
  - Full name, email, institution fields
  - Expertise tag input (type + Enter or click Add; click × to remove)
  - Quick-add suggestion chips for common expertise areas
  - Active/Inactive status toggle
  - Client-side form validation with inline error messages
  - Success confirmation state before auto-close
  - Adds new reviewer to the top of the grid immediately
  - Avg. Rating stat card handles new reviewers with 0 rating gracefully

**Reviewer Detail** (`ReviewerDetail.tsx`) — `/reviewers/:id`
- Breadcrumb: Reviewer Management → reviewer ID + active/inactive badge
- Profile header card: avatar, name, institution, email, star rating, expertise tags, 4-stat strip (Total / Completed / Pending / Overdue)
- Two-column layout: left (2/3) + right sidebar (1/3)
- Left — Review History:
  - Status filter pills: All / Pending / Completed / Overdue / Declined
  - Sorted by assigned date (newest first)
  - Each row: article ID chip, category badge, title, author, assigned/due/completed dates, status badge with icon, recommendation badge (Accept / Minor Revision / Major Revision / Reject), star rating given
- Right sidebar:
  - Performance card: completion rate progress bar, reviewer score stars, avg article rating given, overdue count
  - Recommendations breakdown: bar chart per recommendation type with percentage
  - Expertise coverage: each tag with count of matched articles
  - Quick Actions: Contact (mailto link), Assign New Article button
- Not-found state with back button
- Data model: `ReviewRecord` type added to `types/index.ts` (articleId, title, author, category, assignedDate, dueDate, completedDate?, status, recommendation?, rating?); `Reviewer` interface extended with `institution` and `reviews: ReviewRecord[]`

**User Management** (`UserManagement.tsx`)
- Summary cards: total users, count per role
- Search + role filter + status filter
- Users table: avatar, name, email, inline role selector, status badge, joined/last active dates
- Eye icon button navigates to `/users/:id` (UserDetail page)
- Activate/Deactivate toggle per row
- **Add User modal:**
  - Full name, email, institution, temporary password fields
  - Visual role selector (4 cards with description)
  - Active/Inactive status toggle
  - Client-side form validation with inline error messages
  - Success confirmation state before auto-close
  - Adds new user to the top of the table immediately

**User Detail** (`UserDetail.tsx`) — `/users/:id`
- Breadcrumb: User Management → user ID + active/inactive badge
- Two-column layout: left (2/3) + right sidebar (1/3)
- Left — Profile header card: large avatar, name, role badge, institution, email, bio, meta row (joined, last active, account age in days, **article count highlighted in green per role**)
- Left — **Role-aware Articles section** (always visible, shows empty state when count is 0):
  - **Authors** — "Submitted Articles": article ID, category, title (→ ArticleDetail), submitted date, status badge, plagiarism score; header shows accepted/pending/rejected counts
  - **Reviewers** — "Review History": article ID, category, title, author, assigned date, review status badge (Pending/Completed/Overdue/Declined), recommendation badge, star rating; header shows completed/pending/overdue counts; data sourced from `REVS` matched by email
  - **Editors/Admins** — "Handled Articles": article ID, category, title, author, submitted date, article status badge; sourced from unique `JES-*` refs in activity cross-referenced with `ARTS`
- Left — Activity Feed with filter pills (All / Submissions / Reviews / Decisions / System):
  - Chronological timeline sorted newest-first
  - Each entry: colour-coded icon per `ActivityType`, type label badge, description, date, optional article ref chip
  - 12 distinct `ActivityType` values each with unique icon and colour: submission, revision, acceptance, rejection, publication, review_assigned, review_completed, login, profile_update, comment, settings_change, account_created
- Right sidebar:
  - Account Overview card with role-specific stats:
    - Authors: total submissions / published / under review / rejected
    - Reviewers: total assigned / completed / pending / overdue (from `REVS` match)
    - Editors/Admins: articles handled / decisions made / reviewers assigned / comments posted
  - Acceptance Rate card (Authors only): percentage + progress bar
  - Role & Permissions card: role badge + bullet list of permissions per role
  - Account Security card: ID, email, last active, member since, status
  - Quick Actions: Send Email (mailto), Deactivate/Activate toggle, Change Role, Delete Account
- Not-found state with back button
- Data model: `User` interface extended with `institution`, `lastActive`, `bio?`, `activity: UserActivity[]`, `submittedArticles?: UserArticleSummary[]`; new types `ActivityType`, `UserActivity`, `UserArticleSummary` added to `types/index.ts`

**Publication Settings**
- Grouped settings sections: Journal Information, Submission Guidelines, Plagiarism Policy, Notification Settings, Contact Information
- Mix of text inputs, number inputs, URL inputs, select dropdowns, and toggle switches
- Save / Discard buttons
