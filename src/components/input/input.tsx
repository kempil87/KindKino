/* eslint-disable jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */
import {ChangeEvent, HTMLProps, useId, useState} from 'react';

import cc from 'classcat';
import {
  Controller,
  FieldPath,
  FieldValues,
  RegisterOptions,
  useFormContext,
} from 'react-hook-form';

import {Icon} from '~/components/icon/icon';

export interface InputProps<Name extends FieldValues>
  extends HTMLProps<HTMLInputElement> {
  name: FieldPath<Name>;
  className?: HTMLDivElement['className'];
  formClassName?: HTMLDivElement['className'];
  handleChange?: (name: string, value: string) => void;
  isPassword?:boolean,
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
  isPassword,
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
      render={({ field: { value, onChange, onBlur } ,fieldState:{error}}) => {
        const onInputChange = (e: ChangeEvent) => {
          onChange(e);
          handleChange?.(name, value);
        };

        const onClear = () => onChange('');

        return (
          <div className={cc([formClassName, 'space-y-2.5'])}>
            {label && (
              <label
                className="w-fit cursor-pointer pl-3 text-sm font-normal"
                htmlFor={id}
              >
                {label}
              </label>
            )}

            <div className='w-full h-full relative group'>
              <input
                {...isPassword && {autoComplete:'new-password'}}
                autoCorrect='off'
                id={id}
                value={value || ''}
                onBlur={onBlur}
                onChange={onInputChange}
                onFocus={e => e.stopPropagation()}
                {...props}
                className={cc([
                  'w-full appearance-none caret-primary rounded hover:border-primary/70 border border-solid border-border placeholder:text-white/60 !bg-transparent px-3 py-2 text-white outline-none transition-all focus:border-primary ',
                  className,
                  {'border-red-500 placeholder:text-red-500 focus:border-red-500 hover:border-red-500': error?.message?.length},
                  {'focus:w-[calc(100%-55px)] group-active:w-[calc(100%-55px)]': isPassword},
                  {'text-transparent': !secureVisible},
                ])}
              />

              {value && !secureVisible && (
                <div className='absolute py-2 px-3 inset-0 pointer-events-none'>
                  {Array.from({length:(value as string).length}).fill('•').join('')}
                </div>
              )}

              {value && !isPassword && (
                <div
                  className={cc([
                    'pos-abs-y size-7 cursor-pointer flex-center border-primary rounded-md border right-2.5 text-white/70 hover:text-white transition-all',
                    {'border-red-500': error}
                  ])}
                  onClick={onClear}
                >
                  <Icon
                    name='close'
                    size={13}
                  />
                </div>
              )}

              {isPassword && (
                <div
                  className='absolute hover:border-primary/60 top-0 opacity-0 group-focus-within:opacity-100 cursor-pointer transition-all invisible group-focus-within:visible box-content group-focus-within:z-10 right-0 size-10 flex-center border-primary border rounded-md'
                  onClick={togglePassword}
                >
                  <Icon name={secureVisible ? 'eye_close' : 'eye'} />
                </div>
              )}
            </div>

            {error?.message && (
              <span className="mt-1 font-medium w-fit pl-3 text-xs text-red-500 transition-all">
                {error.message}
              </span>
            )}
          </div>
        );
      }}
    />
  );
};
