import { useEffect, useRef, useState } from 'react';

import cc from 'classcat';
import { useUnit } from 'effector-react/scope';
import { FormProvider, useForm } from 'react-hook-form';
import { useOutsideClick } from 'rooks';

import { $profile } from '~/shared/models/profile';
import { prepareDate } from '~/shared/utils/prepare-date';

import style from '~/styles/header.module.css';

import { Badge } from '~/components/badge/badge';
import { Checkbox } from '~/components/checkbox/checkbox';
import { Divider } from '~/components/divider/divider';
import { Icon } from '~/components/icon/icon';
import { Tooltip } from '~/components/tooltip/tooltip';

interface NotificationProps {
  createdAt: number;
  id: number;
  text: string;
  viewedAt: number | null;
}

const COUNT = 100;

const NOTIFICATIONS = Array.from({ length: 110 }).map((_, index) => ({
  createdAt: 1_697_292_864,
  id: index + 1,
  text: 'Фильм Гарри Поттер и философский камень (2001) успешно добавлен в избранное',
  viewedAt: index > 10 ? 1_697_292_864 : null,
})) as NotificationProps[];

export const Notifications = () => {
  const { profileModel } = useUnit({ profileModel: $profile });
  const methods = useForm();

  const [isOpen, setIsOpen] = useState(false);
  const [selectedList, setSelectedList] = useState<string[]>([]);

  const menuRef = useRef<HTMLDivElement>(null);

  const selectedCount = selectedList.length;

  const toggleMenu = () => setIsOpen(!isOpen);
  const hideMenu = () => isOpen && setIsOpen(false);

  const changeCheckbox = (nameId: string) => {
    const set: Set<string> = new Set(selectedList);

    if (set.has(nameId)) {
      set.delete(nameId);
    } else {
      set.add(nameId);
    }

    setSelectedList([...set]);
  };

  const selectAll = () => {
    setSelectedList(NOTIFICATIONS.map((el) => String(el.id)));

    NOTIFICATIONS.map((el) => methods.setValue(String(el.id), true));
  };

  useOutsideClick(menuRef, hideMenu);

  useEffect(() => {
    const selectedIds: string[] = [];

    NOTIFICATIONS.map((el) => {
      if (el.viewedAt) {
        methods.setValue(String(el.id), true);
        selectedIds.push(String(el.id));
      }
    });

    setSelectedList(selectedIds);
  }, [methods]);

  if (!profileModel) return null;

  return (
    <div className='group/notification relative'>
      <Tooltip
        disable={isOpen}
        position='bottom_left'
        text={`${COUNT || 'Нет'}  новых уведомлений`}
      >
        <Badge count={COUNT} overflowCount={99}>
          <button className={style.headerButton} onClick={toggleMenu}>
            <Icon className={style.search} name='bell' />
          </button>
        </Badge>
      </Tooltip>

      <div
        ref={menuRef}
        className={cc([
          'invisible absolute right-0 top-[120%] w-96 scale-75 rounded-md bg-dark py-2 opacity-0 transition-all custom-shadow group-checked:opacity-100',
          { '!visible !scale-100 !opacity-100': isOpen },
        ])}
      >
        <div className='px-5 flex-between'>
          <div>
            <span className='pr-3 font-medium'>Уведомления</span>
            {!!selectedCount && (
              <span className='text-[0.8rem] font-medium text-grey'>{`${selectedCount}/${NOTIFICATIONS.length} выбрано`}</span>
            )}
          </div>

          <button
            className='rounded transition-all size-7 flex-center hover:bg-light_dark hover:text-primary'
            onClick={selectAll}
          >
            <Icon name='double_done' />
          </button>
        </div>

        <Divider />

        <FormProvider {...methods}>
          <div className='max-h-80 overflow-y-auto px-5'>
            {NOTIFICATIONS.map((el, index) => (
              <div key={el.id}>
                {!!index && <Divider />}
                <div className='flex flex-col'>
                  <Checkbox
                    changeCheckbox={changeCheckbox}
                    label={el.text}
                    name={String(el.id)}
                  />
                  <span className='text-end text-[11px] font-medium text-grey'>
                    {prepareDate(el.createdAt)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </FormProvider>
      </div>
    </div>
  );
};
