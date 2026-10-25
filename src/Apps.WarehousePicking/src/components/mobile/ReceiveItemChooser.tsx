import { useState } from "react";
import { ItemPicker } from "@/components/mobile/ItemPicker";
import { NewItemDialog } from "@/components/mobile/NewItemDialog";
import type { PickItem } from "@/hooks/UsePickItems";
import { useStyles } from "@/styles/ReceiveItemChooser.styles";

type ReceiveItemChooserProps = {
  onSelect: (item: PickItem) => void;
};

// Choose an existing item or create one before recording the inbound transaction.
export function ReceiveItemChooser({ onSelect }: ReceiveItemChooserProps) {
  const styles = useStyles();
  const [newItem, setNewItem] = useState<{ name?: string } | null>(null);

  return (
    <div className={styles.root}>
      <ItemPicker onSelect={onSelect} onCreate={(name) => setNewItem({ name: name || undefined })} />

      <NewItemDialog
        open={newItem !== null}
        onOpenChange={(open) => !open && setNewItem(null)}
        defaults={newItem ?? undefined}
        onCreated={(item) => {
          setNewItem(null);
          onSelect(item);
        }}
      />
    </div>
  );
}
