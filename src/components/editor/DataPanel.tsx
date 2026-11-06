"use client";

import { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { ItemControls } from "@/components/editor/ItemControls";
import { PROFICIENCY_OPTIONS, SECTION_LABELS } from "@/lib/constants";
import { useCVStore } from "@/store/cvStore";
import type { SectionKey } from "@/types/cv";

const FORM_SECTIONS: SectionKey[] = [
  "personal",
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

export function DataPanel() {
  const data = useCVStore((s) => s.data);
  const language = data.language;
  const [open, setOpen] = useState<Record<string, boolean>>({
    personal: true,
    experience: true,
  });

  const toggle = (key: string) =>
    setOpen((prev) => ({ ...prev, [key]: !prev[key] }));

  const t = (ar: string, en: string) => (language === "ar" ? ar : en);

  const proficiencyOptions = useMemo(
    () =>
      PROFICIENCY_OPTIONS.map((item) => ({
        value: item.value,
        label: language === "ar" ? item.ar : item.en,
      })),
    [language]
  );

  const store = useCVStore();

  return (
    <div className="space-y-3 pb-8">
      <div className="mb-2">
        <h2 className="text-lg font-medium text-[var(--color-primary)]">
          {t("بيانات السيرة الذاتية", "CV Details")}
        </h2>
        <p className="mt-1 text-sm text-[var(--color-secondary)]">
          {t(
            "أدخل معلوماتك وسيتم تحديث المعاينة مباشرة.",
            "Enter your information and watch the preview update live."
          )}
        </p>
      </div>

      <Accordion
        title={SECTION_LABELS.personal[language]}
        open={!!open.personal}
        onToggle={() => toggle("personal")}
      >
        <div className="grid gap-3 sm:grid-cols-2">
          <Input
            label={t("الاسم الكامل", "Full name")}
            value={data.personal.fullName}
            onChange={(e) => store.updatePersonal({ fullName: e.target.value })}
            placeholder={t("مثال: أحمد الشمري", "e.g. Alex Rivera")}
          />
          <Input
            label={t("المسمى الوظيفي", "Job title")}
            value={data.personal.jobTitle}
            onChange={(e) => store.updatePersonal({ jobTitle: e.target.value })}
          />
          <Input
            label={t("البريد الإلكتروني", "Email")}
            type="email"
            value={data.personal.email}
            onChange={(e) => store.updatePersonal({ email: e.target.value })}
          />
          <Input
            label={t("رقم الهاتف", "Phone")}
            value={data.personal.phone}
            onChange={(e) => store.updatePersonal({ phone: e.target.value })}
          />
          <Input
            label={t("المدينة", "City")}
            value={data.personal.city}
            onChange={(e) => store.updatePersonal({ city: e.target.value })}
          />
          <Input
            label={t("الدولة", "Country")}
            value={data.personal.country}
            onChange={(e) => store.updatePersonal({ country: e.target.value })}
          />
          <Input
            label="LinkedIn"
            value={data.personal.linkedin}
            onChange={(e) => store.updatePersonal({ linkedin: e.target.value })}
          />
          <Input
            label={t("الموقع الشخصي", "Website")}
            value={data.personal.website}
            onChange={(e) => store.updatePersonal({ website: e.target.value })}
          />
          <div className="sm:col-span-2">
            <Textarea
              label={t("نبذة تعريفية", "Professional summary")}
              value={data.personal.summary}
              onChange={(e) => store.updatePersonal({ summary: e.target.value })}
              rows={4}
            />
          </div>
        </div>
      </Accordion>

      <Accordion
        title={SECTION_LABELS.experience[language]}
        open={!!open.experience}
        onToggle={() => toggle("experience")}
        badge={String(data.experience.length)}
      >
        <div className="space-y-4">
          {data.experience.length === 0 ? (
            <p className="text-sm text-[var(--color-secondary)]">
              {t("لم تُضف أي خبرة بعد.", "No experience entries yet.")}
            </p>
          ) : null}
          {data.experience.map((item, index) => (
            <div
              key={item.id}
              className="rounded-xl border border-[var(--color-border)] p-3 space-y-3"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-medium text-[var(--color-primary)]">
                  {t("خبرة", "Experience")} #{index + 1}
                </span>
                <ItemControls
                  onUp={() => store.moveExperience(item.id, "up")}
                  onDown={() => store.moveExperience(item.id, "down")}
                  onRemove={() => store.removeExperience(item.id)}
                  disableUp={index === 0}
                  disableDown={index === data.experience.length - 1}
                />
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <Input
                  label={t("المسمى الوظيفي", "Job title")}
                  value={item.title}
                  onChange={(e) =>
                    store.updateExperience(item.id, { title: e.target.value })
                  }
                />
                <Input
                  label={t("اسم الشركة", "Company")}
                  value={item.company}
                  onChange={(e) =>
                    store.updateExperience(item.id, { company: e.target.value })
                  }
                />
                <Input
                  label={t("تاريخ البداية", "Start date")}
                  value={item.startDate}
                  onChange={(e) =>
                    store.updateExperience(item.id, { startDate: e.target.value })
                  }
                  placeholder="2022"
                />
                <Input
                  label={t("تاريخ النهاية", "End date")}
                  value={item.endDate}
                  onChange={(e) =>
                    store.updateExperience(item.id, { endDate: e.target.value })
                  }
                  disabled={item.current}
                />
                <label className="flex items-center gap-2 text-sm sm:col-span-2">
                  <input
                    type="checkbox"
                    checked={item.current}
                    onChange={(e) =>
                      store.updateExperience(item.id, {
                        current: e.target.checked,
                        endDate: e.target.checked ? "" : item.endDate,
                      })
                    }
                  />
                  {t("أعمل هنا حالياً", "I currently work here")}
                </label>
                <div className="sm:col-span-2">
                  <Textarea
                    label={t("المسؤوليات والإنجازات", "Responsibilities & achievements")}
                    value={item.description}
                    onChange={(e) =>
                      store.updateExperience(item.id, {
                        description: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </div>
          ))}
          <Button
            variant="outline"
            size="sm"
            leftIcon={<Plus className="size-4" />}
            onClick={() => store.addExperience()}
          >
            {t("إضافة خبرة", "Add experience")}
          </Button>
        </div>
      </Accordion>

      <Accordion
        title={SECTION_LABELS.education[language]}
        open={!!open.education}
        onToggle={() => toggle("education")}
        badge={String(data.education.length)}
      >
        <div className="space-y-4">
          {data.education.map((item, index) => (
            <div
              key={item.id}
              className="rounded-xl border border-[var(--color-border)] p-3 space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">
                  {t("تعليم", "Education")} #{index + 1}
                </span>
                <ItemControls
                  onUp={() => store.moveEducation(item.id, "up")}
                  onDown={() => store.moveEducation(item.id, "down")}
                  onRemove={() => store.removeEducation(item.id)}
                  disableUp={index === 0}
                  disableDown={index === data.education.length - 1}
                />
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <Input
                  label={t("المؤسسة التعليمية", "Institution")}
                  value={item.institution}
                  onChange={(e) =>
                    store.updateEducation(item.id, { institution: e.target.value })
                  }
                />
                <Input
                  label={t("التخصص", "Field of study")}
                  value={item.field}
                  onChange={(e) =>
                    store.updateEducation(item.id, { field: e.target.value })
                  }
                />
                <Input
                  label={t("الدرجة العلمية", "Degree")}
                  value={item.degree}
                  onChange={(e) =>
                    store.updateEducation(item.id, { degree: e.target.value })
                  }
                />
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    label={t("البداية", "Start")}
                    value={item.startDate}
                    onChange={(e) =>
                      store.updateEducation(item.id, { startDate: e.target.value })
                    }
                  />
                  <Input
                    label={t("التخرج", "End")}
                    value={item.endDate}
                    onChange={(e) =>
                      store.updateEducation(item.id, { endDate: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>
          ))}
          <Button
            variant="outline"
            size="sm"
            leftIcon={<Plus className="size-4" />}
            onClick={() => store.addEducation()}
          >
            {t("إضافة تعليم", "Add education")}
          </Button>
        </div>
      </Accordion>

      <Accordion
        title={SECTION_LABELS.skills[language]}
        open={!!open.skills}
        onToggle={() => toggle("skills")}
        badge={String(data.skills.length)}
      >
        <div className="space-y-3">
          {data.skills.map((item) => (
            <div key={item.id} className="flex flex-wrap items-end gap-2">
              <div className="min-w-[160px] flex-1">
                <Input
                  label={t("المهارة", "Skill")}
                  value={item.name}
                  onChange={(e) =>
                    store.updateSkill(item.id, { name: e.target.value })
                  }
                />
              </div>
              <div className="w-28">
                <Input
                  label={t("المستوى", "Level")}
                  type="number"
                  min={1}
                  max={5}
                  value={item.level ?? 3}
                  onChange={(e) =>
                    store.updateSkill(item.id, {
                      level: Number(e.target.value) || 1,
                    })
                  }
                />
              </div>
              <Button
                variant="danger"
                size="sm"
                onClick={() => store.removeSkill(item.id)}
              >
                {t("حذف", "Remove")}
              </Button>
            </div>
          ))}
          <Button
            variant="outline"
            size="sm"
            leftIcon={<Plus className="size-4" />}
            onClick={() => store.addSkill()}
          >
            {t("إضافة مهارة", "Add skill")}
          </Button>
        </div>
      </Accordion>

      <Accordion
        title={SECTION_LABELS.languages[language]}
        open={!!open.languages}
        onToggle={() => toggle("languages")}
        badge={String(data.languages.length)}
      >
        <div className="space-y-3">
          {data.languages.map((item) => (
            <div key={item.id} className="grid gap-2 sm:grid-cols-[1fr_1fr_auto]">
              <Input
                label={t("اللغة", "Language")}
                value={item.name}
                onChange={(e) =>
                  store.updateLanguage(item.id, { name: e.target.value })
                }
              />
              <Select
                label={t("مستوى الإتقان", "Proficiency")}
                options={proficiencyOptions}
                value={item.proficiency}
                onChange={(e) =>
                  store.updateLanguage(item.id, { proficiency: e.target.value })
                }
              />
              <div className="flex items-end">
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => store.removeLanguage(item.id)}
                >
                  {t("حذف", "Remove")}
                </Button>
              </div>
            </div>
          ))}
          <Button
            variant="outline"
            size="sm"
            leftIcon={<Plus className="size-4" />}
            onClick={() => store.addLanguage()}
          >
            {t("إضافة لغة", "Add language")}
          </Button>
        </div>
      </Accordion>

      {(
        [
          {
            key: "projects" as const,
            add: store.addProject,
            remove: store.removeProject,
            update: store.updateProject,
            items: data.projects,
            fields: [
              { key: "name", ar: "اسم المشروع", en: "Project name" },
              { key: "url", ar: "الرابط", en: "URL" },
              { key: "description", ar: "الوصف", en: "Description", area: true },
            ],
          },
          {
            key: "certificates" as const,
            add: store.addCertificate,
            remove: store.removeCertificate,
            update: store.updateCertificate,
            items: data.certificates,
            fields: [
              { key: "name", ar: "اسم الشهادة", en: "Certificate" },
              { key: "issuer", ar: "الجهة", en: "Issuer" },
              { key: "date", ar: "التاريخ", en: "Date" },
            ],
          },
          {
            key: "volunteer" as const,
            add: store.addVolunteer,
            remove: store.removeVolunteer,
            update: store.updateVolunteer,
            items: data.volunteer,
            fields: [
              { key: "role", ar: "الدور", en: "Role" },
              { key: "organization", ar: "الجهة", en: "Organization" },
              { key: "startDate", ar: "البداية", en: "Start" },
              { key: "endDate", ar: "النهاية", en: "End" },
              { key: "description", ar: "الوصف", en: "Description", area: true },
            ],
          },
          {
            key: "awards" as const,
            add: store.addAward,
            remove: store.removeAward,
            update: store.updateAward,
            items: data.awards,
            fields: [
              { key: "title", ar: "العنوان", en: "Title" },
              { key: "issuer", ar: "الجهة", en: "Issuer" },
              { key: "date", ar: "التاريخ", en: "Date" },
              { key: "description", ar: "الوصف", en: "Description", area: true },
            ],
          },
          {
            key: "references" as const,
            add: store.addReference,
            remove: store.removeReference,
            update: store.updateReference,
            items: data.references,
            fields: [
              { key: "name", ar: "الاسم", en: "Name" },
              { key: "title", ar: "المسمى", en: "Title" },
              { key: "company", ar: "الشركة", en: "Company" },
              { key: "email", ar: "البريد", en: "Email" },
              { key: "phone", ar: "الهاتف", en: "Phone" },
            ],
          },
        ] as const
      ).map((section) => (
        <Accordion
          key={section.key}
          title={SECTION_LABELS[section.key][language]}
          open={!!open[section.key]}
          onToggle={() => toggle(section.key)}
          badge={String(section.items.length)}
        >
          <div className="space-y-4">
            {section.items.map((item, index) => (
              <div
                key={item.id}
                className="rounded-xl border border-[var(--color-border)] p-3 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">#{index + 1}</span>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => section.remove(item.id)}
                  >
                    {t("حذف", "Remove")}
                  </Button>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {section.fields.map((field) => {
                    const value = String(
                      (item as unknown as Record<string, string>)[field.key] ?? ""
                    );
                    if ("area" in field && field.area) {
                      return (
                        <div key={field.key} className="sm:col-span-2">
                          <Textarea
                            label={t(field.ar, field.en)}
                            value={value}
                            onChange={(e) =>
                              section.update(item.id, {
                                [field.key]: e.target.value,
                              } as never)
                            }
                          />
                        </div>
                      );
                    }
                    return (
                      <Input
                        key={field.key}
                        label={t(field.ar, field.en)}
                        value={value}
                        onChange={(e) =>
                          section.update(item.id, {
                            [field.key]: e.target.value,
                          } as never)
                        }
                      />
                    );
                  })}
                </div>
              </div>
            ))}
            <Button
              variant="outline"
              size="sm"
              leftIcon={<Plus className="size-4" />}
              onClick={() => section.add()}
            >
              {t("إضافة", "Add")}
            </Button>
          </div>
        </Accordion>
      ))}

      {/* Keep FORM_SECTIONS referenced for maintainability */}
      <span className="sr-only">{FORM_SECTIONS.join(",")}</span>
    </div>
  );
}
