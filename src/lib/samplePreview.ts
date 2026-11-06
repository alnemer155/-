import type { CVData, TemplateId } from "@/types/cv";
import { createEmptyCV } from "@/lib/constants";

/** Sample data used only for marketing previews / template thumbnails — never auto-filled into the editor. */
export function createPreviewSample(templateId: TemplateId): CVData {
  const base = createEmptyCV(templateId);
  return {
    ...base,
    language: "ar",
    personal: {
      fullName: "نورة العتيبي",
      jobTitle: "مطورة برمجيات",
      email: "noura@email.com",
      phone: "+966 50 000 0000",
      city: "الرياض",
      country: "السعودية",
      linkedin: "linkedin.com/in/noura",
      website: "noura.dev",
      summary:
        "مطورة برمجيات بخبرة في بناء منتجات ويب حديثة، مع تركيز على تجربة المستخدم وجودة الكود.",
    },
    experience: [
      {
        id: "preview-exp-1",
        title: "مطورة واجهات أمامية",
        company: "شركة تقنية",
        startDate: "2022",
        endDate: "",
        current: true,
        description: "قيادة تطوير واجهات المنتجات وتحسين الأداء وتجربة الاستخدام.",
      },
    ],
    education: [
      {
        id: "preview-edu-1",
        institution: "جامعة الملك سعود",
        field: "علوم الحاسب",
        degree: "بكالوريوس",
        startDate: "2017",
        endDate: "2021",
      },
    ],
    skills: [
      { id: "preview-skill-1", name: "React", level: 5 },
      { id: "preview-skill-2", name: "TypeScript", level: 4 },
      { id: "preview-skill-3", name: "UI Design", level: 4 },
    ],
    languages: [
      { id: "preview-lang-1", name: "العربية", proficiency: "native" },
      { id: "preview-lang-2", name: "English", proficiency: "advanced" },
    ],
    projects: [],
    certificates: [],
    volunteer: [],
    awards: [],
    references: [],
    customization: {
      ...base.customization,
      templateId,
      primaryColor:
        templateId === "creative"
          ? "#315E50"
          : templateId === "executive"
            ? "#1E3A5F"
            : "#172B4D",
    },
  };
}
