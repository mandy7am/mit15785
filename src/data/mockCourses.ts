import { Course, CourseBundle } from "@/types/course";

export const REQUIRED_COURSES: Course[] = [
  { id: "r1", code: "15.010", title: "Economic Analysis for Business Decisions", credits: 9, description: "Introduces principles of microeconomics as a framework for making more informed managerial decisions.", timeSlot: "TBA", day: "TBA", isRequired: true, category: "Core", semester: "Spring", evaluation: { professor: "N. Kala & M. Demirer", rating: 6.2, respondents: 142, highlights: ["Excellent case studies", "Engaging lectures"] } },
  { id: "r2", code: "15.060", title: "Data, Models, and Decisions", credits: 9, description: "Introduces students to the basic tools in using data to make informed management decisions.", timeSlot: "TBA", day: "TBA", isRequired: true, category: "Core", semester: "Spring", evaluation: { professor: "C. Podimata & R. Ramakrishnan", rating: 5.8, respondents: 156, highlights: ["Hands-on spreadsheet work", "Broad coverage"] } },
  { id: "r3", code: "15.280", title: "Communication for Leaders", credits: 9, description: "Students develop and polish communication strategies and methods through discussion, examples, and practice.", timeSlot: "TBA", day: "TBA", isRequired: true, category: "Core", semester: "Spring", evaluation: { professor: "N. Hartman", rating: 6.5, respondents: 128, highlights: ["Transformative feedback", "Small group practice"] } },
  { id: "r4", code: "15.270", title: "Ethical Practice: Leading Through Professionalism", credits: 6, description: "Introduction to ethics in business, with a focus on business management.", timeSlot: "1:00–2:30", day: "Mon/Wed", isRequired: true, category: "Core", semester: "Spring", evaluation: { professor: "L. Hafrey", rating: 6.0, respondents: 98, highlights: ["Thought-provoking discussions", "Great guest speakers"] } },
  { id: "r5", code: "15.002", title: "Leadership Challenges for an Inclusive World", credits: 0, description: "Units assigned to MBA students upon completion. Restricted to Sloan MBA students.", timeSlot: "TBA", day: "TBA", isRequired: true, category: "Core", semester: "Spring" },
];

