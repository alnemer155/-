import type { CVData, SectionKey } from "@/types/cv";
import { SECTION_LABELS, PROFICIENCY_OPTIONS } from "@/lib/constants";
import { formatDateRange, hasContent } from "@/lib/utils";
import type { CSSProperties, ReactNode } from "react";

export function getDir(language: CVData["language"]) {
  return language === "ar" ? "rtl" : "ltr";
}

export function label(key: SectionKey, language: CVData["language"]) {
  return SECTION_LABELS[key][language];
}

export function proficiencyLabel(
  value: string,
  language: CVData["language"]
): string {
  const found = PROFICIENCY_OPTIONS.find((item) => item.value === value);
  if (!found) return value;
  return language === "ar" ? found.ar : found.en;
}

export function pageStyle(data: CVData): CSSProperties {
  const { fontSize, spacing, primaryColor } = data.customization;
  return {
    ["--cv-primary" as string]: primaryColor,
    ["--cv-font-size" as string]: `${fontSize}pt`,
    ["--cv-space" as string]: `${spacing}`,
    fontSize: `${fontSize}pt`,
    lineHeight: 1.45 + (spacing - 1) * 0.15,
    color: "#17212F",
    fontFamily: "var(--font-ibm-plex-arabic), 'IBM Plex Sans Arabic', sans-serif",
  };
}

export function isSectionVisible(data: CVData, key: SectionKey): boolean {
  if (!data.customization.visibleSections[key]) return false;
  switch (key) {
    case "personal":
      return true;
    case "summary":
      return hasContent(data.personal.summary);
    case "experience":
      return data.experience.some(
        (item) => hasContent(item.title) || hasContent(item.company)
      );
    case "education":
      return data.education.some(
        (item) => hasContent(item.institution) || hasContent(item.degree)
      );
    case "skills":
      return data.skills.some((item) => hasContent(item.name));
    case "languages":
      return data.languages.some((item) => hasContent(item.name));
    case "projects":
      return data.projects.some((item) => hasContent(item.name));
    case "certificates":
      return data.certificates.some((item) => hasContent(item.name));
    case "volunteer":
      return data.volunteer.some(
        (item) => hasContent(item.role) || hasContent(item.organization)
      );
    case "awards":
      return data.awards.some((item) => hasContent(item.title));
    case "references":
      return data.references.some((item) => hasContent(item.name));
    default:
      return false;
  }
}

export function contactLines(data: CVData): string[] {
  const { personal } = data;
  const location = [personal.city, personal.country].filter(hasContent).join("، ");
  return [
    personal.email,
    personal.phone,
    location,
    personal.linkedin,
    personal.website,
  ].filter(hasContent);
}

export function SectionTitle({
  children,
  accent = false,
  underline = true,
}: {
  children: ReactNode;
  accent?: boolean;
  underline?: boolean;
}) {
  return (
    <h2
      className="cv-section-title"
      style={{
        color: accent ? "var(--cv-primary)" : "#17212F",
        borderBottom: underline ? "1.5px solid var(--cv-primary)" : undefined,
        paddingBottom: underline ? "4px" : undefined,
        marginBottom: `calc(8px * var(--cv-space))`,
        marginTop: `calc(14px * var(--cv-space))`,
        fontSize: "1.05em",
        fontWeight: 500,
        letterSpacing: "0.01em",
      }}
    >
      {children}
    </h2>
  );
}

