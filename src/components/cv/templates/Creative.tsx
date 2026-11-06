import type { CVData, SectionKey } from "@/types/cv";
import { hasContent } from "@/lib/utils";
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

const SIDE: SectionKey[] = ["skills", "languages", "projects"];

export function CreativeTemplate({ data }: { data: CVData }) {
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
        gridTemplateColumns: "72mm 1fr",
      }}
    >
      <aside
        style={{
          padding: "16mm 10mm",
          background: "var(--cv-primary)",
          color: "#fff",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            insetInlineEnd: -30,
            top: -30,
            width: 120,
            height: 120,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.08)",
          }}
        />
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: 18,
            background: "rgba(255,255,255,0.16)",
            display: "grid",
            placeItems: "center",
            fontWeight: 500,
            fontSize: "1.4em",
            marginBottom: 16,
          }}
        >
          {(data.personal.fullName || "CV")
            .split(" ")
            .filter(Boolean)
            .slice(0, 2)
            .map((part) => part[0])
            .join("")}
        </div>
        <h1 style={{ fontSize: "1.35em", fontWeight: 500, margin: 0, lineHeight: 1.3 }}>
          {data.personal.fullName || (data.language === "ar" ? "اسمك الكامل" : "Your Name")}
        </h1>
        {data.personal.jobTitle ? (
          <div style={{ marginTop: 8, opacity: 0.9 }}>{data.personal.jobTitle}</div>
        ) : null}

        <div style={{ marginTop: 22, fontSize: "0.88em", display: "grid", gap: 6, opacity: 0.95 }}>
          {contactLines(data).map((line) => (
            <div key={line}>{line}</div>
          ))}
        </div>

        {sideOrder.map((key) => {
          if (!isSectionVisible(data, key)) return null;
          return (
            <div key={key} style={{ marginTop: 22 }}>
              <div
                style={{
                  fontWeight: 500,
                  marginBottom: 8,
                  paddingBottom: 4,
                  borderBottom: "1px solid rgba(255,255,255,0.28)",
                }}
              >
                {label(key, data.language)}
              </div>
              {key === "skills" ? <SkillsList data={data} showLevel /> : null}
              {key === "languages" ? <LanguagesList data={data} /> : null}
              {key === "projects"
                ? data.projects
                    .filter((p) => hasContent(p.name))
                    .map((p) => (
                      <div key={p.id} style={{ marginBottom: 8, fontSize: "0.92em" }}>
                        <div style={{ fontWeight: 500 }}>{p.name}</div>
                        {p.description ? (
                          <div style={{ opacity: 0.9, marginTop: 2 }}>{p.description}</div>
                        ) : null}
                      </div>
                    ))
                : null}
            </div>
          );
        })}
      </aside>

      <main style={{ padding: "16mm 14mm" }}>
        {mainOrder.map((key) => {
          if (!isSectionVisible(data, key)) return null;
          return (
            <section key={key} style={{ marginBottom: 14 }}>
              <h2
                style={{
                  fontSize: "1.05em",
                  fontWeight: 500,
                  margin: "0 0 8px",
                  color: "var(--cv-primary)",
                  display: "inline-block",
                  background: "rgba(49, 94, 80, 0.1)",
                  padding: "3px 10px",
                  borderRadius: 8,
                }}
              >
                {label(key, data.language)}
              </h2>
              {key === "summary" ? (
                <p style={{ whiteSpace: "pre-wrap", margin: 0 }}>{data.personal.summary}</p>
              ) : null}
              {key === "experience" ? renderExperience(data) : null}
              {key === "education" ? renderEducation(data) : null}
              {key === "certificates" ? renderCertificates(data) : null}
              {key === "volunteer" ? renderVolunteer(data) : null}
              {key === "awards" ? renderAwards(data) : null}
              {key === "references" ? renderReferences(data) : null}
            </section>
          );
        })}
      </main>
    </div>
  );
}
