import React, { PropsWithChildren } from "react";

import cc from "classcat";

import { Icon } from "~/components/icon/icon";
import { ModalProps, useModal } from '~/components/modal/use-modal';

import style from "../../styles/modal.module.css";

export const Modal = (props: PropsWithChildren<ModalProps>) => {
  const { isVisible, modalRef, onHide } = useModal(props);

  return (
    <div
      ref={modalRef}
      className={cc([style.modal, { [style.modalActive]: isVisible }])}
      onClick={onHide}
    >
      <div className={style.content} onClick={(e) => e.stopPropagation()}>
        <h4 className="mb-4 text-2xl font-normal">{props.title}</h4>
        <Icon className={style.closeIcon} name="close" onClick={onHide} />
        <div>{props.children}</div>
      </div>
    </div>
  );
};
