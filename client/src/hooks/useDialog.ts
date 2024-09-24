import { useState } from "react";

export default function useDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState<string | undefined>();

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);
  const setDialogTitle = (title: string) => setTitle(title);

  return { isOpen, openDialog, closeDialog, title, setDialogTitle };
}
