# 📘 Software Requirements Specification (SRS) - Pledge 365

**Project Title**: Pledge 365
**Prepared For**: NSS & Environmental Awareness Initiative
**Prepared By**: Ayush Gupta
**Version**: 1.3
**Last Updated**: July 2025
**Document Path**: `SRS.md`

---

## 1. Introduction

### 1.1 Purpose

Pledge 365 is a pioneering digital platform designed to promote environmental sustainability through direct tree adoption and year-long engagement. This mobile-first Progressive Web App (PWA) empowers students and eco-conscious individuals to adopt a real tree, meticulously track its growth through daily photo uploads, and inspire a community-driven movement towards a greener future. The primary objective is to foster long-term ecological care, individual environmental responsibility, and collective motivation for a measurable impact. The application integrates community building, gamification, advanced artificial intelligence, and faculty moderation to ensure sustained participation and impactful environmental contributions.

### 1.2 Document Conventions

This document follows standard Software Requirements Specification (SRS) guidelines.
- **Status Key:**
    - 🔲 = Implemented: Feature is fully developed and functional.
    - 🟡 = In Progress: Feature is under development or partially implemented.
    - 🔲 = Not Started: Feature development has not yet begun.
    - ❌ = Future Scope: Feature is planned for a later phase and not part of the current development cycle.
    - ⚠️ = Important Note/Warning: Indicates a critical detail or a known limitation.

### 1.3 Intended Audience and Reading Suggestions

This SRS document is critical for:
- **Student Users**: Understanding the app's functionalities for tree adoption, progress tracking, and community engagement.
- **Faculty Moderators**: Reviewing features related to content moderation, student performance tracking, and report generation.
- **Developers**: Guiding the technical implementation, backend integration, and adherence to system architecture.
- **UI/UX Designers**: Informing the visual and interactive design elements to ensure an intuitive and engaging user experience.
- **QA Team**: Establishing testing parameters and validating product performance, reliability, and security.
- **Stakeholders (NSS units, university management, environmental agencies)**: Providing a comprehensive overview of the project's objectives, scope, and expected outcomes.

### 1.4 Product Scope

Pledge 365 offers a comprehensive mobile-first progressive web application enabling users to:
- Securely register and log in. [[Updated: FR1, FR2, FR3, FR5 UI built]]
- Adopt a real tree by uploading an initial image with GPS coordinates and a timestamp. [[Updated: FR8 UI built]]
- Provide regular geotagged image updates with descriptive captions to document tree growth.
- Visualize their adopted tree's growth timeline through a chronological display of uploaded entries.
- Engage with a social community feed showcasing tree updates from across the campus. [[Updated: FR17 UI built]]
- Receive personalized AI-driven insights for tree health, optimized captions, and weather-based care tips.
- Obtain moderation feedback from faculty members.
- Earn digital coins and badges, advance through Eco Levels, and view their ranking on a global leaderboard. [[Updated: FR26 UI built]]
- Automatically generate timelapse videos illustrating their tree's growth over time.
- Receive timely notifications for tree care reminders and environmental events.
- Export detailed reports and certificates upon successful completion of their year-long pledge.

The platform is designed for high scalability, mobile responsiveness, and real-time interactivity, leveraging a robust technology stack including Firebase, Cloudinary, and advanced AI APIs.

### 1.5 References

- Design Document: `design.md` (Included in this document for completeness)
- Tech Stack Overview: `TECHSTACK.md` (Included in this document for completeness)
- Previous SRS Documentation: `SRS_doc.txt`, `SRS.txt` (Consolidated into this document)

---

## 2. Overall Description

### 2.1 Product Perspective

Pledge 365 is envisioned as a standalone Progressive Web App (PWA), designed to operate independently without reliance on any legacy systems. It is engineered for reliable performance across diverse mobile devices and desktop environments, with future releases planning full offline capability via Service Workers.

**Core Architecture Components:**
- **Frontend**: Utilizes HTML5, CSS3, and modular JavaScript for a dynamic and responsive user interface.
- **Backend**: Powered by Firebase Authentication for secure user management and Firebase Firestore as a NoSQL database for flexible data storage.
- **Media Management**: Cloudinary is employed for efficient image compression, optimized storage, and advanced media transformations, including timelapse video generation.
- **Artificial Intelligence**: Integrates Gemini for intelligent caption suggestions and Google Vision API for comprehensive plant health analysis.
- **External APIs**: Incorporates OpenWeatherMap for environment-specific alerts and a QR code generator for unique tree profiles.

