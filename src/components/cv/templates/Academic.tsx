import type { CVData } from "@/types/cv";
import {
  SkillsList,
  LanguagesList,
  contactLines,
  isSectionVisible,
  label,
  pageStyle,
  renderAwards,
  renderCertificates,
  renderEducation,
  renderExperience,
  renderProjects,
  renderReferences,
  renderVolunteer,
  getDir,
} from "../shared";

export function AcademicTemplate({ data }: { data: CVData }) {
  const preferred = [
    "summary",
    "education",
    "experience",
    "projects",
    "certificates",
    "awards",
    "skills",
    "languages",
    "volunteer",
    "references",
  ] as const;

  const order = [
    ...preferred.filter((key) => data.customization.sectionOrder.includes(key)),
    ...data.customization.sectionOrder.filter(
      (key) => key !== "personal" && !preferred.includes(key as (typeof preferred)[number])
    ),
  ];

  return (
    <div
      data-cv-page
      dir={getDir(data.language)}
      style={{
        ...pageStyle(data),
        width: "210mm",
        minHeight: "297mm",
        background: "#fff",
        padding: "16mm 18mm",
        boxSizing: "border-box",
      }}
    >
      <header style={{ textAlign: "center", marginBottom: 10 }}>
        <h1 style={{ fontSize: "1.7em", fontWeight: 500, margin: 0 }}>
          {data.personal.fullName || (data.language === "ar" ? "اسمك الكامل" : "Your Name")}
        </h1>
        {data.personal.jobTitle ? (
          <div style={{ marginTop: 4, fontStyle: "italic", color: "#64748B" }}>
            {data.personal.jobTitle}
          </div>
        ) : null}
        <div
          style={{
            marginTop: 10,
            fontSize: "0.88em",
            color: "#64748B",
            lineHeight: 1.7,
          }}
        >
          {contactLines(data).join("  |  ")}
        </div>
        <div
          style={{
            marginTop: 12,
            borderTop: "1px solid #172B4D",
            borderBottom: "3px double #172B4D",
            height: 6,
          }}
        />
      </header>

      {order.map((key) => {
        if (!isSectionVisible(data, key)) return null;
        return (
          <section key={key} style={{ marginTop: 12 }}>
            <h2
              style={{
                fontSize: "0.95em",
                fontWeight: 500,
                textAlign: "center",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                margin: "0 0 8px",
                color: "var(--cv-primary)",
              }}
            >
              {label(key, data.language)}
            </h2>
            {key === "summary" ? (
              <p style={{ whiteSpace: "pre-wrap", margin: 0, textAlign: "justify" }}>
                {data.personal.summary}
              </p>
            ) : null}
            {key === "experience" ? renderExperience(data) : null}
            {key === "education" ? renderEducation(data) : null}
            {key === "skills" ? <SkillsList data={data} /> : null}
            {key === "languages" ? <LanguagesList data={data} /> : null}
            {key === "projects" ? renderProjects(data) : null}
            {key === "certificates" ? renderCertificates(data) : null}
            {key === "volunteer" ? renderVolunteer(data) : null}
            {key === "awards" ? renderAwards(data) : null}
            {key === "references" ? renderReferences(data) : null}
          </section>
        );
      })}
    </div>
  );
}
