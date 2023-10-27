import { useUnit } from 'effector-react/scope';

import { $confirmModal } from '~/shared/models/confirm-modal';
import { hideModal } from '~/shared/models/modal';

import { Button } from '~/components/button/button';
import { Modal } from '~/components/modal/modal';

export const ConfirmModal = () => {
  const { confirmModel, hideModalFn } = useUnit({
    confirmModel: $confirmModal,
    hideModalFn: hideModal,
  });

  const handleConfirm = () => {
    confirmModel?.onConfirm();
    hideModalFn();
  };

  return (
    <Modal name='confirm' title={confirmModel?.title}>
      <span className='text-sm font-medium text-white/70'>
        {confirmModel?.subtitle}
      </span>

      <div className='mt-5 flex w-96 items-center space-x-3'>
        <Button onClick={handleConfirm}>
          {confirmModel?.successButtonText}
        </Button>
        <Button view='light' onClick={() => hideModalFn()}>
          Отмена
        </Button>
      </div>
    </Modal>
  );
};
