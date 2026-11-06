"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { nanoid } from "nanoid";
import type {
  AwardItem,
  CertificateItem,
  CVCustomization,
  CVData,
  EducationItem,
  ExperienceItem,
  LanguageItem,
  PersonalInfo,
  ProjectItem,
  ReferenceItem,
  SectionKey,
  SkillItem,
  TemplateId,
  VolunteerItem,
} from "@/types/cv";
import { createEmptyCV, STORAGE_KEY, TEMPLATES } from "@/lib/constants";

type SaveStatus = "idle" | "saving" | "saved" | "error";

interface CVStore {
  data: CVData;
  saveStatus: SaveStatus;
  hydrated: boolean;
  setHydrated: (value: boolean) => void;
  setSaveStatus: (status: SaveStatus) => void;
  setLanguage: (language: CVData["language"]) => void;
  updatePersonal: (patch: Partial<PersonalInfo>) => void;
  setCustomization: (patch: Partial<CVCustomization>) => void;
  setTemplate: (templateId: TemplateId) => void;
  toggleSection: (key: SectionKey) => void;
  reorderSections: (order: SectionKey[]) => void;
  moveSection: (key: SectionKey, direction: "up" | "down") => void;

  addExperience: () => void;
  updateExperience: (id: string, patch: Partial<ExperienceItem>) => void;
  removeExperience: (id: string) => void;
  moveExperience: (id: string, direction: "up" | "down") => void;

  addEducation: () => void;
  updateEducation: (id: string, patch: Partial<EducationItem>) => void;
  removeEducation: (id: string) => void;
  moveEducation: (id: string, direction: "up" | "down") => void;

  addSkill: () => void;
  updateSkill: (id: string, patch: Partial<SkillItem>) => void;
  removeSkill: (id: string) => void;

  addLanguage: () => void;
  updateLanguage: (id: string, patch: Partial<LanguageItem>) => void;
  removeLanguage: (id: string) => void;

  addProject: () => void;
  updateProject: (id: string, patch: Partial<ProjectItem>) => void;
  removeProject: (id: string) => void;

  addCertificate: () => void;
  updateCertificate: (id: string, patch: Partial<CertificateItem>) => void;
  removeCertificate: (id: string) => void;

  addVolunteer: () => void;
  updateVolunteer: (id: string, patch: Partial<VolunteerItem>) => void;
  removeVolunteer: (id: string) => void;

  addAward: () => void;
  updateAward: (id: string, patch: Partial<AwardItem>) => void;
  removeAward: (id: string) => void;

  addReference: () => void;
  updateReference: (id: string, patch: Partial<ReferenceItem>) => void;
  removeReference: (id: string) => void;

  resetCV: () => void;
  importData: (data: CVData) => void;
  exportData: () => CVData;
}

function moveItem<T extends { id: string }>(
  items: T[],
  id: string,
  direction: "up" | "down"
): T[] {
  const index = items.findIndex((item) => item.id === id);
  if (index < 0) return items;
  const target = direction === "up" ? index - 1 : index + 1;
  if (target < 0 || target >= items.length) return items;
  const next = [...items];
  const [item] = next.splice(index, 1);
  next.splice(target, 0, item);
  return next;
}