### 2.2 Product Functions

The core functional capabilities of the Pledge 365 system include:
- Comprehensive user authentication and account management. [[FR1, FR2, FR3, FR5 UI built]]
- Streamlined tree adoption form submission and personalized tree profile creation. [[FR8 UI built]]
- Facilitating regular image and location-based updates for continuous tree progress tracking. [[FR16 UI built]]
- Enabling users to view their tree's timeline and generating automated growth videos.
- Supporting community engagement through a social feed with interactive features (likes, comments). [[FR17 UI built]]
- AI-driven analysis of uploaded image quality, tree health diagnosis, and intelligent caption enhancement.
- Implementing gamification elements such as Eco Levels, digital coins, and achievement badges. [[FR26 UI built]]
- Providing a robust moderation dashboard for faculty members to oversee content.
- Generating class-wise reports, managing post approvals, and providing analytics for administrators.

### 2.3 User Classes and Characteristics

| Role           | Skill Level                | Key Responsibilities                                                     | Current Status |
| :------------- | :------------------------- | :----------------------------------------------------------------------- | :------------- |
| **Student**    | Basic smartphone/web usage | Adopt trees, upload daily updates, engage with community, earn rewards.  | 🔲             |
| **Faculty**    | Moderate technical skills  | Review and approve posts, export data, compare student performance.      | 🟡 (UI built, backend logic pending) |
| **Developer**  | High                       | Develop frontend, backend, APIs, maintain infrastructure.                | 🔲             |
| **QA & UX**    | Intermediate               | Test usability, performance, validate UI standards, user flows.          | 🔲             |
| **Admin**      | High                       | Platform management, analytics, user privileges (Future).                | ❌             |
| **Community Viewer** | Basic smartphone/web usage | View other users' public trees (Future).                               | ❌             |

### 2.4 Operating Environment

The Pledge 365 PWA is designed for optimal performance on modern web browsers. It requires:
- **Browser Compatibility**: Latest versions of Google Chrome, Mozilla Firefox, Apple Safari, and Microsoft Edge.
- **Device Capabilities**: Essential functionality relies on GPS and camera access permissions for location tagging and image uploads.
- **Connectivity**: Initial uploads and data synchronizations require active internet access. Offline capabilities are planned for future releases.

### 2.5 Design and Implementation Constraints

- **API Rate Limits**: Reliance on AI services (Gemini, Google Vision API) and external APIs (OpenWeatherMap) is subject to their respective rate limits and usage policies.
- **Cloudinary Storage Tiers**: Image and video storage volume on Cloudinary is managed based on the selected tier, influencing available capacity.
- **Security Protocols**: Implementation must adhere strictly to Firebase security rules and data validation to protect user data and ensure secure access.
- **Mobile-First Design**: The application prioritizes mobile user experience, requiring responsive design principles across all components.
- **Localization**: Initial development supports English, with future plans for multi-language support.

### 2.6 Assumptions and Dependencies

- **User Digital Literacy**: Assumes users possess fundamental digital literacy for navigating mobile applications and web interfaces.
- **Internet Connectivity**: Assumes at least intermittent internet access for data synchronization and core functionalities.
- **Firebase Configuration**: Depends on a properly configured Firebase project, including billing tier setup and secure service rules.
- **API Key Management**: Assumes all external APIs (OpenWeatherMap, Google Vision, QR Generator) are secured with valid and active API keys.
- **Cloudinary Setup**: Assumes correct Cloudinary account setup and integration for media handling.

---

## 3. System Features (Functional Requirements)

### 3.1 Authentication Module
- **FR1: User Registration**: Users can sign up using their email and password. (Initial: LocalStorage 🔲; Target: Firebase Auth 🟡 UI built)
- **FR2: User Login**: Users can securely log in with their registered email and password. (Initial: LocalStorage 🔲; Target: Firebase Auth 🟡 UI built)
- **FR3: Social Login**: Users can log in using their Google account. (🟡 UI built)
- **FR4: Password Reset**: Provides a secure mechanism for users to reset forgotten passwords. (🔲)
- **FR5: Session Management**: Maintains user login sessions for persistent access until explicit logout or session expiry. (🟡 UI built)
- **FR6: Role-Based Access Control**: Assigns and manages user roles (Student, Faculty, Admin - future) to control access to specific features and data. (🔲)
- **FR7: Authentication Rules**: All application routes and data access are protected by Firebase security rules and client-side validation. (🟡 Basic rules in place)

