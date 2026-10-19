import { useLayoutEffect, useRef, type FocusEvent, type Ref } from "react";
import { cn } from "@/lib/utils";

type InkProps = {
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
  className?: string;
  multiline?: boolean;
};

export function Ink({ value, placeholder, onChange, className, multiline = false }: InkProps) {
  const ref = useRef<HTMLElement>(null);
  const focused = useRef(false);

  useLayoutEffect(() => {
    const node = ref.current;
    if (!node || focused.current) return;
    if ((node.textContent ?? "") !== value) node.textContent = value;
  }, [value]);

  const shared = {
    className: cn(
      "ink cursor-text rounded-sm outline-none hover:bg-brass-soft focus:bg-brass-soft",
      multiline && "block whitespace-pre-wrap",
      className,
    ),
    contentEditable: true,
    suppressContentEditableWarning: true,
    role: "textbox" as const,
    "aria-label": placeholder,
    "data-placeholder": placeholder,
    spellCheck: true,
    onFocus: () => {
      focused.current = true;
    },
    onBlur: (event: FocusEvent<HTMLElement>) => {
      focused.current = false;
      const next = (event.currentTarget.textContent ?? "").replace(/\u00a0/g, " ");
      onChange(multiline ? next.replace(/^\n+|\n+$/g, "") : next.trim());
    },
  };

  if (multiline) return <div ref={ref as Ref<HTMLDivElement>} {...shared} />;
  return <span ref={ref as Ref<HTMLSpanElement>} {...shared} />;
}
