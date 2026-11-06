import type { CVData } from "@/types/cv";
import { createEmptyCV, DEFAULT_SECTION_ORDER } from "@/lib/constants";
import { downloadBlob } from "@/lib/utils";

export function exportJsonBackup(data: CVData, filename = "cv-studio-backup.json") {
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json",
  });
  downloadBlob(blob, filename);
}

export function parseImportedJson(raw: string): CVData {
  const parsed = JSON.parse(raw) as Partial<CVData>;
  const base = createEmptyCV();

  if (!parsed || typeof parsed !== "object") {
    throw new Error("INVALID_JSON");
  }

  return {
    ...base,
    ...parsed,
    personal: { ...base.personal, ...(parsed.personal ?? {}) },
    experience: Array.isArray(parsed.experience) ? parsed.experience : [],
    education: Array.isArray(parsed.education) ? parsed.education : [],
    skills: Array.isArray(parsed.skills) ? parsed.skills : [],
    languages: Array.isArray(parsed.languages) ? parsed.languages : [],
    projects: Array.isArray(parsed.projects) ? parsed.projects : [],
    certificates: Array.isArray(parsed.certificates) ? parsed.certificates : [],
    volunteer: Array.isArray(parsed.volunteer) ? parsed.volunteer : [],
    awards: Array.isArray(parsed.awards) ? parsed.awards : [],
    references: Array.isArray(parsed.references) ? parsed.references : [],
    customization: {
      ...base.customization,
      ...(parsed.customization ?? {}),
      sectionOrder:
        parsed.customization?.sectionOrder?.length
          ? parsed.customization.sectionOrder
          : DEFAULT_SECTION_ORDER,
      visibleSections: {
        ...base.customization.visibleSections,
        ...(parsed.customization?.visibleSections ?? {}),
      },
    },
  };
}