export const ELECTIVE_COURSES: Course[] = [
  // Finance & Economics
  { id: "e1", code: "15.025", title: "Game Theory for Strategic Advantage", credits: 9, description: "Develops and applies principles of game theory relevant to managers' strategic decisions.", timeSlot: "10:00–11:30", day: "Tue/Thu", isRequired: false, category: "Finance", semester: "Spring", evaluation: { professor: "A. Bonatti", rating: 6.7, respondents: 89, highlights: ["Brilliant lecturer", "Mind-bending strategy exercises"] } },
  { id: "e2", code: "15.012", title: "Applied Macro- & International Economics", credits: 9, description: "Explores the macroeconomic environment in which firms operate.", timeSlot: "TBA", day: "TBA", isRequired: false, category: "Finance", semester: "Spring", evaluation: { professor: "A. Makarin & R. Rigobon", rating: 6.4, respondents: 112, highlights: ["Real-world case studies", "Dynamic duo teaching"] } },
  { id: "e3", code: "15.216", title: "Central Banks, Monetary Policy & Global Financial Markets", credits: 9, description: "Explores the role of central banks and monetary policy in the global economy.", timeSlot: "4:00–5:30", day: "Tue/Thu", isRequired: false, category: "Finance", semester: "Spring", evaluation: { professor: "A. Orphanides", rating: 6.3, respondents: 67, highlights: ["Former central banker insights", "Timely and practical"] } },
  { id: "e4", code: "15.218", title: "Global Economic Challenges & Opportunities", credits: 9, description: "In-depth analysis of the major risks and opportunities in the global economy.", timeSlot: "8:30–10:00", day: "Tue/Thu", isRequired: false, category: "Finance", semester: "Spring", evaluation: { professor: "K. Forbes", rating: 6.8, respondents: 95, highlights: ["World-class expertise", "Best macro class at Sloan"] } },
  { id: "e5", code: "15.014", title: "Applied Macro- & International Economics II", credits: 6, description: "Establishes understanding of the development processes of societies and economies.", timeSlot: "8:30–10:00", day: "Mon/Wed", isRequired: false, category: "Finance", semester: "Spring", evaluation: { professor: "R. Rigobon", rating: 6.6, respondents: 78, highlights: ["Energetic teaching style", "Eye-opening content"] } },

  // Analytics & Technology
  { id: "e6", code: "15.053", title: "Optimization Methods in Business Analytics", credits: 12, description: "Introduces optimization methods with a focus on modeling, solution techniques, and analysis.", timeSlot: "10:00–11:30", day: "Mon/Wed", isRequired: false, category: "Technology", semester: "Spring", evaluation: { professor: "J. Orlin & T. Magnanti", rating: 6.1, respondents: 134, highlights: ["Legendary professors", "Challenging but rewarding"] } },
  { id: "e7", code: "15.0711", title: "The Analytics Edge", credits: 12, description: "Develops models and tools of data analytics used to transform businesses and industries.", timeSlot: "1:00–2:30", day: "Tue/Thu", isRequired: false, category: "Technology", semester: "Spring", evaluation: { professor: "H. Lu", rating: 6.5, respondents: 108, highlights: ["Great R programming intro", "Fascinating real-world datasets"] } },
  { id: "e8", code: "15.076", title: "Analytics for a Better World", credits: 12, description: "Introduces predictive and prescriptive analytics methods to solve problems that contribute to the welfare of society.", timeSlot: "11:30–1:00", day: "Mon/Wed", isRequired: false, category: "Technology", semester: "Spring", evaluation: { professor: "D. Den Hertog", rating: 6.3, respondents: 72, highlights: ["Impactful projects", "Julia programming exposure"] } },
  { id: "e9", code: "15.236", title: "Global Business of AI & Robotics", credits: 6, description: "Discussion-based course examining applications of AI and robotics in the business world.", timeSlot: "1:00–2:30", day: "Tue/Thu", isRequired: false, category: "Technology", semester: "Spring", evaluation: { professor: "J. Ruane & S. Johnson", rating: 6.4, respondents: 85, highlights: ["Amazing guest speakers", "Cutting-edge topics"] } },
  { id: "e10", code: "15.224", title: "Global Business of Quantum Computing", credits: 3, description: "Explores the commercial, economic, and geopolitical implications of quantum computing.", timeSlot: "4:00–5:30", day: "Wed", isRequired: false, category: "Technology", semester: "Spring", evaluation: { professor: "J. Ruane & W. Oliver", rating: 6.1, respondents: 42, highlights: ["Frontier technology overview", "No technical background needed"] } },

  // Leadership & Communication
  { id: "e11", code: "15.274", title: "Storytelling: Leadership through Narrative", credits: 9, description: "Develops storytelling as an essential leadership skill to help leaders communicate decisions and drive action.", timeSlot: "10:00–11:30", day: "Tue/Thu", isRequired: false, category: "Leadership", semester: "Spring", evaluation: { professor: "M. Kazakoff", rating: 6.9, respondents: 56, highlights: ["Life-changing class", "Intense but worth it"] } },
  { id: "e12", code: "15.281", title: "Advanced Leadership Communication", credits: 9, description: "Introduces interactive oral and interpersonal communication skills critical to leaders.", timeSlot: "1:00–2:30", day: "Mon/Wed", isRequired: false, category: "Leadership", semester: "Spring", evaluation: { professor: "N. Hartman", rating: 6.6, respondents: 74, highlights: ["Personalized coaching", "Builds real confidence"] } },
  { id: "e13", code: "15.269", title: "Leadership Stories: Literature, Ethics & Authority", credits: 9, description: "Explores how we use story to articulate ethical norms through short fiction, novels, plays, and films.", timeSlot: "TBA", day: "TBA", isRequired: false, category: "Leadership", semester: "Spring", evaluation: { professor: "L. Hafrey", rating: 6.7, respondents: 63, highlights: ["Unique Sloan experience", "Deep literary discussions"] } },
  { id: "e14", code: "15.285", title: "Sports Strategy and Analytics", credits: 6, description: "Explores how leaders and organizations apply data and analytics in the global sports industry.", timeSlot: "4:00–7:00", day: "Tue", isRequired: false, category: "Leadership", semester: "Spring", evaluation: { professor: "B. Shields", rating: 6.5, respondents: 48, highlights: ["Fun and rigorous", "Great industry connections"] } },

  // Global & Strategy
  { id: "e15", code: "15.225", title: "Modern Economy and Business in China", credits: 12, description: "Provides an integrated approach to analyzing the economy, geopolitics, and political economy of China.", timeSlot: "4:00–5:30", day: "Mon/Wed", isRequired: false, category: "Strategy", semester: "Spring", evaluation: { professor: "Y. Huang & B. Wang", rating: 6.2, respondents: 91, highlights: ["Timely geopolitical insights", "Excellent case method"] } },
  { id: "e16", code: "15.226", title: "Modern Business in Southeast Asia: ASEAN Lab", credits: 12, description: "Provides integrated approach to analyze the economies of the ASEAN region through action learning.", timeSlot: "10:00–11:30", day: "Mon/Wed", isRequired: false, category: "Strategy", semester: "Spring", evaluation: { professor: "Y. Huang & R. Card", rating: 6.0, respondents: 38, highlights: ["Travel component", "Real company projects"] } },
  { id: "e17", code: "15.232", title: "Breakthrough Ventures: Frontier Markets", credits: 6, description: "Examines how new approaches enable improved social outcomes in resource-limited settings.", timeSlot: "1:00–2:30", day: "Tue/Thu", isRequired: false, category: "Entrepreneurship", semester: "Spring", evaluation: { professor: "Staff", rating: 5.9, respondents: 52, highlights: ["Eye-opening case studies", "Social impact focus"] } },
  { id: "e18", code: "15.018", title: "Current Debates of Macroeconomics & Public Policy", credits: 9, description: "Concentrates on debates about current policy challenges.", timeSlot: "5:30–8:30", day: "Wed", isRequired: false, category: "Strategy", semester: "Spring", evaluation: { professor: "R. Rigobon", rating: 6.8, respondents: 83, highlights: ["Most entertaining prof at Sloan", "Heated debates"] } },
  { id: "e19", code: "15.283", title: "Social Media Management: Persuasion in Networked Culture", credits: 9, description: "Explores how organizations can maximize the business value of social media platforms.", timeSlot: "4:00–7:00", day: "Wed", isRequired: false, category: "Marketing", semester: "Spring", evaluation: { professor: "B. Shields", rating: 6.3, respondents: 61, highlights: ["Practical assignments", "Content creation practice"] } },
  { id: "e20", code: "15.027", title: "Opportunities in Developing Economies", credits: 6, description: "Investigates the role of the private sector in developing economies.", timeSlot: "10:00–11:30", day: "Tue/Thu", isRequired: false, category: "Strategy", semester: "Spring", evaluation: { professor: "T. Suri", rating: 6.4, respondents: 69, highlights: ["Inspiring case studies", "Policy-meets-business lens"] } },
];

