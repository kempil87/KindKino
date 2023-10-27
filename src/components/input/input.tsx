import { ChangeEvent, HTMLProps, useId, useState } from 'react';

import cc from 'classcat';
import {
  Controller,
  FieldPath,
  FieldValues,
  RegisterOptions,
  useFormContext,
} from 'react-hook-form';

import { Icon } from '~/components/icon/icon';

export interface InputProps<Name extends FieldValues>
  extends HTMLProps<HTMLInputElement> {
  name: FieldPath<Name>;
  className?: HTMLDivElement['className'];
  formClassName?: HTMLDivElement['className'];
  handleChange?: (name: string, value: string) => void;
  isPassword?: boolean;
  label?: string;
  rules?: RegisterOptions;
}

export const Input = <Name extends FieldValues>({
  name,
  className,
  rules,
  formClassName,
  handleChange,
  label,
  isPassword = false,
  ...props
}: InputProps<Name>) => {
  const id = useId();
  const { control } = useFormContext();

  const [secureVisible, setSecureVisible] = useState(isPassword);

  const togglePassword = () => setSecureVisible(!secureVisible);

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { error },
      }) => {
        const onInputChange = (e: ChangeEvent) => {
          onChange(e);
          handleChange?.(name, value);
        };

        const onClear = () => onChange('');

        return (
          <div className={cc([formClassName, 'space-y-2.5'])}>
            {label && (
              <label
                className='w-fit cursor-pointer pl-3 text-sm font-normal'
                htmlFor={id}
              >
                {label}
              </label>
            )}

            <div className='group relative h-full w-full'>
              <input
                autoCorrect='off'
                id={id}
                value={value || ''}
                onBlur={onBlur}
                onChange={onInputChange}
                onFocus={(e) => e.stopPropagation()}
                {...props}
                className={cc([
                  'w-full appearance-none rounded border border-solid border-border !bg-transparent px-3 py-2 text-white caret-primary outline-none transition-all placeholder:text-white/60 hover:border-primary/70 focus:border-primary ',
                  className,
                  {
                    'border-red-500 placeholder:text-red-500 hover:border-red-500 focus:border-red-500':
                      error?.message?.length,
                  },
                  {
                    'focus:w-[calc(100%-55px)] group-active:w-[calc(100%-55px)]':
                      isPassword,
                  },
                  { '!text-transparent caret-transparent': secureVisible },
                ])}
              />

              {value && secureVisible && (
                <div className='pointer-events-none absolute inset-0 px-3 py-2'>
                  {Array.from({ length: (value as string).length })
                    .fill('•')
                    .join('')}
                </div>
              )}

              {value && !isPassword && (
                <div
                  className={cc([
                    'right-2.5 cursor-pointer rounded-md border border-grey text-white/70 transition-all size-7 flex-center pos-abs-y hover:text-white group-focus-within:bg-primary',
                    { 'border-red-500 !bg-transparent': error },
                  ])}
                  onClick={onClear}
                >
                  <Icon name='close' size={13} />
                </div>
              )}

              {isPassword && (
                <div
                  className='invisible absolute right-0 top-0 box-content cursor-pointer rounded-md border border-primary opacity-0 transition-all size-10 flex-center hover:border-primary/60 group-focus-within:visible group-focus-within:z-10 group-focus-within:opacity-100'
                  onClick={togglePassword}
                >
                  <Icon name={secureVisible ? 'eye_close' : 'eye'} />
                </div>
              )}
            </div>

            {error?.message && (
              <span className='mt-1 w-fit pl-3 text-xs font-medium text-red-500 transition-all'>
                {error.message}
              </span>
            )}
          </div>
        );
      }}
    />
  );
};
