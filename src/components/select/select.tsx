import React, { useRef, useState } from 'react';

import cc from 'classcat';
import { Controller, useFormContext } from 'react-hook-form';
import { useOutsideClick } from 'rooks';

import { Icon } from '~/components/icon/icon';

export interface SelectOption {
  label: string;
  value: string | number;
}

export interface ValueProps extends Pick<SelectOption, 'value'> {
  name: string;
}

export interface SelectProps {
  name: string;
  options: SelectOption[];
  handleChange?: (name: string, options: SelectOption[]) => void;
  multiple?: boolean;
  notFoundText?: string;
  placeholder?: string;
}

export const Select = ({
  options,
  name,
  handleChange,
  placeholder,
  multiple,
  notFoundText = 'Ничего не найдено',
}: SelectProps) => {
  const { control } = useFormContext();
  const ref = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [isMenuBVisible, setIsMenuVisible] = useState(false);

  const onFocus = () => {
    if (isMenuBVisible) {
      onBlur();

      return;
    }
    if (menuRef.current && ref.current) {
      menuRef.current.classList.remove('translate-y-6');
      menuRef.current.classList.remove('opacity-0');
      menuRef.current.classList.remove('invisible');
      ref.current.classList.add('!border-primary');
      setIsMenuVisible(true);
    }
  };

  const onBlur = () => {
    if (menuRef.current && ref.current) {
      menuRef.current.classList.add('translate-y-6');
      menuRef.current.classList.add('opacity-0');
      menuRef.current.classList.add('invisible');
      ref.current.classList.remove('!border-primary');
      setIsMenuVisible(false);
    }
  };

  useOutsideClick(ref, onBlur);

  return (
    <div
      ref={ref}
      className='relative rounded-md border border-border transition-all'
    >
      <Controller
        control={control}
        name={name}
        render={({ field: { value, onChange } }) => {
          const selectedList = value?.map((i: SelectOption) => i.label);

          const onSelectChange = (option: SelectOption) => {
            const newValue = ((): SelectOption[] => {
              if (!value || !multiple) {
                return [option];
              }

              if (
                value.filter((i: SelectOption) => i.value === option.value)
                  .length
              ) {
                return value.filter(
                  (i: SelectOption) => i.value !== option.value,
                );
              }

              const newArr = [...value];

              newArr.push(option);

              return newArr;
            })();

            onChange(newValue);
            handleChange?.(name, newValue);

            !multiple && onBlur();
          };

          return (
            <>
              <button
                className='flex min-h-[40px] w-full min-w-fit cursor-pointer items-center rounded-md bg-dark outline-none'
                onClick={onFocus}
              >
                <div
                  className={cc([
                    'relative truncate px-5 py-1 text-white/60',
                    { '!text-white': selectedList?.length },
                  ])}
                >
                  {selectedList?.join(', ') || placeholder || ''}
                </div>

                <Icon
                  name='downAngle'
                  size={24}
                  className={cc([
                    'absolute right-3 -rotate-180 text-white/60 transition-all',
                    { '!rotate-0': isMenuBVisible },
                  ])}
                />
              </button>
              <div
                ref={menuRef}
                className='invisible absolute top-[120%] z-40 max-h-80 w-full translate-y-6 space-y-2 overflow-y-auto rounded-md border border-border bg-dark px-3 py-2 opacity-0 transition-all'
              >
                {options?.length ? (
                  options.map((option) => {
                    const isSelected = !!value?.find(
                      (el: SelectOption) => el.value === option.value,
                    );

                    return (
                      <button
                        key={option.value}
                        className={cc([
                          'relative flex w-full cursor-pointer items-center justify-between break-words rounded-md px-3 py-1 text-start text-sm text-white/60 transition-all hover:text-white',
                          { '!text-white': isSelected },
                        ])}
                        onClick={() => onSelectChange(option)}
                      >
                        {option.label}

                        {isSelected && <Icon name='done' />}
                      </button>
                    );
                  })
                ) : (
                  <span className='text-sm opacity-75'>{notFoundText}</span>
                )}
              </div>
            </>
          );
        }}
      />
    </div>
  );
};