export const useCVStore = create<CVStore>()(
  persist(
    (set, get) => ({
      data: createEmptyCV(),
      saveStatus: "idle",
      hydrated: false,
      setHydrated: (value) => set({ hydrated: value }),
      setSaveStatus: (status) => set({ saveStatus: status }),

      setLanguage: (language) =>
        set((state) => ({ data: { ...state.data, language } })),

      updatePersonal: (patch) =>
        set((state) => ({
          data: {
            ...state.data,
            personal: { ...state.data.personal, ...patch },
          },
        })),

      setCustomization: (patch) =>
        set((state) => ({
          data: {
            ...state.data,
            customization: { ...state.data.customization, ...patch },
          },
        })),

      setTemplate: (templateId) => {
        const template = TEMPLATES.find((t) => t.id === templateId);
        set((state) => ({
          data: {
            ...state.data,
            customization: {
              ...state.data.customization,
              templateId,
              layout: template?.defaultLayout ?? state.data.customization.layout,
            },
          },
        }));
      },

      toggleSection: (key) =>
        set((state) => ({
          data: {
            ...state.data,
            customization: {
              ...state.data.customization,
              visibleSections: {
                ...state.data.customization.visibleSections,
                [key]: !state.data.customization.visibleSections[key],
              },
            },
          },
        })),

      reorderSections: (order) =>
        set((state) => ({
          data: {
            ...state.data,
            customization: {
              ...state.data.customization,
              sectionOrder: order,
            },
          },
        })),

      moveSection: (key, direction) => {
        const order = [...get().data.customization.sectionOrder];
        const index = order.indexOf(key);
        if (index < 0) return;
        const target = direction === "up" ? index - 1 : index + 1;
        if (target < 0 || target >= order.length) return;
        const [item] = order.splice(index, 1);
        order.splice(target, 0, item);
        get().reorderSections(order);
      },

      addExperience: () =>
        set((state) => ({
          data: {
            ...state.data,
            experience: [
              ...state.data.experience,
              {
                id: nanoid(),
                title: "",
                company: "",
                startDate: "",
                endDate: "",
                current: false,
                description: "",
              },
            ],
          },
        })),
      updateExperience: (id, patch) =>
        set((state) => ({
          data: {
            ...state.data,
            experience: state.data.experience.map((item) =>
              item.id === id ? { ...item, ...patch } : item
            ),
          },
        })),
      removeExperience: (id) =>
        set((state) => ({
          data: {
            ...state.data,
            experience: state.data.experience.filter((item) => item.id !== id),
          },
        })),
      moveExperience: (id, direction) =>
        set((state) => ({
          data: {
            ...state.data,
            experience: moveItem(state.data.experience, id, direction),
          },
        })),

      addEducation: () =>
        set((state) => ({
          data: {
            ...state.data,
            education: [
              ...state.data.education,
              {
                id: nanoid(),
                institution: "",
                field: "",
                degree: "",
                startDate: "",
                endDate: "",
              },
            ],
          },
        })),
      updateEducation: (id, patch) =>
        set((state) => ({
          data: {
            ...state.data,
            education: state.data.education.map((item) =>
              item.id === id ? { ...item, ...patch } : item
            ),
          },
        })),
      removeEducation: (id) =>
        set((state) => ({
          data: {
            ...state.data,
            education: state.data.education.filter((item) => item.id !== id),
          },
        })),
      moveEducation: (id, direction) =>
        set((state) => ({
          data: {
            ...state.data,
            education: moveItem(state.data.education, id, direction),
          },
        })),

      addSkill: () =>
        set((state) => ({
          data: {
            ...state.data,
            skills: [
              ...state.data.skills,
              { id: nanoid(), name: "", level: 3 },
            ],
          },
        })),
      updateSkill: (id, patch) =>
        set((state) => ({
          data: {
            ...state.data,
            skills: state.data.skills.map((item) =>
              item.id === id ? { ...item, ...patch } : item
            ),
          },
        })),
      removeSkill: (id) =>
        set((state) => ({
          data: {
            ...state.data,
            skills: state.data.skills.filter((item) => item.id !== id),
          },
        })),

      addLanguage: () =>
        set((state) => ({
          data: {
            ...state.data,
            languages: [
              ...state.data.languages,
              { id: nanoid(), name: "", proficiency: "intermediate" },
            ],
          },
        })),
      updateLanguage: (id, patch) =>
        set((state) => ({
          data: {
            ...state.data,
            languages: state.data.languages.map((item) =>
              item.id === id ? { ...item, ...patch } : item
            ),
          },
        })),
      removeLanguage: (id) =>
        set((state) => ({
          data: {
            ...state.data,
            languages: state.data.languages.filter((item) => item.id !== id),
          },
        })),

      addProject: () =>
        set((state) => ({
          data: {
            ...state.data,
            projects: [
              ...state.data.projects,
              { id: nanoid(), name: "", description: "", url: "" },
            ],
          },
        })),
      updateProject: (id, patch) =>
        set((state) => ({
          data: {
            ...state.data,
            projects: state.data.projects.map((item) =>
              item.id === id ? { ...item, ...patch } : item
            ),
          },
        })),
      removeProject: (id) =>
        set((state) => ({
          data: {
            ...state.data,
            projects: state.data.projects.filter((item) => item.id !== id),
          },
        })),

      addCertificate: () =>
        set((state) => ({
          data: {
            ...state.data,
            certificates: [
              ...state.data.certificates,
              { id: nanoid(), name: "", issuer: "", date: "" },
            ],
          },
        })),
      updateCertificate: (id, patch) =>
        set((state) => ({
          data: {
            ...state.data,
            certificates: state.data.certificates.map((item) =>
              item.id === id ? { ...item, ...patch } : item
            ),
          },
        })),
      removeCertificate: (id) =>
        set((state) => ({
          data: {
            ...state.data,
            certificates: state.data.certificates.filter(
              (item) => item.id !== id
            ),
          },
        })),

      addVolunteer: () =>
        set((state) => ({
          data: {
            ...state.data,
            volunteer: [
              ...state.data.volunteer,
              {
                id: nanoid(),
                role: "",
                organization: "",
                startDate: "",
                endDate: "",
                description: "",
              },
            ],
          },
        })),
      updateVolunteer: (id, patch) =>
        set((state) => ({
          data: {
            ...state.data,
            volunteer: state.data.volunteer.map((item) =>
              item.id === id ? { ...item, ...patch } : item
            ),
          },
        })),
      removeVolunteer: (id) =>
        set((state) => ({
          data: {
            ...state.data,
            volunteer: state.data.volunteer.filter((item) => item.id !== id),
          },
        })),

      addAward: () =>
        set((state) => ({
          data: {
            ...state.data,
            awards: [
              ...state.data.awards,
              {
                id: nanoid(),
                title: "",
                issuer: "",
                date: "",
                description: "",
              },
            ],
          },
        })),
      updateAward: (id, patch) =>
        set((state) => ({
          data: {
            ...state.data,
            awards: state.data.awards.map((item) =>
              item.id === id ? { ...item, ...patch } : item
            ),
          },
        })),
      removeAward: (id) =>
        set((state) => ({
          data: {
            ...state.data,
            awards: state.data.awards.filter((item) => item.id !== id),
          },
        })),

      addReference: () =>
        set((state) => ({
          data: {
            ...state.data,
            references: [
              ...state.data.references,
              {
                id: nanoid(),
                name: "",
                title: "",
                company: "",
                email: "",
                phone: "",
              },
            ],
          },
        })),
      updateReference: (id, patch) =>
        set((state) => ({
          data: {
            ...state.data,
            references: state.data.references.map((item) =>
              item.id === id ? { ...item, ...patch } : item
            ),
          },
        })),
      removeReference: (id) =>
        set((state) => ({
          data: {
            ...state.data,
            references: state.data.references.filter((item) => item.id !== id),
          },
        })),

      resetCV: () => set({ data: createEmptyCV(get().data.customization.templateId) }),
      importData: (data) => set({ data }),
      exportData: () => get().data,
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ data: state.data }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
        state?.setSaveStatus("saved");
      },
    }
  )
);
