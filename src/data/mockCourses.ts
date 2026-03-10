import { Course, CourseBundle } from "@/types/course";

export const REQUIRED_COURSES: Course[] = [
  { id: "r1", code: "15.010", title: "Economic Analysis for Business Decisions", credits: 9, description: "Introduces principles of microeconomics as a framework for making more informed managerial decisions. Discusses the supply and demand paradigm with applications to digital marketplaces, innovation, sources of market power, and strategic pricing.", timeSlot: "TBA", day: "TBA", isRequired: true, category: "Core", semester: "Spring" },
  { id: "r2", code: "15.060", title: "Data, Models, and Decisions", credits: 9, description: "Introduces students to the basic tools in using data to make informed management decisions. Covers basic topics in data analytics, including introductory probability, decision analysis, basic statistics, regression, simulation, linear and discrete optimization.", timeSlot: "TBA", day: "TBA", isRequired: true, category: "Core", semester: "Spring" },
  { id: "r3", code: "15.280", title: "Communication for Leaders", credits: 9, description: "Students develop and polish communication strategies and methods through discussion, examples, and practice. Emphasizes writing and speaking skills necessary for effective leaders.", timeSlot: "TBA", day: "TBA", isRequired: true, category: "Core", semester: "Spring" },
  { id: "r4", code: "15.270", title: "Ethical Practice: Leading Through Professionalism", credits: 6, description: "Introduction to ethics in business, with a focus on business management. Students explore theoretical concepts in business ethics, and cases representing the challenges they will likely face as managers.", timeSlot: "1:00–2:30", day: "Mon/Wed", isRequired: true, category: "Core", semester: "Spring" },
  { id: "r5", code: "15.002", title: "Leadership Challenges for an Inclusive World", credits: 0, description: "Units assigned to MBA students upon completion. Restricted to Sloan MBA students.", timeSlot: "TBA", day: "TBA", isRequired: true, category: "Core", semester: "Spring" },
];

