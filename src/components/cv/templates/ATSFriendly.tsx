import type { CVData } from "@/types/cv";
import { formatDateRange, hasContent } from "@/lib/utils";
import {
  contactLines,
  isSectionVisible,
  label,
  pageStyle,
  proficiencyLabel,
  getDir,
} from "../shared";

function Line({ children }: { children: string }) {
  return <div style={{ marginBottom: 2 }}>{children}</div>;
}

export function ATSFriendlyTemplate({ data }: { data: CVData }) {
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
        padding: "15mm 16mm",
        boxSizing: "border-box",
        fontFamily:
          "var(--font-ibm-plex-arabic), 'IBM Plex Sans Arabic', Arial, sans-serif",
      }}
    >
      <header style={{ marginBottom: 14 }}>
        <h1 style={{ fontSize: "1.55em", fontWeight: 500, margin: "0 0 4px" }}>
          {data.personal.fullName || (data.language === "ar" ? "اسمك الكامل" : "Your Name")}
        </h1>
        {data.personal.jobTitle ? <Line>{data.personal.jobTitle}</Line> : null}
        {contactLines(data).map((line) => (
          <Line key={line}>{line}</Line>
        ))}
      </header>

      {order.map((key) => {
        if (!isSectionVisible(data, key)) return null;
        return (
          <section key={key} style={{ marginBottom: 12 }}>
            <h2
              style={{
                fontSize: "1.05em",
                fontWeight: 500,
                margin: "0 0 6px",
                textTransform: "uppercase",
                borderBottom: "1px solid #17212F",
                paddingBottom: 2,
              }}
            >
              {label(key, data.language)}
            </h2>

            {key === "summary" ? (
              <p style={{ margin: 0, whiteSpace: "pre-wrap" }}>{data.personal.summary}</p>
            ) : null}

            {key === "experience"
              ? data.experience
                  .filter((item) => hasContent(item.title) || hasContent(item.company))
                  .map((item) => (
                    <div key={item.id} style={{ marginBottom: 8 }}>
                      <div style={{ fontWeight: 500 }}>
                        {item.title}
                        {item.company ? ` — ${item.company}` : ""}
                      </div>
                      <div>
                        {formatDateRange(
                          item.startDate,
                          item.endDate,
                          item.current,
                          data.language
                        )}
                      </div>
                      {item.description ? (
                        <p style={{ margin: "4px 0 0", whiteSpace: "pre-wrap" }}>
                          {item.description}
                        </p>
                      ) : null}
                    </div>
                  ))
              : null}

            {key === "education"
              ? data.education
                  .filter((item) => hasContent(item.institution) || hasContent(item.degree))
                  .map((item) => (
                    <div key={item.id} style={{ marginBottom: 8 }}>
                      <div style={{ fontWeight: 500 }}>
                        {[item.degree, item.field].filter(hasContent).join(", ")}
                      </div>
                      <div>{item.institution}</div>
                      <div>
                        {formatDateRange(
                          item.startDate,
                          item.endDate,
                          false,
                          data.language
                        )}
                      </div>
                    </div>
                  ))
              : null}

            {key === "skills" ? (
              <div>
                {data.skills
                  .filter((s) => hasContent(s.name))
                  .map((s) => s.name)
                  .join(" · ")}
              </div>
            ) : null}

            {key === "languages"
              ? data.languages
                  .filter((l) => hasContent(l.name))
                  .map((l) => (
                    <div key={l.id}>
                      {l.name}: {proficiencyLabel(l.proficiency, data.language)}
                    </div>
                  ))
              : null}

            {key === "projects"
              ? data.projects
                  .filter((p) => hasContent(p.name))
                  .map((p) => (
                    <div key={p.id} style={{ marginBottom: 6 }}>
                      <div style={{ fontWeight: 500 }}>{p.name}</div>
                      {p.url ? <div>{p.url}</div> : null}
                      {p.description ? (
                        <p style={{ margin: "2px 0 0", whiteSpace: "pre-wrap" }}>
                          {p.description}
                        </p>
                      ) : null}
                    </div>
                  ))
              : null}

            {key === "certificates"
              ? data.certificates
                  .filter((c) => hasContent(c.name))
                  .map((c) => (
                    <div key={c.id}>
                      {c.name}
                      {c.issuer ? ` — ${c.issuer}` : ""}
                      {c.date ? ` (${c.date})` : ""}
                    </div>
                  ))
              : null}

            {key === "volunteer"
              ? data.volunteer
                  .filter((v) => hasContent(v.role) || hasContent(v.organization))
                  .map((v) => (
                    <div key={v.id} style={{ marginBottom: 6 }}>
                      <div style={{ fontWeight: 500 }}>
                        {v.role}
                        {v.organization ? ` — ${v.organization}` : ""}
                      </div>
                      <div>
                        {formatDateRange(v.startDate, v.endDate, false, data.language)}
                      </div>
                      {v.description ? (
                        <p style={{ margin: "2px 0 0", whiteSpace: "pre-wrap" }}>
                          {v.description}
                        </p>
                      ) : null}
                    </div>
                  ))
              : null}

            {key === "awards"
              ? data.awards
                  .filter((a) => hasContent(a.title))
                  .map((a) => (
                    <div key={a.id}>
                      {a.title}
                      {a.issuer ? ` — ${a.issuer}` : ""}
                      {a.date ? ` (${a.date})` : ""}
                      {a.description ? ` — ${a.description}` : ""}
                    </div>
                  ))
              : null}

            {key === "references"
              ? data.references
                  .filter((r) => hasContent(r.name))
                  .map((r) => (
                    <div key={r.id} style={{ marginBottom: 6 }}>
                      <div style={{ fontWeight: 500 }}>{r.name}</div>
                      <div>
                        {[r.title, r.company].filter(hasContent).join(", ")}
                      </div>
                      <div>{[r.email, r.phone].filter(hasContent).join(" | ")}</div>
                    </div>
                  ))
              : null}
          </section>
        );
      })}
    </div>
  );
}
