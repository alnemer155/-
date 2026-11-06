import type { CVData } from "@/types/cv";
import {
  SectionTitle,
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

export function ClassicTemplate({ data }: { data: CVData }) {
  const order = data.customization.sectionOrder.filter(
    (key) => key !== "personal"
  );

  return (
    <div
      data-cv-page
      dir={getDir(data.language)}
      style={{
        ...pageStyle(data),
        width: "210mm",
        minHeight: "297mm",
        background: "#fff",
        padding: "18mm 16mm",
        boxSizing: "border-box",
      }}
    >
      <header style={{ textAlign: "center", marginBottom: 18 }}>
        <h1 style={{ fontSize: "1.8em", fontWeight: 500, margin: 0, color: "var(--cv-primary)" }}>
          {data.personal.fullName || (data.language === "ar" ? "اسمك الكامل" : "Your Name")}
        </h1>
        {data.personal.jobTitle ? (
          <div style={{ marginTop: 4, color: "#64748B" }}>{data.personal.jobTitle}</div>
        ) : null}
        <div
          style={{
            marginTop: 10,
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "6px 14px",
            fontSize: "0.9em",
            color: "#64748B",
          }}
        >
          {contactLines(data).map((line) => (
            <span key={line}>{line}</span>
          ))}
        </div>
        <div
          style={{
            height: 2,
            background: "var(--cv-primary)",
            marginTop: 14,
            opacity: 0.85,
          }}
        />
      </header>

      {order.map((key) => {
        if (!isSectionVisible(data, key)) return null;
        if (key === "summary") {
          return (
            <section key={key}>
              <SectionTitle>{label("summary", data.language)}</SectionTitle>
              <p style={{ whiteSpace: "pre-wrap", margin: 0 }}>{data.personal.summary}</p>
            </section>
          );
        }
        if (key === "experience") {
          return (
            <section key={key}>
              <SectionTitle>{label("experience", data.language)}</SectionTitle>
              {renderExperience(data)}
            </section>
          );
        }
        if (key === "education") {
          return (
            <section key={key}>
              <SectionTitle>{label("education", data.language)}</SectionTitle>
              {renderEducation(data)}
            </section>
          );
        }
        if (key === "skills") {
          return (
            <section key={key}>
              <SectionTitle>{label("skills", data.language)}</SectionTitle>
              <SkillsList data={data} />
            </section>
          );
        }
        if (key === "languages") {
          return (
            <section key={key}>
              <SectionTitle>{label("languages", data.language)}</SectionTitle>
              <LanguagesList data={data} />
            </section>
          );
        }
        if (key === "projects") {
          return (
            <section key={key}>
              <SectionTitle>{label("projects", data.language)}</SectionTitle>
              {renderProjects(data)}
            </section>
          );
        }
        if (key === "certificates") {
          return (
            <section key={key}>
              <SectionTitle>{label("certificates", data.language)}</SectionTitle>
              {renderCertificates(data)}
            </section>
          );
        }
        if (key === "volunteer") {
          return (
            <section key={key}>
              <SectionTitle>{label("volunteer", data.language)}</SectionTitle>
              {renderVolunteer(data)}
            </section>
          );
        }
        if (key === "awards") {
          return (
            <section key={key}>
              <SectionTitle>{label("awards", data.language)}</SectionTitle>
              {renderAwards(data)}
            </section>
          );
        }
        if (key === "references") {
          return (
            <section key={key}>
              <SectionTitle>{label("references", data.language)}</SectionTitle>
              {renderReferences(data)}
            </section>
          );
        }
        return null;
      })}
    </div>
  );
}
