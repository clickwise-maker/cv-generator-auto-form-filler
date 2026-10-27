import { Plus, Trash2 } from "lucide-react";
import { Button, TextInput } from "@/components/studio/ui";
import { useStudio } from "@/lib/cv/store";
import { useT } from "@/lib/i18n/i18n";

/** Unlimited "Add more details" rows (label + value), shared by CV Generator and Form Filler. */
export function CustomDetails() {
  const t = useT();
  const rows = useStudio((s) => s.profile.personal.customDetails);
  const add = useStudio((s) => s.addCustomDetail);
  const update = useStudio((s) => s.updateCustomDetail);
  const remove = useStudio((s) => s.removeCustomDetail);
  return (
    <div className="flex flex-col gap-2" data-testid="custom-details">
      {rows.map((row) => (
        <div key={row.id} className="grid grid-cols-[1fr_1.4fr_auto] items-center gap-2">
          <TextInput dir="auto" aria-label={t("Detail name")} placeholder={t("Detail name")} value={row.label} onChange={(e) => update(row.id, { label: e.target.value })} />
          <TextInput dir="auto" aria-label={t("Value")} placeholder={t("Value")} value={row.value} onChange={(e) => update(row.id, { value: e.target.value })} />
          <button type="button" className="grid size-11 place-items-center text-muted hover:text-forest" aria-label={t("Remove")} onClick={() => remove(row.id)}>
            <Trash2 className="size-4" aria-hidden />
          </button>
        </div>
      ))}
      <Button tone="quiet" className="h-11 self-start px-4" data-testid="add-more-details" onClick={() => add()}>
        <Plus className="size-4" aria-hidden /> {t("Add more details")}
      </Button>
    </div>
  );
}