export function ItemBlock({
  title,
  subtitle,
  meta,
  description,
}: {
  title?: string;
  subtitle?: string;
  meta?: string;
  description?: string;
}) {
  if (!hasContent(title) && !hasContent(subtitle) && !hasContent(description)) {
    return null;
  }
  return (
    <div
      className="cv-item"
      style={{ marginBottom: `calc(10px * var(--cv-space))`, breakInside: "avoid" }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "12px",
          flexWrap: "wrap",
        }}
      >
        <div>
          {hasContent(title) ? (
            <div style={{ fontWeight: 500 }}>{title}</div>
          ) : null}
          {hasContent(subtitle) ? (
            <div style={{ color: "#64748B", fontSize: "0.95em" }}>{subtitle}</div>
          ) : null}
        </div>
        {hasContent(meta) ? (
          <div style={{ color: "#64748B", fontSize: "0.9em", whiteSpace: "nowrap" }}>
            {meta}
          </div>
        ) : null}
      </div>
      {hasContent(description) ? (
        <p
          style={{
            marginTop: "4px",
            whiteSpace: "pre-wrap",
            color: "#17212F",
          }}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}

export function renderExperience(data: CVData) {
  return data.experience
    .filter((item) => hasContent(item.title) || hasContent(item.company))
    .map((item) => (
      <ItemBlock
        key={item.id}
        title={item.title}
        subtitle={item.company}
        meta={formatDateRange(
          item.startDate,
          item.endDate,
          item.current,
          data.language
        )}
        description={item.description}
      />
    ));
}

export function renderEducation(data: CVData) {
  return data.education
    .filter((item) => hasContent(item.institution) || hasContent(item.degree))
    .map((item) => (
      <ItemBlock
        key={item.id}
        title={[item.degree, item.field].filter(hasContent).join(" — ")}
        subtitle={item.institution}
        meta={formatDateRange(item.startDate, item.endDate, false, data.language)}
      />
    ));
}

export function renderProjects(data: CVData) {
  return data.projects
    .filter((item) => hasContent(item.name))
    .map((item) => (
      <ItemBlock
        key={item.id}
        title={item.name}
        subtitle={item.url}
        description={item.description}
      />
    ));
}

export function renderCertificates(data: CVData) {
  return data.certificates
    .filter((item) => hasContent(item.name))
    .map((item) => (
      <ItemBlock
        key={item.id}
        title={item.name}
        subtitle={item.issuer}
        meta={item.date}
      />
    ));
}

export function renderVolunteer(data: CVData) {
  return data.volunteer
    .filter((item) => hasContent(item.role) || hasContent(item.organization))
    .map((item) => (
      <ItemBlock
        key={item.id}
        title={item.role}
        subtitle={item.organization}
        meta={formatDateRange(item.startDate, item.endDate, false, data.language)}
        description={item.description}
      />
    ));
}

export function renderAwards(data: CVData) {
  return data.awards
    .filter((item) => hasContent(item.title))
    .map((item) => (
      <ItemBlock
        key={item.id}
        title={item.title}
        subtitle={item.issuer}
        meta={item.date}
        description={item.description}
      />
    ));
}

export function renderReferences(data: CVData) {
  return data.references
    .filter((item) => hasContent(item.name))
    .map((item) => (
      <ItemBlock
        key={item.id}
        title={item.name}
        subtitle={[item.title, item.company].filter(hasContent).join(" · ")}
        description={[item.email, item.phone].filter(hasContent).join(" · ")}
      />
    ));
}

export function SkillsList({
  data,
  showLevel = false,
}: {
  data: CVData;
  showLevel?: boolean;
}) {
  const skills = data.skills.filter((item) => hasContent(item.name));
  if (!skills.length) return null;
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 10px" }}>
      {skills.map((skill) => (
        <span
          key={skill.id}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          {skill.name}
          {showLevel && skill.level ? (
            <span style={{ color: "var(--cv-primary)", letterSpacing: "1px" }}>
              {"●".repeat(skill.level)}
              <span style={{ color: "#E8EBEF" }}>
                {"●".repeat(Math.max(0, 5 - skill.level))}
              </span>
            </span>
          ) : null}
        </span>
      ))}
    </div>
  );
}

export function LanguagesList({ data }: { data: CVData }) {
  const languages = data.languages.filter((item) => hasContent(item.name));
  if (!languages.length) return null;
  return (
    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
      {languages.map((lang) => (
        <li
          key={lang.id}
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "8px",
            marginBottom: "4px",
          }}
        >
          <span>{lang.name}</span>
          <span style={{ color: "#64748B" }}>
            {proficiencyLabel(lang.proficiency, data.language)}
          </span>
        </li>
      ))}
    </ul>
  );
}

export function EmptyPreview({ language }: { language: CVData["language"] }) {
  return (
    <div
      style={{
        height: "100%",
        display: "grid",
        placeItems: "center",
        color: "#64748B",
        textAlign: "center",
        padding: "48px",
      }}
    >
      <div>
        <div style={{ fontWeight: 500, color: "#172B4D", marginBottom: 8 }}>
          {language === "ar" ? "ابدأ بتعبئة بياناتك" : "Start filling your details"}
        </div>
        <p style={{ fontSize: "0.95em", maxWidth: 280, margin: "0 auto" }}>
          {language === "ar"
            ? "ستظهر معاينة السيرة الذاتية هنا فور إدخال الاسم أو المسمى الوظيفي."
            : "Your live CV preview will appear here as soon as you enter a name or title."}
        </p>
      </div>
    </div>
  );
}

export function hasPreviewContent(data: CVData): boolean {
  return (
    hasContent(data.personal.fullName) ||
    hasContent(data.personal.jobTitle) ||
    hasContent(data.personal.summary) ||
    data.experience.length > 0 ||
    data.education.length > 0 ||
    data.skills.length > 0
  );
}