### 3.2 Tree Adoption Module
- **FR8: Tree Adoption Form**: Allows users to adopt a tree by submitting its name, uploading an initial image, specifying the adoption date, and capturing GPS location. (UI implemented, GPS auto-fetch UI and full address fetching implemented)
- **FR9: Unique Tree ID Generation**: Automatically generates a unique identifier for each adopted tree using Firestore's document ID. (🔲)
- **FR10: One-Tree Policy**: Enforces a limit of one adopted tree per user per year (configurable setting). (🔲)
- **FR11: Data Storage**: All tree adoption details are securely stored in the `trees/` collection within Firebase Firestore. (🔲)

### 3.3 Upload & Timeline Module
- **FR12: Progress Upload**: Students can upload geotagged photos with descriptive captions to document their tree's growth. (Implemented in community feed 🔲)
- **FR13: Image Storage**: Uploaded images are stored in Cloudinary, with references linked within Firestore. (UI implemented, Image preview added)
- **FR14: Location Auto-Fill**: Automatically fetches real-time GPS coordinates from the user's browser during image uploads. (UI implemented, Fetches full address)
- **FR15: Timeline Display**: Users can view their adopted tree's growth in a chronological timeline on their dedicated "My Tree" page. (🟡 UI built, data pending)
- **FR16: Quick Upload**: Provides a convenient one-click upload option from the dashboard via a "Create Post" button. (🔲 UI built)

### 3.4 Community Feed
- **FR17: Public Post Visibility**: All verified and approved tree updates appear in a public community feed, accessible to all users. (🔲 UI built, mock data)
- **FR18: User Interactions**: Users can like and comment on posts within the community feed. (🟡 UI built, backend logic pending)
- **FR19: Content Filtering**: Enables users to filter posts by department, class, date, or proximity. (🟡 Date filter UI built, department/class removed, functionality pending)
- **FR20: Report Content**: Provides a mechanism for users to flag inappropriate content for moderation review. (🔲)

### 3.5 Profile Management
- **FR21: Profile View**: Displays user's profile image, name, college/school name, adopted tree details (name, type, adoption date), and overall statistics (tree count, uploads, badges). (🔲 UI built with mock data)
- **FR22: Edit Profile**: Allows users to update their profile image, name, and bio. (🟡 UI built, functionality pending)
- **FR23: Tree QR Code Generation**: Generates a shareable QR code linked to the tree's unique ID for physical identification. (🟡 UI built, functionality pending)
- **FR24: Timelapse Player**: Provides a visual summary of the tree's growth over time through an automated timelapse video player. (🟡 UI built, functionality pending)

### 3.6 Leaderboard & Gamification
- **FR25: Coin System**: Users earn digital coins for various activities, including uploads, engagement, and maintaining streaks. (Earning coins implemented 🔲)
- **FR26: Leaderboard View**: Displays rankings based on user engagement and achievements, with filtering options by day, week, class, or campus. (🔲 UI built with static data)
- **FR27: Badge System**: Awards milestone badges (e.g., 7-day streak, 50 coins) to recognize user achievements. (🟡 UI built with static badges)
- **FR28: Eco Levels**: Implements a dynamic ranking system (e.g., Seedling → Tree Guardian → Tree Hero) based on user contributions. (🔲)
- **FR29: Class vs Class Challenges**: Facilitates competitive challenges between different classes. (🔲)

### 3.7 Faculty Dashboard
- **FR30: Moderation Queue**: Provides a list of pending uploads for faculty review and approval. (🟡 UI built with static data)
- **FR31: Approval/Rejection Tools**: Enables faculty to approve or reject content directly from the queue, with options for providing feedback. (🟡 UI built with static data)
- **FR32: Report Export**: Allows faculty to generate and export CSV/PDF reports of user performance and engagement. (🔲)
- **FR33: Section Comparison**: Provides tools to analyze class-wide participation and content quality. (🔲)
- **FR34: Filter by Department/Class**: Faculty can filter student activities and reports by department or class. (🔲)

