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

export function ExecutiveTemplate({ data }: { data: CVData }) {
  const order = data.customization.sectionOrder.filter((key) => key !== "personal");

  return (
    <div
      data-cv-page
      dir={getDir(data.language)}
      style={{
        ...pageStyle(data),
        width: "210mm",
        minHeight: "297mm",
        background: "#fff",
        boxSizing: "border-box",
        borderTop: "10px solid var(--cv-primary)",
        padding: "16mm 18mm 18mm",
      }}
    >
      <header
        style={{
          display: "grid",
          gridTemplateColumns: "1.4fr 1fr",
          gap: 24,
          alignItems: "end",
          borderBottom: "1px solid #E8EBEF",
          paddingBottom: 16,
          marginBottom: 8,
        }}
      >
        <div>
          <div
            style={{
              fontSize: "0.75em",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--cv-primary)",
              marginBottom: 8,
              fontWeight: 500,
            }}
          >
            {data.language === "ar" ? "سيرة تنفيذية" : "Executive Profile"}
          </div>
          <h1 style={{ fontSize: "1.9em", fontWeight: 500, margin: 0 }}>
            {data.personal.fullName || (data.language === "ar" ? "اسمك الكامل" : "Your Name")}
          </h1>
          {data.personal.jobTitle ? (
            <div style={{ marginTop: 6, color: "#64748B" }}>{data.personal.jobTitle}</div>
          ) : null}
        </div>
        <div style={{ fontSize: "0.9em", color: "#64748B", display: "grid", gap: 4 }}>
          {contactLines(data).map((line) => (
            <div key={line}>{line}</div>
          ))}
        </div>
      </header>

      {order.map((key) => {
        if (!isSectionVisible(data, key)) return null;
        return (
          <section key={key} style={{ marginTop: 14 }}>
            <h2
              style={{
                fontSize: "1em",
                fontWeight: 500,
                color: "var(--cv-primary)",
                margin: "0 0 8px",
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <span
                style={{
                  width: 18,
                  height: 2,
                  background: "var(--cv-primary)",
                  display: "inline-block",
                }}
              />
              {label(key, data.language)}
            </h2>
            {key === "summary" ? (
              <p style={{ whiteSpace: "pre-wrap", margin: 0 }}>{data.personal.summary}</p>
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
