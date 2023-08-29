import { useRef } from 'react';

import { useStoreMap } from "effector-react";

import { $modal, modalApi, ModalName } from "~/shared/store/modal";

export interface ModalProps {
  name: ModalName;
  onClose?: () => void;
  title?: string;
}

export const useModal = ({ name, onClose }: ModalProps) => {
  const isVisible = useStoreMap($modal, (s) => s === name);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const onHide = () => {
    modalApi.hide();
    onClose?.();
  };

  return { isVisible, modalRef, onHide };
};
