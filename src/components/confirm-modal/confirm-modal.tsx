import {useUnit} from 'effector-react/scope';

import {$confirmModal} from '~/shared/models/confirm-modal';
import {hideModal} from '~/shared/models/modal';

import {Button} from '~/components/button/button';
import {Modal} from '~/components/modal/modal';

export const ConfirmModal = () => {
  const {confirmModel,hideModalFn} = useUnit({
    confirmModel:$confirmModal,
    hideModalFn:hideModal,
  });

  const handleConfirm = () => {
    confirmModel?.onConfirm();
    hideModalFn();
  };

  return (
    <Modal name='confirm' title={confirmModel?.title}>
      <span className='text-white/70 font-medium text-sm'>{confirmModel?.subtitle}</span>

      <div className="flex items-center space-x-3 mt-5 w-96">
        <Button onClick={handleConfirm}>{confirmModel?.successButtonText}</Button>
        <Button view='light' onClick={() => hideModalFn()}>Отмена</Button>
      </div>
    </Modal>
  );

};
