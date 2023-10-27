import { PropsWithChildren } from 'react';

import cc from 'classcat';

import style from '../../styles/modal.module.css';

import { Icon } from '~/components/icon/icon';
import { ModalProps, useModal } from '~/components/modal/use-modal';

export const Modal = (props: PropsWithChildren<ModalProps>) => {
  const { isVisible, modalRef, onHide } = useModal(props);

  return (
    <div
      ref={modalRef}
      className={cc([style.modal, { [style.modalActive]: isVisible }])}
      onClick={onHide}
    >
      <div
        className={cc([style.content, props.className])}
        onClick={(e) => e.stopPropagation()}
      >
        {props.title && (
          <h4 className='mb-4 text-2xl font-normal'>{props.title}</h4>
        )}

        <button className={style.closeIconWrap} onClick={onHide}>
          {(props.closeIcon && props.closeIcon) || <Icon name='close' />}
        </button>

        <div>{props.children}</div>
      </div>
    </div>
  );
};