### 3.8 AI Features
- **FR35: Tree Health Analyzer**: Utilizes AI to detect signs of dryness, leaf color issues, and other health indicators from uploaded tree images. (Implemented via `analyze-tree-image` flow 🔲)
- **FR36: Species Detector**: Recognizes the tree species from the uploaded image. (Implemented via `analyze-tree-image` flow 🔲)
- **FR37: Dead/Unhealthy Tree Detection**: Identifies and flags images of dead or unhealthy trees. (Implemented via `analyze-tree-image` flow 🔲)
- **FR38: Caption Enhancer**: Suggests improved and more engaging captions for user posts via Gemini. (Implemented and functional 🔲)
- **FR39: Content Safety**: Scans uploaded images for inappropriate content (e.g., nudity, violence) before they are pushed to the community feed. (Implemented via `detect-inappropriate-content` flow 🔲)
- **FR40: Faculty Review Queue Integration**: Sends flagged content to the faculty review queue for manual verification. (🟡 Backend logic pending)

### 3.9 Timelapse & QR Integration
- **FR41: Media Aggregation**: Gathers all uploaded images for a specific tree based on its unique tree ID. (🔲)
- **FR42: Video Builder**: Generates a slideshow-style video (timelapse) of the tree's growth using Cloudinary. (🔲)
- **FR43: QR Generator**: Integrates with an external API to generate and render a downloadable QR code for each tree profile. (🔲)

### 3.10 Notifications
- **FR44: Care Alerts**: Sends weather-based notifications to users (e.g., "Water me today," "Too dry today!") to remind them of tree care. (🔲)
- **FR45: Badge Alerts**: Provides congratulatory pop-ups or notifications when users earn new badges or reach milestones. (🔲)
- **FR46: Reminders**: Sends push notifications for missed weekly updates or other important events. (🔲)

---

## 4. Non-Functional Requirements

### 4.1 Performance Requirements
- **NFR1.1: Dashboard Load Time**: The tree dashboard should load within 2 seconds on a 4G connection. (Initial load is fast 🔲)
- **NFR1.2: Image Compression**: Images are compressed and optimized by Cloudinary for faster delivery. (🔲)
- **NFR1.3: User Concurrency**: The system should support 500+ daily active users concurrently. (🔲 Not applicable for client-side LocalStorage, target for production)

### 4.2 Scalability Requirements
- **NFR2.1: Cloud Hosting**: Cloud-hosted via Firebase to ensure inherent scalability and handle increasing user loads (designed for 1000+ concurrent users). (Configured by default 🔲)
- **NFR2.2: Cloud Functions**: Utilize Cloud Functions for AI tasks and other backend processes to ensure scalable and efficient execution. (🔲)

### 4.3 Security Requirements
- **NFR3.1: Authentication Control**: All access to the application and data is controlled by Firebase Authentication and Firestore validation rules. (Basic rules in place 🟡)
- **NFR3.2: Data Validation**: Implement robust Firestore data validation rules to prevent unauthorized data manipulation. (🔲)
- **NFR3.3: File Limits**: Enforce file size and file type limits for all uploads to prevent malicious content and manage storage. (🔲)
- **NFR3.4: Secure Auth/Logout**: Ensure secure authentication and logout processes. (⚠️ Current LocalStorage implementation is not secure for sensitive data in production; server-side auth is required.)

### 4.4 Usability Requirements
- **NFR4.1: Mobile-First Design**: The interface is mobile-first, intuitive, and highly responsive across all screen sizes. (All pages are responsive 🔲)
- **NFR4.2: Dark Mode**: Provides an app-wide persistent dark mode option for enhanced user comfort. (Implemented 🔲)
- **NFR4.3: Clear Navigation**: Features clear and intuitive navigation with a bottom navigation bar for key sections (Home, Feed, Add, Profile, Leaderboard) and a sidebar/tabs for sub-sections. (Implemented 🔲)
- **NFR4.4: UX Elements**: Utilizes responsive cards, modals, and alerts for an improved user experience.

### 4.5 Accessibility Requirements
- **NFR5.1: WCAG Compliance**: Adheres to WCAG 2.1 guidelines, including proper color contrast, ARIA roles, and alt tags for images. (In progress 🔲)

### 4.6 Localization Requirements
- **NFR6.1: Language Support**: Initially supports English, with an architecture designed for future expansion to multiple languages.

### 4.7 Image Handling Requirements
- **NFR7.1: Optimization**: Cloudinary automatically compresses, transforms, and optimizes image delivery for various devices and network conditions.

