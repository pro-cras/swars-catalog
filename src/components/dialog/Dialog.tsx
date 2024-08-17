import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { ComponentProps } from "react";

export default function AppDialog({
  open,
  onClose,
  title,
  children,
}: ComponentProps<typeof Dialog> & {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Dialog
      open={open}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={onClose}
    >
      <DialogBackdrop className="fixed inset-0 bg-black/50 bg-blend-color-dodge" />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full max-w-xl rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
          >
            <DialogTitle as="h3" className="text-base/7 text-white font-medium">
              {title}
            </DialogTitle>
            {children}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
