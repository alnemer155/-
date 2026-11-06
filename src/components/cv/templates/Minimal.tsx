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

function ThinTitle({ children }: { children: string }) {
  return (
    <h2
      style={{
        fontSize: "0.78em",
        fontWeight: 500,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        color: "#64748B",
        margin: "18px 0 8px",
      }}
    >
      {children}
    </h2>
  );
}

export function MinimalTemplate({ data }: { data: CVData }) {
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
        padding: "20mm 22mm",
        boxSizing: "border-box",
      }}
    >
      <header style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: "2em", fontWeight: 500, margin: 0 }}>
          {data.personal.fullName || (data.language === "ar" ? "اسمك الكامل" : "Your Name")}
        </h1>
        {data.personal.jobTitle ? (
          <div style={{ marginTop: 6, color: "var(--cv-primary)" }}>{data.personal.jobTitle}</div>
        ) : null}
        <div
          style={{
            marginTop: 12,
            color: "#64748B",
            fontSize: "0.9em",
            display: "flex",
            flexWrap: "wrap",
            gap: "4px 12px",
          }}
        >
          {contactLines(data).map((line, index) => (
            <span key={line}>
              {index > 0 ? <span style={{ marginInlineEnd: 12 }}>·</span> : null}
              {line}
            </span>
          ))}
        </div>
      </header>

      {order.map((key) => {
        if (!isSectionVisible(data, key)) return null;
        return (
          <section key={key}>
            <ThinTitle>{label(key, data.language)}</ThinTitle>
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