### 4.8 Backup and Recovery Requirements
- **NFR8.1: Automatic Backups**: Automatic Firestore backups are enabled, providing daily snapshots of the database.

### 4.9 Offline Handling Requirements
- **NFR9.1: PWA Offline Capability**: Planned implementation of offline capabilities via Service Workers for the PWA shell. (Planned via Service Workers 🔲)

### 4.10 Deployment Requirements
- **NFR10.1: Hosting**: Deployed using Firebase Hosting, secured with HTTPS for encrypted communication. (PWA enabled 🔲)

---

## 5. External Interface Requirements

### 5.1 User Interfaces
- **UI1**: Mobile-friendly progressive web application UI. [[UI is built and responsive]]
- **UI2**: Bottom navigation bar for primary sections: Home, Feed, Add, Profile, Leaderboard. [[Implemented with active state animations]]
- **UI3**: Faculty dashboard with interactive data tables, filtering options, and export tools.
- **UI4**: Responsive cards, modal dialogs, and alert messages for optimal user feedback and interaction.

### 5.2 Hardware Interfaces
- **HW1**: **Smartphone GPS Support**: Utilizes the geolocation API for precise location tagging during tree adoption and progress uploads.
- **HW2**: **Camera Usage**: Supports camera access via the browser's media capture API for direct image uploads.
- **HW3**: **Barcode/QR Reader Support**: Future integration for scanning QR codes linked to physical tree IDs.

### 5.3 Software Interfaces
- **SW1**: **Firebase Authentication**: For secure user login, registration, and session management.
- **SW2**: **Firebase Firestore**: Primary NoSQL database for storing all application data (users, trees, uploads, comments).
- **SW3**: **Cloudinary**: For robust image and video storage, processing, and delivery (including timelapse generation).
- **SW4**: **OpenWeatherMap API**: Used for fetching real-time weather data to provide weather-based tree care suggestions and alerts.
- **SW5**: **Gemini/Genkit (Google AI Platform)**: Integrated for advanced AI capabilities such as AI caption enhancement and intelligent tree health analysis.
- **SW6**: **QR Generator API**: Used to generate unique QR codes for tree profiles.

---

## 6. Data Model (Firestore Schema)

The following outlines the high-level Firestore collection and document structure:

```
users/
  └── {userId}: {
         name: string,
         email: string,
         role: 'student' | 'faculty' | 'admin',
         photo: string (URL to profile image),
         class: string (optional),
         dept: string (optional),
         stats: {
             treesAdopted: number,
             totalUploads: number,
             coins: number,
             badgesEarned: string[],
             ecoLevel: string
         },
         joinDate: timestamp
       }

trees/
  └── {treeId}: {
         userId: string (reference to users/{userId}),
         treeName: string,
         dateAdopted: timestamp,
         gps: { latitude: number, longitude: number },
         status: 'healthy' | 'unhealthy' | 'dead' | 'unknown',
         species: string (optional, AI detected),
         locationDescription: string (optional),
         initialImage: string (URL to Cloudinary image),
         public: boolean (whether visible in community feed)
       }

uploads/
  └── {uploadId}: {
         treeId: string (reference to trees/{treeId}),
         userId: string (reference to users/{userId}),
         imageUrl: string (URL to Cloudinary image),
         caption: string,
         location: { latitude: number, longitude: number },
         timestamp: timestamp,
         mood: string (optional, e.g., 'happy', 'proud'),
         aiAnalysis: {
             healthStatus: 'healthy' | 'unhealthy' | 'dead' | 'unknown',
             speciesConfidence: number (0-1),
             safetyStatus: 'safe' | 'flagged'
         },
         moderationStatus: 'pending' | 'approved' | 'rejected'
       }

comments/
  └── {commentId}: {
         postId: string (reference to uploads/{uploadId}),
         userId: string (reference to users/{userId}),
         comment: string,
         timestamp: timestamp
       }

badges/
  └── {badgeId}: {
         userId: string (reference to users/{userId}),
         type: 'streak' | 'milestone' | 'ecoLevel',
         name: string,
         description: string,
         dateEarned: timestamp
       }

leaderboard/
  └── {userId}: { // This might be a denormalized collection or a view
         coins: number,
         rank: number,
         uploadsCount: number,
         streakDays: number,
         lastUpdateTimestamp: timestamp
       }

reports/
  └── {reportId}: {
         reportedPostId: string (reference to uploads/{uploadId}),
         reportedByUserId: string (reference to users/{userId}),
         reason: string,
         timestamp: timestamp,
         reviewedBy: string (reference to users/{userId} for faculty),
         status: 'pending' | 'resolved' | 'dismissed'
       }
```

