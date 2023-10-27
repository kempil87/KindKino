import { useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';

import { PREFERENCES } from '~/shared/constants/PREFERENCES';

import { Modal } from '~/components/modal/modal';

export const PreferenceModal = () => {
  const [preferences, setPreferences] = useState(PREFERENCES);

  const addPreference = (pref: string) => {
    setPreferences((prev) => prev.filter((el) => el !== pref));
  };

  return (
    <Modal name='preference' title='Предпочтения'>
      <div className='flex flex-col gap-4'>
        <span className='min-w-[600px] max-w-[600px]'>
          Здесь вы можете выбрать свои предпочтения, эта информация поможет нам{' '}
          <br />
          подбирать лучшие фильмы и сериалы, индивидуально под вас, выберите 5
          или более
        </span>
      </div>

      <div className='mt-6 grid  grid-cols-4 gap-4'>
        <AnimatePresence>
          {preferences.map((el) => (
            <motion.button
              key={el}
              animate={{ opacity: 1 }}
              className='primary-gradient animated h-8 grow whitespace-nowrap rounded-md px-6 font-medium flex-center'
              exit={{ opacity: 0 }}
              whileHover={{ opacity: 0.6 }}
              onClick={() => addPreference(el)}
            >
              {el}
            </motion.button>
          ))}
        </AnimatePresence>
      </div>
    </Modal>
  );
};
