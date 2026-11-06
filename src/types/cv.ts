export type TemplateId =
  | "classic"
  | "modern"
  | "minimal"
  | "executive"
  | "professional"
  | "creative"
  | "academic"
  | "ats";

export type TemplateStyle =
  | "formal"
  | "modern"
  | "minimal"
  | "creative"
  | "ats";

export type LayoutMode = "single" | "sidebar-left" | "sidebar-right";

export type LanguageCode = "ar" | "en";

export type SectionKey =
  | "personal"
  | "summary"
  | "experience"
  | "education"
  | "skills"
  | "languages"
  | "projects"
  | "certificates"
  | "volunteer"
  | "awards"
  | "references";

export interface PersonalInfo {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  city: string;
  country: string;
  linkedin: string;
  website: string;
  summary: string;
}

export interface ExperienceItem {
  id: string;
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface EducationItem {
  id: string;
  institution: string;
  field: string;
  degree: string;
  startDate: string;
  endDate: string;
}

export interface SkillItem {
  id: string;
  name: string;
  level?: number;
}

export interface LanguageItem {
  id: string;
  name: string;
  proficiency: string;
}

export interface ProjectItem {
  id: string;
  name: string;
  description: string;
  url: string;
}

export interface CertificateItem {
  id: string;
  name: string;
  issuer: string;
  date: string;
}

export interface VolunteerItem {
  id: string;
  role: string;
  organization: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface AwardItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description: string;
}

export interface ReferenceItem {
  id: string;
  name: string;
  title: string;
  company: string;
  email: string;
  phone: string;
}

export interface CVCustomization {
  templateId: TemplateId;
  primaryColor: string;
  fontSize: number;
  spacing: number;
  layout: LayoutMode;
  sectionOrder: SectionKey[];
  visibleSections: Record<SectionKey, boolean>;
}

export interface CVData {
  language: LanguageCode;
  personal: PersonalInfo;
  experience: ExperienceItem[];
  education: EducationItem[];
  skills: SkillItem[];
  languages: LanguageItem[];
  projects: ProjectItem[];
  certificates: CertificateItem[];
  volunteer: VolunteerItem[];
  awards: AwardItem[];
  references: ReferenceItem[];
  customization: CVCustomization;
}

export interface TemplateMeta {
  id: TemplateId;
  nameAr: string;
  nameEn: string;
  descriptionAr: string;
  descriptionEn: string;
  style: TemplateStyle;
  defaultLayout: LayoutMode;
}