---

## 7. Technology Stack

### Frontend
- **Core Languages**: HTML5, CSS3, JavaScript (Vanilla, modular design) [[Confirmed]]
- **Frameworks/Libraries**: Next.js (for structured development), Tailwind CSS (for rapid UI styling), TypeScript (for type safety), ShadCN UI (for pre-built accessible components). [[Updated: HTML/CSS/JS only. Libraries not used so far]]
- **Mobile Responsiveness**: Fully responsive design ensuring optimal experience across all device sizes. [[Implemented]]
- **Component Architecture**: Modular component-based design for reusability and maintainability.

### Backend (Serverless)
- **Authentication**: Firebase Authentication (supports Email/Password, Google OAuth).
- **Database**: Firebase Firestore (NoSQL database for flexible and scalable data storage).
- **Cloud Functions**: For server-side logic, AI integrations, and background tasks (e.g., image analysis, timelapse generation).
- **Hosting**: Firebase Hosting (for PWA deployment, CDN delivery, and HTTPS).

### Image & Media Management
- **Primary Service**: Cloudinary (for optimized image/video uploads, storage, transformations, and CDN delivery).

### AI Services
- **AI Platform**: Google AI Platform (for underlying AI services).
- **Generative AI**: Gemini (for advanced natural language tasks like caption suggestions and tree care advice).
- **AI Orchestration**: Genkit (for building robust AI-powered flows and integrations).
- **Vision AI**: Google Vision API (for detailed image analysis, including tree health and species recognition).

### External APIs
- **Weather Data**: OpenWeatherMap API (for real-time weather information and environmental alerts).
- **QR Code Generation**: Dedicated QR Generator API.

### Developer Tools & Practices
- **Version Control**: GitHub (for collaborative development, code hosting, and version control).
- **UI/UX Design**: Visily.ai / Figma (for wireframing, prototyping, and UI mockups).
- **Code Quality**: ESLint & Prettier (for consistent code formatting and linting).
- **Performance Auditing**: Lighthouse (for web performance, accessibility, and SEO auditing).
- **Project Management**: Notion or Trello (for task tracking and project organization).
- **CI/CD**: GitHub Actions (for automated testing and deployment pipelines, future).

---

## 8. Current Status & Future Enhancements

### 8.1 Current Development Status

The project is currently in the initial development phase, focusing on core functionalities and establishing a robust foundation.