export const ELECTIVE_COURSES: Course[] = [
  // Finance & Economics
  { id: "e1", code: "15.025", title: "Game Theory for Strategic Advantage", credits: 9, description: "Develops and applies principles of game theory relevant to managers' strategic decisions. Topics include strategic commitment, negotiations, auctions, and market design.", timeSlot: "10:00–11:30", day: "Tue/Thu", isRequired: false, category: "Finance", semester: "Spring" },
  { id: "e2", code: "15.012", title: "Applied Macro- & International Economics", credits: 9, description: "Explores the macroeconomic environment in which firms operate. Covers monetary and fiscal policy, trade theory, and global trade wars.", timeSlot: "TBA", day: "TBA", isRequired: false, category: "Finance", semester: "Spring" },
  { id: "e3", code: "15.216", title: "Central Banks, Monetary Policy & Global Financial Markets", credits: 9, description: "Explores the role of central banks and monetary policy in the global economy and the effects of their policies on countries, companies and global financial markets.", timeSlot: "4:00–5:30", day: "Tue/Thu", isRequired: false, category: "Finance", semester: "Spring" },
  { id: "e4", code: "15.218", title: "Global Economic Challenges & Opportunities", credits: 9, description: "In-depth analysis of the major risks and opportunities in the global economy. Analyzes key economic forces and policy responses that shape the business environment.", timeSlot: "8:30–10:00", day: "Tue/Thu", isRequired: false, category: "Finance", semester: "Spring" },
  { id: "e5", code: "15.014", title: "Applied Macro- & International Economics II", credits: 6, description: "Establishes understanding of the development processes of societies and economies. Studies several dimensions of sustainability.", timeSlot: "8:30–10:00", day: "Mon/Wed", isRequired: false, category: "Finance", semester: "Spring" },

  // Analytics & Technology
  { id: "e6", code: "15.053", title: "Optimization Methods in Business Analytics", credits: 12, description: "Introduces optimization methods with a focus on modeling, solution techniques, and analysis. Covers linear programming, network optimization, integer programming.", timeSlot: "10:00–11:30", day: "Mon/Wed", isRequired: false, category: "Technology", semester: "Spring" },
  { id: "e7", code: "15.0711", title: "The Analytics Edge", credits: 12, description: "Develops models and tools of data analytics used to transform businesses and industries, using examples in e-commerce, healthcare, social media, and beyond.", timeSlot: "1:00–2:30", day: "Tue/Thu", isRequired: false, category: "Technology", semester: "Spring" },
  { id: "e8", code: "15.076", title: "Analytics for a Better World", credits: 12, description: "Introduces predictive and prescriptive analytics methods to solve problems that contribute to the welfare of society using machine learning and optimization.", timeSlot: "11:30–1:00", day: "Mon/Wed", isRequired: false, category: "Technology", semester: "Spring" },
  { id: "e9", code: "15.236", title: "Global Business of AI & Robotics", credits: 6, description: "Discussion-based course examining applications of AI and robotics in the business world. Emphasizes understanding the likely direction of technology and how it will be used.", timeSlot: "1:00–2:30", day: "Tue/Thu", isRequired: false, category: "Technology", semester: "Spring" },
  { id: "e10", code: "15.224", title: "Global Business of Quantum Computing", credits: 3, description: "Explores the commercial, economic, and geopolitical implications of quantum computing as the technology moves from research lab to marketplace.", timeSlot: "4:00–5:30", day: "Wed", isRequired: false, category: "Technology", semester: "Spring" },

  // Leadership & Communication
  { id: "e11", code: "15.274", title: "Storytelling: Leadership through Narrative", credits: 9, description: "Develops storytelling as an essential leadership skill to help leaders communicate decisions and drive action.", timeSlot: "10:00–11:30", day: "Tue/Thu", isRequired: false, category: "Leadership", semester: "Spring" },
  { id: "e12", code: "15.281", title: "Advanced Leadership Communication", credits: 9, description: "Introduces interactive oral and interpersonal communication skills critical to leaders, including strategies for presenting to a hostile audience and running effective meetings.", timeSlot: "1:00–2:30", day: "Mon/Wed", isRequired: false, category: "Leadership", semester: "Spring" },
  { id: "e13", code: "15.269", title: "Leadership Stories: Literature, Ethics & Authority", credits: 9, description: "Explores how we use story to articulate ethical norms through short fiction, novels, plays, feature films and non-fiction.", timeSlot: "TBA", day: "TBA", isRequired: false, category: "Leadership", semester: "Spring" },
  { id: "e14", code: "15.285", title: "Sports Strategy and Analytics", credits: 6, description: "Explores how leaders and organizations apply data and analytics to gain a competitive edge in the multibillion-dollar global sports industry.", timeSlot: "4:00–7:00", day: "Tue", isRequired: false, category: "Leadership", semester: "Spring" },

  // Global & Strategy
  { id: "e15", code: "15.225", title: "Modern Economy and Business in China", credits: 12, description: "Provides an integrated approach to analyzing the economy, geopolitics, and political economy of China through case studies, lectures, and class discussions.", timeSlot: "4:00–5:30", day: "Mon/Wed", isRequired: false, category: "Strategy", semester: "Spring" },
  { id: "e16", code: "15.226", title: "Modern Business in Southeast Asia: ASEAN Lab", credits: 12, description: "Provides integrated approach to analyze the economies of the ASEAN region through action learning.", timeSlot: "10:00–11:30", day: "Mon/Wed", isRequired: false, category: "Strategy", semester: "Spring" },
  { id: "e17", code: "15.232", title: "Breakthrough Ventures: Frontier Markets", credits: 6, description: "Examines how new approaches to operations, revenue, marketing, finance, and strategy enable improved social outcomes in resource-limited settings.", timeSlot: "1:00–2:30", day: "Tue/Thu", isRequired: false, category: "Entrepreneurship", semester: "Spring" },
  { id: "e18", code: "15.018", title: "Current Debates of Macroeconomics & Public Policy", credits: 9, description: "Concentrates on debates about current policy challenges. Students debate and vote on policy actions on current issues in developed and developing nations.", timeSlot: "5:30–8:30", day: "Wed", isRequired: false, category: "Strategy", semester: "Spring" },
  { id: "e19", code: "15.283", title: "Social Media Management: Persuasion in Networked Culture", credits: 9, description: "Explores how organizations and leaders can maximize the business value of social media platforms.", timeSlot: "4:00–7:00", day: "Wed", isRequired: false, category: "Marketing", semester: "Spring" },
  { id: "e20", code: "15.027", title: "Opportunities in Developing Economies", credits: 6, description: "Investigates the role of the private sector in developing economies, highlighting how solving market failures can improve overall welfare.", timeSlot: "10:00–11:30", day: "Tue/Thu", isRequired: false, category: "Strategy", semester: "Spring" },
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
      { ...ELECTIVE_COURSES[6], aiReason: "The Analytics Edge builds the data science fluency required to lead cross-functional tech initiatives at scale." },
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
      { ...ELECTIVE_COURSES[8], aiReason: "Understanding AI & robotics trends lets you identify where automation can give your startup an unfair advantage." },
    ],
  },
];
