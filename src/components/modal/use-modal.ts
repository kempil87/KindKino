import {ReactNode, useRef} from 'react';

import { useUnit} from 'effector-react/scope';

import {$modal, hideModal, ModalName} from '~/shared/models/modal';

export interface ModalProps {
  name: ModalName;
  closeIcon?:boolean | ReactNode,
  onClose?: () => void;
  title?: string;
}

export const useModal = ({ name, onClose }: ModalProps) => {
  const {hideModalFn,modalModel} = useUnit({
    hideModalFn:hideModal,
    modalModel:$modal
  });
  const modalRef = useRef<HTMLDivElement | null>(null);

  const isVisible = modalModel === name;

  const onHide = () => {
    hideModalFn();
    onClose?.();
  };

  return { isVisible, modalRef, onHide };
};
