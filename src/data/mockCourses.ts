import { Course, CourseBundle } from "@/types/course";

export const REQUIRED_COURSES: Course[] = [
  { id: "r1", code: "15.810", title: "Marketing Management", credits: 3, description: "Core concepts in marketing strategy and customer analysis.", timeSlot: "9:00–10:30", day: "Mon/Wed", isRequired: true, category: "Core", semester: "Fall" },
  { id: "r2", code: "15.501", title: "Corporate Financial Accounting", credits: 3, description: "Fundamentals of financial accounting and reporting.", timeSlot: "11:00–12:30", day: "Mon/Wed", isRequired: true, category: "Core", semester: "Fall" },
  { id: "r3", code: "15.060", title: "Data, Models, and Decisions", credits: 3, description: "Statistical and optimization models for decision-making.", timeSlot: "9:00–10:30", day: "Tue/Thu", isRequired: true, category: "Core", semester: "Fall" },
  { id: "r4", code: "15.390", title: "New Enterprises", credits: 3, description: "Entrepreneurship fundamentals and venture creation.", timeSlot: "2:00–3:30", day: "Tue/Thu", isRequired: true, category: "Core", semester: "Fall" },
  { id: "r5", code: "15.280", title: "Communication for Leaders", credits: 3, description: "Developing effective leadership communication skills.", timeSlot: "11:00–12:30", day: "Tue/Thu", isRequired: true, category: "Core", semester: "Fall" },
];

export const ELECTIVE_COURSES: Course[] = [
  { id: "e1", code: "15.433", title: "Investments", credits: 3, description: "Theory and practice of investment management.", timeSlot: "2:00–3:30", day: "Mon/Wed", isRequired: false, category: "Finance" },
  { id: "e2", code: "15.835", title: "Entrepreneurial Marketing", credits: 3, description: "Marketing strategies for startups and new ventures.", timeSlot: "4:00–5:30", day: "Mon/Wed", isRequired: false, category: "Marketing" },
  { id: "e3", code: "15.871", title: "System Dynamics", credits: 3, description: "Modeling complex systems for strategic decision-making.", timeSlot: "4:00–5:30", day: "Tue/Thu", isRequired: false, category: "Operations" },
  { id: "e4", code: "15.S12", title: "AI & Machine Learning in Business", credits: 3, description: "Applications of AI/ML for business transformation.", timeSlot: "9:00–10:30", day: "Fri", isRequired: false, category: "Technology" },
  { id: "e5", code: "15.792", title: "Negotiation & Conflict Resolution", credits: 3, description: "Frameworks for effective negotiation.", timeSlot: "2:00–3:30", day: "Fri", isRequired: false, category: "Leadership" },
  { id: "e6", code: "15.434", title: "Corporate Finance", credits: 3, description: "Capital structure, valuation, and financial strategy.", timeSlot: "11:00–12:30", day: "Fri", isRequired: false, category: "Finance" },
  { id: "e7", code: "15.565", title: "Digital Transformation", credits: 3, description: "Leading digital change in organizations.", timeSlot: "4:00–5:30", day: "Fri", isRequired: false, category: "Technology" },
  { id: "e8", code: "15.342", title: "Organizations & Incentives", credits: 3, description: "How organizations design effective incentive systems.", timeSlot: "2:00–3:30", day: "Mon/Wed", isRequired: false, category: "Leadership" },
  { id: "e9", code: "15.S50", title: "Energy Ventures", credits: 3, description: "Building ventures in the clean energy sector.", timeSlot: "6:00–7:30", day: "Mon/Wed", isRequired: false, category: "Entrepreneurship" },
  { id: "e10", code: "15.677", title: "Urban Analytics", credits: 3, description: "Data-driven approaches to urban planning challenges.", timeSlot: "6:00–7:30", day: "Tue/Thu", isRequired: false, category: "Technology" },
];

export const SAMPLE_BUNDLES: CourseBundle[] = [
  {
    id: "b1",
    name: "Tech Leadership Bundle",
    description: "For students targeting product management, tech strategy, or CTO roles.",
    targetRole: "Product Manager / Tech Lead",
    matchScore: 95,
    courses: [
      { ...ELECTIVE_COURSES[3], aiReason: "AI/ML fluency is essential for modern product managers who need to evaluate technical feasibility and drive data-informed roadmaps." },
      { ...ELECTIVE_COURSES[6], aiReason: "Understanding digital transformation frameworks will prepare you to lead cross-functional tech initiatives at scale." },
      { ...ELECTIVE_COURSES[2], aiReason: "System dynamics modeling helps tech leaders anticipate second-order effects of product and platform decisions." },
    ],
  },
  {
    id: "b2",
    name: "Finance & Strategy Bundle",
    description: "For students pursuing investment banking, consulting, or CFO roles.",
    targetRole: "Investment Banking / Consulting",
    matchScore: 88,
    courses: [
      { ...ELECTIVE_COURSES[0], aiReason: "Deep investment theory is foundational for roles in banking and asset management where valuation is a daily task." },
      { ...ELECTIVE_COURSES[5], aiReason: "Corporate finance equips you with the capital structure and M&A frameworks central to consulting engagements." },
      { ...ELECTIVE_COURSES[4], aiReason: "Negotiation skills are critical for deal-making roles in both banking and strategic advisory." },
    ],
  },
  {
    id: "b3",
    name: "Entrepreneurship Bundle",
    description: "For students planning to launch their own venture post-graduation.",
    targetRole: "Founder / Entrepreneur",
    matchScore: 92,
    courses: [
      { ...ELECTIVE_COURSES[1], aiReason: "Startup marketing requires lean, scrappy strategies — this course teaches you to acquire customers before you have a brand." },
      { ...ELECTIVE_COURSES[4], aiReason: "Founders negotiate constantly — with investors, co-founders, and early hires. This builds that muscle." },
      { ...ELECTIVE_COURSES[3], aiReason: "Understanding AI/ML lets you identify where automation can give your startup an unfair advantage." },
    ],
  },
];
