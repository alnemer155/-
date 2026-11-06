"use client";

import type { CVData } from "@/types/cv";
import { ClassicTemplate } from "./templates/Classic";
import { ModernTemplate } from "./templates/Modern";
import { MinimalTemplate } from "./templates/Minimal";
import { ExecutiveTemplate } from "./templates/Executive";
import { ProfessionalTemplate } from "./templates/Professional";
import { CreativeTemplate } from "./templates/Creative";
import { AcademicTemplate } from "./templates/Academic";
import { ATSFriendlyTemplate } from "./templates/ATSFriendly";
import { EmptyPreview, hasPreviewContent } from "./shared";

interface CVDocumentProps {
  data: CVData;
  showEmpty?: boolean;
}

export function CVDocument({ data, showEmpty = true }: CVDocumentProps) {
  if (showEmpty && !hasPreviewContent(data)) {
    return (
      <div
        data-cv-page
        style={{
          width: "210mm",
          minHeight: "297mm",
          background: "#fff",
        }}
      >
        <EmptyPreview language={data.language} />
      </div>
    );
  }

  switch (data.customization.templateId) {
    case "classic":
      return <ClassicTemplate data={data} />;
    case "modern":
      return <ModernTemplate data={data} />;
    case "minimal":
      return <MinimalTemplate data={data} />;
    case "executive":
      return <ExecutiveTemplate data={data} />;
    case "professional":
      return <ProfessionalTemplate data={data} />;
    case "creative":
      return <CreativeTemplate data={data} />;
    case "academic":
      return <AcademicTemplate data={data} />;
    case "ats":
      return <ATSFriendlyTemplate data={data} />;
    default:
      return <ModernTemplate data={data} />;
  }
}
