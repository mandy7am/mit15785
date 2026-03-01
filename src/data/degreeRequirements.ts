export interface RequirementCourse {
  code: string;
  title: string;
  completed: boolean;
}

export interface RequirementCategory {
  name: string;
  courses: RequirementCourse[];
}

export const DEFAULT_REQUIREMENTS: RequirementCategory[] = [
  {
    name: "Core — Leadership & Communication",
    courses: [
      { code: "15.280", title: "Communication for Leaders", completed: false },
      { code: "15.311", title: "Organizational Processes", completed: false },
    ],
  },
  {
    name: "Core — Analytics & Quantitative",
    courses: [
      { code: "15.060", title: "Data, Models, and Decisions", completed: false },
      { code: "15.501", title: "Corporate Financial Accounting", completed: false },
      { code: "15.515", title: "Financial Accounting", completed: false },
    ],
  },
  {
    name: "Core — Markets & Strategy",
    courses: [
      { code: "15.810", title: "Marketing Management", completed: false },
      { code: "15.900", title: "Competitive Strategy", completed: false },
    ],
  },
  {
    name: "Core — Entrepreneurship & Innovation",
    courses: [
      { code: "15.390", title: "New Enterprises", completed: false },
    ],
  },
  {
    name: "Electives — Finance",
    courses: [
      { code: "15.433", title: "Investments", completed: false },
      { code: "15.434", title: "Corporate Finance", completed: false },
    ],
  },
  {
    name: "Electives — Technology & Operations",
    courses: [
      { code: "15.S12", title: "AI & Machine Learning in Business", completed: false },
      { code: "15.565", title: "Digital Transformation", completed: false },
      { code: "15.871", title: "System Dynamics", completed: false },
    ],
  },
];