export const SAMPLE_BUNDLES: CourseBundle[] = [
  {
    id: "b1",
    name: "Tech Leadership Bundle",
    description: "For students targeting product management, tech strategy, or CTO roles.",
    targetRole: "Product Manager / Tech Lead",
    matchScore: 95,
    courses: [
      { ...ELECTIVE_COURSES[8], aiReason: "Understanding AI & robotics applications is essential for modern product managers who need to evaluate technical feasibility and drive data-informed roadmaps." },
      { ...ELECTIVE_COURSES[7], aiReason: "Analytics for a Better World builds the predictive and prescriptive analytics fluency required to lead cross-functional tech initiatives at scale." },
      { ...ELECTIVE_COURSES[9], aiReason: "Quantum computing is an emerging frontier — understanding its business implications positions you ahead of the curve in tech strategy." },
    ],
  },
  {
    id: "b2",
    name: "Finance & Strategy Bundle",
    description: "For students pursuing investment banking, consulting, or CFO roles.",
    targetRole: "Investment Banking / Consulting",
    matchScore: 88,
    courses: [
      { ...ELECTIVE_COURSES[0], aiReason: "Game theory is foundational for strategic decision-making roles in banking, consulting, and corporate strategy." },
      { ...ELECTIVE_COURSES[2], aiReason: "Central bank and monetary policy expertise is critical for anyone in global finance or macroeconomic advisory." },
      { ...ELECTIVE_COURSES[3], aiReason: "Understanding global economic risks and opportunities is essential for cross-border deal-making and consulting engagements." },
    ],
  },
  {
    id: "b3",
    name: "Entrepreneurship Bundle",
    description: "For students planning to launch their own venture post-graduation.",
    targetRole: "Founder / Entrepreneur",
    matchScore: 92,
    courses: [
      { ...ELECTIVE_COURSES[16], aiReason: "Breakthrough Ventures teaches you to build effective business models in frontier markets — a key skill for scrappy founders." },
      { ...ELECTIVE_COURSES[10], aiReason: "Storytelling is how founders pitch investors, align teams, and sell their vision. This builds that muscle." },
      { ...ELECTIVE_COURSES[9], aiReason: "Quantum computing literacy lets founders identify where emerging tech can give their startup an unfair advantage." },
    ],
  },
];
