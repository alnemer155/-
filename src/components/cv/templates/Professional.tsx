import type { CVData, SectionKey } from "@/types/cv";
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

const SIDE: SectionKey[] = ["skills", "languages", "awards", "references"];

export function ProfessionalTemplate({ data }: { data: CVData }) {
  const mainOrder = data.customization.sectionOrder.filter(
    (key) => key !== "personal" && !SIDE.includes(key)
  );
  const sideOrder = data.customization.sectionOrder.filter((key) => SIDE.includes(key));

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
        display: "grid",
        gridTemplateRows: "auto 1fr",
      }}
    >
      <header
        style={{
          background: "var(--cv-primary)",
          color: "#fff",
          padding: "14mm 16mm 12mm",
        }}
      >
        <h1 style={{ fontSize: "1.75em", fontWeight: 500, margin: 0 }}>
          {data.personal.fullName || (data.language === "ar" ? "اسمك الكامل" : "Your Name")}
        </h1>
        {data.personal.jobTitle ? (
          <div style={{ marginTop: 6, opacity: 0.92 }}>{data.personal.jobTitle}</div>
        ) : null}
        <div
          style={{
            marginTop: 12,
            display: "flex",
            flexWrap: "wrap",
            gap: "6px 16px",
            fontSize: "0.9em",
            opacity: 0.9,
          }}
        >
          {contactLines(data).map((line) => (
            <span key={line}>{line}</span>
          ))}
        </div>
      </header>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.55fr 1fr",
          gap: 0,
        }}
      >
        <main style={{ padding: "12mm 12mm 16mm 16mm", borderInlineEnd: "1px solid #E8EBEF" }}>
          {mainOrder.map((key) => {
            if (!isSectionVisible(data, key)) return null;
            return (
              <section key={key} style={{ marginBottom: 14 }}>
                <h2
                  style={{
                    fontSize: "1em",
                    fontWeight: 500,
                    margin: "0 0 8px",
                    color: "var(--cv-primary)",
                    borderBottom: "2px solid #E8EBEF",
                    paddingBottom: 4,
                  }}
                >
                  {label(key, data.language)}
                </h2>
                {key === "summary" ? (
                  <p style={{ whiteSpace: "pre-wrap", margin: 0 }}>{data.personal.summary}</p>
                ) : null}
                {key === "experience" ? renderExperience(data) : null}
                {key === "education" ? renderEducation(data) : null}
                {key === "projects" ? renderProjects(data) : null}
                {key === "certificates" ? renderCertificates(data) : null}
                {key === "volunteer" ? renderVolunteer(data) : null}
              </section>
            );
          })}
        </main>
        <aside style={{ padding: "12mm 14mm 16mm 12mm", background: "#FAFBFC" }}>
          {sideOrder.map((key) => {
            if (!isSectionVisible(data, key)) return null;
            return (
              <section key={key} style={{ marginBottom: 16 }}>
                <h2
                  style={{
                    fontSize: "0.95em",
                    fontWeight: 500,
                    margin: "0 0 8px",
                    color: "var(--cv-primary)",
                  }}
                >
                  {label(key, data.language)}
                </h2>
                {key === "skills" ? <SkillsList data={data} showLevel /> : null}
                {key === "languages" ? <LanguagesList data={data} /> : null}
                {key === "awards" ? renderAwards(data) : null}
                {key === "references" ? renderReferences(data) : null}
              </section>
            );
          })}
        </aside>
      </div>
    </div>
  );
}
