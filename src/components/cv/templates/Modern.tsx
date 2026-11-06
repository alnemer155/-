import type { CVData, SectionKey } from "@/types/cv";
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

const SIDEBAR_KEYS: SectionKey[] = ["skills", "languages", "certificates"];

export function ModernTemplate({ data }: { data: CVData }) {
  const mainOrder = data.customization.sectionOrder.filter(
    (key) => key !== "personal" && !SIDEBAR_KEYS.includes(key)
  );
  const sideOrder = data.customization.sectionOrder.filter((key) =>
    SIDEBAR_KEYS.includes(key)
  );
  const sideFirst = data.customization.layout === "sidebar-left";

  const sidebar = (
    <aside
      style={{
        background: "var(--cv-primary)",
        color: "#fff",
        padding: "18mm 10mm",
        boxSizing: "border-box",
      }}
    >
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: "1.45em", fontWeight: 500, margin: 0, lineHeight: 1.25 }}>
          {data.personal.fullName || (data.language === "ar" ? "اسمك الكامل" : "Your Name")}
        </h1>
        {data.personal.jobTitle ? (
          <div style={{ marginTop: 8, opacity: 0.9 }}>{data.personal.jobTitle}</div>
        ) : null}
      </div>

      <div style={{ marginBottom: 22 }}>
        <div style={{ fontWeight: 500, marginBottom: 8, opacity: 0.95 }}>
          {data.language === "ar" ? "التواصل" : "Contact"}
        </div>
        <div style={{ display: "grid", gap: 6, fontSize: "0.9em", opacity: 0.92 }}>
          {contactLines(data).map((line) => (
            <div key={line}>{line}</div>
          ))}
        </div>
      </div>

      {sideOrder.map((key) => {
        if (!isSectionVisible(data, key)) return null;
        return (
          <div key={key} style={{ marginBottom: 18 }}>
            <div
              style={{
                fontWeight: 500,
                marginBottom: 8,
                borderBottom: "1px solid rgba(255,255,255,0.35)",
                paddingBottom: 4,
              }}
            >
              {label(key, data.language)}
            </div>
            {key === "skills" ? (
              <div style={{ opacity: 0.95 }}>
                <SkillsList data={data} showLevel />
              </div>
            ) : null}
            {key === "languages" ? (
              <div style={{ opacity: 0.95 }}>
                <LanguagesList data={data} />
              </div>
            ) : null}
            {key === "certificates" ? (
              <div style={{ opacity: 0.95, fontSize: "0.92em" }}>
                {renderCertificates(data)}
              </div>
            ) : null}
          </div>
        );
      })}
    </aside>
  );

  const main = (
    <main style={{ padding: "16mm 12mm", boxSizing: "border-box" }}>
      {mainOrder.map((key) => {
        if (!isSectionVisible(data, key)) return null;
        if (key === "summary") {
          return (
            <section key={key}>
              <SectionTitle accent>{label("summary", data.language)}</SectionTitle>
              <p style={{ whiteSpace: "pre-wrap", margin: 0 }}>{data.personal.summary}</p>
            </section>
          );
        }
        if (key === "experience") {
          return (
            <section key={key}>
              <SectionTitle accent>{label("experience", data.language)}</SectionTitle>
              {renderExperience(data)}
            </section>
          );
        }
        if (key === "education") {
          return (
            <section key={key}>
              <SectionTitle accent>{label("education", data.language)}</SectionTitle>
              {renderEducation(data)}
            </section>
          );
        }
        if (key === "projects") {
          return (
            <section key={key}>
              <SectionTitle accent>{label("projects", data.language)}</SectionTitle>
              {renderProjects(data)}
            </section>
          );
        }
        if (key === "volunteer") {
          return (
            <section key={key}>
              <SectionTitle accent>{label("volunteer", data.language)}</SectionTitle>
              {renderVolunteer(data)}
            </section>
          );
        }
        if (key === "awards") {
          return (
            <section key={key}>
              <SectionTitle accent>{label("awards", data.language)}</SectionTitle>
              {renderAwards(data)}
            </section>
          );
        }
        if (key === "references") {
          return (
            <section key={key}>
              <SectionTitle accent>{label("references", data.language)}</SectionTitle>
              {renderReferences(data)}
            </section>
          );
        }
        return null;
      })}
    </main>
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
        display: "grid",
        gridTemplateColumns: sideFirst ? "68mm 1fr" : "1fr 68mm",
        boxSizing: "border-box",
      }}
    >
      {sideFirst ? (
        <>
          {sidebar}
          {main}
        </>
      ) : (
        <>
          {main}
          {sidebar}
        </>
      )}
    </div>
  );
}
