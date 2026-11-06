import type { CVData, SectionKey, TemplateMeta } from "@/types/cv";

export const STORAGE_KEY = "cv-studio-data-v1";
export const AUTOSAVE_DEBOUNCE_MS = 400;

export const DEFAULT_SECTION_ORDER: SectionKey[] = [
  "personal",
  "summary",
  "experience",
  "education",
  "skills",
  "languages",
  "projects",
  "certificates",
  "volunteer",
  "awards",
  "references",
];

export const SECTION_LABELS: Record<
  SectionKey,
  { ar: string; en: string }
> = {
  personal: { ar: "المعلومات الشخصية", en: "Personal Info" },
  summary: { ar: "نبذة تعريفية", en: "Summary" },
  experience: { ar: "الخبرات العملية", en: "Experience" },
  education: { ar: "التعليم", en: "Education" },
  skills: { ar: "المهارات", en: "Skills" },
  languages: { ar: "اللغات", en: "Languages" },
  projects: { ar: "المشاريع", en: "Projects" },
  certificates: { ar: "الشهادات والدورات", en: "Certificates" },
  volunteer: { ar: "الأعمال التطوعية", en: "Volunteer" },
  awards: { ar: "الجوائز والإنجازات", en: "Awards" },
  references: { ar: "المراجع", en: "References" },
};

export const PROFICIENCY_OPTIONS = [
  { value: "native", ar: "لغة أم", en: "Native" },
  { value: "fluent", ar: "بطلاقة", en: "Fluent" },
  { value: "advanced", ar: "متقدم", en: "Advanced" },
  { value: "intermediate", ar: "متوسط", en: "Intermediate" },
  { value: "basic", ar: "أساسي", en: "Basic" },
];

export const COLOR_PRESETS = [
  "#172B4D",
  "#315E50",
  "#1E3A5F",
  "#0F766E",
  "#7C2D12",
  "#4C1D95",
  "#1F2937",
  "#0E7490",
];

export const TEMPLATES: TemplateMeta[] = [
  {
    id: "classic",
    nameAr: "كلاسيكي",
    nameEn: "Classic",
    descriptionAr: "تصميم رسمي مرتب مناسب للوظائف التقليدية",
    descriptionEn: "Formal and structured for traditional roles",
    style: "formal",
    defaultLayout: "single",
  },
  {
    id: "modern",
    nameAr: "عصري",
    nameEn: "Modern",
    descriptionAr: "بسيط وعصري مع شريط جانبي أنيق",
    descriptionEn: "Clean modern layout with a side column",
    style: "modern",
    defaultLayout: "sidebar-right",
  },
  {
    id: "minimal",
    nameAr: "مينيمال",
    nameEn: "Minimal",
    descriptionAr: "أقصى درجات البساطة والوضوح",
    descriptionEn: "Maximum clarity with minimal decoration",
    style: "minimal",
    defaultLayout: "single",
  },
  {
    id: "executive",
    nameAr: "تنفيذي",
    nameEn: "Executive",
    descriptionAr: "فاخر ومناسب للمناصب القيادية",
    descriptionEn: "Refined look for leadership roles",
    style: "formal",
    defaultLayout: "single",
  },
  {
    id: "professional",
    nameAr: "احترافي",
    nameEn: "Professional",
    descriptionAr: "مناسب للشركات والمؤسسات",
    descriptionEn: "Corporate-ready professional layout",
    style: "formal",
    defaultLayout: "sidebar-left",
  },
  {
    id: "creative",
    nameAr: "إبداعي",
    nameEn: "Creative",
    descriptionAr: "لمسة إبداعية للمصممين والمبدعين",
    descriptionEn: "Expressive layout for creative roles",
    style: "creative",
    defaultLayout: "sidebar-left",
  },
  {
    id: "academic",
    nameAr: "أكاديمي",
    nameEn: "Academic",
    descriptionAr: "موجه للباحثين والسيرة الأكاديمية",
    descriptionEn: "Structured for research and academia",
    style: "formal",
    defaultLayout: "single",
  },
  {
    id: "ats",
    nameAr: "متوافق ATS",
    nameEn: "ATS Friendly",
    descriptionAr: "نص خطي واضح لأنظمة تتبع المتقدمين",
    descriptionEn: "Plain linear layout for ATS systems",
    style: "ats",
    defaultLayout: "single",
  },
];

export const STYLE_FILTERS = [
  { id: "all", ar: "الكل", en: "All" },
  { id: "formal", ar: "رسمي", en: "Formal" },
  { id: "modern", ar: "عصري", en: "Modern" },
  { id: "minimal", ar: "مينيمال", en: "Minimal" },
  { id: "creative", ar: "إبداعي", en: "Creative" },
  { id: "ats", ar: "ATS", en: "ATS" },
] as const;

export function createEmptyCV(templateId: CVData["customization"]["templateId"] = "modern"): CVData {
  const template = TEMPLATES.find((t) => t.id === templateId) ?? TEMPLATES[1];
  return {
    language: "ar",
    personal: {
      fullName: "",
      jobTitle: "",
      email: "",
      phone: "",
      city: "",
      country: "",
      linkedin: "",
      website: "",
      summary: "",
    },
    experience: [],
    education: [],
    skills: [],
    languages: [],
    projects: [],
    certificates: [],
    volunteer: [],
    awards: [],
    references: [],
    customization: {
      templateId: template.id,
      primaryColor: "#172B4D",
      fontSize: 11,
      spacing: 1,
      layout: template.defaultLayout,
      sectionOrder: [...DEFAULT_SECTION_ORDER],
      visibleSections: {
        personal: true,
        summary: true,
        experience: true,
        education: true,
        skills: true,
        languages: true,
        projects: true,
        certificates: true,
        volunteer: true,
        awards: true,
        references: false,
      },
    },
  };
}
