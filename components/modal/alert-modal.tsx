"use client";

interface AlerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
}

import React, { useEffect, useState } from "react";
import { Modal } from "@/components/modal";
import { Button } from "@/components/ui/button";

export const AlerModal = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
}: AlerModalProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Modal
      title="Are you sure ?"
      description="This action can't be undone!..."
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="pt-6 space-x-2 flex items-center justify-end w-full">
        <Button disabled={loading} variant={"outline"} onClick={onClose}>
          Close
        </Button>
        <Button disabled={loading} variant={"destructive"} onClick={onConfirm}>
          Confirm
        </Button>
      </div>
    </Modal>
  );
};
