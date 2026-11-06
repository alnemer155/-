"use client";

import { ArrowDown, ArrowUp, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface ItemControlsProps {
  onUp: () => void;
  onDown: () => void;
  onRemove: () => void;
  disableUp?: boolean;
  disableDown?: boolean;
}

export function ItemControls({
  onUp,
  onDown,
  onRemove,
  disableUp,
  disableDown,
}: ItemControlsProps) {
  return (
    <div className="flex items-center gap-1">
      <Button
        variant="ghost"
        size="sm"
        className="!h-8 !px-2"
        onClick={onUp}
        disabled={disableUp}
        aria-label="تحريك لأعلى"
      >
        <ArrowUp className="size-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className="!h-8 !px-2"
        onClick={onDown}
        disabled={disableDown}
        aria-label="تحريك لأسفل"
      >
        <ArrowDown className="size-4" />
      </Button>
      <Button
        variant="danger"
        size="sm"
        className="!h-8 !px-2"
        onClick={onRemove}
        aria-label="حذف"
      >
        <Trash2 className="size-4" />
      </Button>
    </div>
  );
}