| Feature Area             | Specific Feature / Component                  | Status Key | Details / Notes                                                                                             |
| :----------------------- | :-------------------------------------------- | :--------- | :---------------------------------------------------------------------------------------------------------- |
| **Authentication**       | Role-based login system                       | 🔲         | Secure authentication is in place.                                                                          |
|                          | Email/password login                          | 🟡         | UI built.                                                                                                   |
|                          | Forgot password, session persistence          | 🟡         | UI built.                                                                                                   |
| **UI/UX**                | UI Scaffolding: All primary pages & navigation | 🔲         | All primary pages (Home, Feed, Profile, Leaderboard, Create Post) and navigation are built.                  |
|                          | Fully responsive (mobile-first)               | 🔲         | All pages are responsive.                                                                                   |
|                          | Dark Mode                                     | 🔲         | App-wide persistent dark mode implemented.                                                                  |
|                          | Accessibility (alt tags, semantic HTML)       | 🟡         | Basic alt tags added. In progress.                                                                          |
|                          | Modern Icon Integration                       | 🔲         | Font Awesome icons integrated across all pages.                                                             |
|                          | Enhanced Bottom Navigation                    | 🔲         | Buttons have smooth color transitions and icon enlargement on click.                                        |
|                          | Standardized Default Images                   | 🔲         | User avatar (user-pic.png) and tree post (Tree.png) default images are set.                               |
|                          | Refined Home Page Layout                      | 🔲         | User summary and simplified latest uploads section implemented.                                             |
|                          | Detailed Feed Post Cards                      | 🔲         | Post cards display detailed user info (name, streak, eco-level) and tree details in a grid.                 |
| **Tree Adoption**        | Core adoption flow & post gallery             | 🔲         | Core form UI for tree adoption (create-post.html) is implemented. (Improved design, calendar icon for date)
|                          | Tree form (name, image, GPS, date)            | 🔲         | Core form implemented with date filter default value. GPS auto-location tagging is pending.                 |
|                          | Unique Tree ID generation                     | 🔲         | Implemented via Firestore's `doc()`.                                                                        |
|                          | Store metadata in Firestore                   | 🔲         | Implemented.                                                                                                |
| **Upload Progress**      | Upload images, add captions                   | 🔲         | Implemented in community feed.                                                                              |
|                          | Display in tree timeline                      | 🔲         | Implemented on My Tree page.                                                                                |
|                          | One-click upload from dashboard               | 🔲         | Implemented via "Create Post" button in community.                                                          |
| **Community Feed**       | Display public updates from all users         | 🔲         | Implemented and displayed in a grid format.                                                                 |
|                          | User Interactions                             | 🟡         | UI built, backend logic pending.                                                                            |
|                          | Content Filtering                             | 🟡         | Date filter UI built, department/class filters removed. Functionality pending.                              |
| **AI Features**          | AI Tree Health Analysis                       | 🔲         | Analyzes uploaded images for leaf health, auto species recognition, and detects dead/unhealthy trees via `analyze-tree-image` flow. |
|                          | AI Care Guide                                 | 🔲         | Provides tips and suggestions, and recommends better captions via Gemini/Genkit. Implemented and functional. |
|                          | Spam/Content Detection                        | 🔲         | Flags inappropriate content via `detect-inappropriate-content` flow.                                        |
| **Gamification**         | Pledge Coins: earn & redeem                   | 🔲         | Earning coins is implemented.                                                                               |
| **Backend**              | Auto-scaling Firebase backend                 | 🔲         | Configured by default.                                                                                      |

### 8.2 Future Enhancements

The following features are planned for future development phases:
- **Authentication**: Google OAuth integration for social login.
- **Tree Adoption**: Full CRUD (Create, Read, Update, Delete) functionalities for adopted trees.
- **Community Feed**: Implementation of "Like," "Comment," and "Share" functionalities, along with advanced filtering options (class, department, date, proximity).
- **Profile Management**: Full implementation of profile image upload and the tree growth timelapse viewer.
- **Leaderboard & Gamification**: Backend logic for dynamic ranking based on engagement and streaks, full badge system implementation, and class vs. class challenges.
- **Faculty Dashboard**: Backend logic for viewing all student activity, moderating flagged content, comparing engagement across sections, and exporting user reports as CSV/PDF.
- **AI & Smart Features**: Full integration of flagged content into the faculty review queue, timelapse video generation, and weather-based notifications using OpenWeather API.
- **Database**: Transition from LocalStorage to Firebase Firestore for all user and tree data.
- **User Interface**: Enhancing UI/UX for user feedback (replacing `alert()`s).
- **Input Validation**: Implementing robust input validation across all forms.
- **Admin Features**: Development of a dedicated admin analytics dashboard for higher-level control.
- **Advanced Tree Visualization**: AR Tree Scanner and Map View (using Mapbox/Leaflet) for visualizing all adopted trees.
- **Certificates**: Automated certificate generation after 365 days of successful tree care.
- **In-App Assistant**: Integration of an in-app chatbot (PledgeBot) for tree care tips and support.
- **Offline Capabilities**: Comprehensive offline-first update caching using IndexedDB or LocalStorage.
- **NFC Integration**: Future integration with NFC tags for real-world Tree ID linkage.
- **Leaderboard Expansion**: Department leaderboard and tree density heatmap.

---

## 9. Appendix

- **UI/UX Assets**: Links to Visily/Figma mockups and UI wireframes.
- **Firebase Configuration**: Secure Firebase Console project ID and API keys.
- **Cloudinary Setup**: Details on Cloudinary folder structure and API configurations.
- **Version Control**: Link to GitHub repository with commit history, issue tracking, and CI/CD status.
- **Project Management**: Links to Notion or Trello boards for task tracking.
- **Design Guidelines**: Defined color palette, typography system, and icon sets.
- **User Flows**: Comprehensive user journey diagrams and sitemap.
- **Deployment Checklist**: Detailed steps for application deployment.
- **Project Timeline**: High-level project development timeline.
