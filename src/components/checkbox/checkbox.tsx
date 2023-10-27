import { ChangeEvent, HTMLProps, useId } from 'react';

import cc from 'classcat';
import {
  Controller,
  FieldPath,
  FieldValues,
  RegisterOptions,
  useFormContext,
} from 'react-hook-form';

import styles from '../../styles/checkbox.module.css';

export interface CheckboxProps<Name extends FieldValues>
  extends HTMLProps<HTMLInputElement> {
  name: FieldPath<Name>;
  changeCheckbox?: (name: string, value: boolean) => void;
  className?: HTMLDivElement['className'];
  formClassName?: HTMLDivElement['className'];
  label?: string;
  rules?: RegisterOptions;
}
export const Checkbox = <Name extends FieldValues>({
  name,
  className,
  rules,
  formClassName,
  changeCheckbox,
  label,
  ...props
}: CheckboxProps<Name>) => {
  const id = useId();
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { error },
      }) => {
        const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
          const checked = e.target.checked;

          onChange(checked);
          changeCheckbox?.(name, checked);
        };

        return (
          <div className={cc([formClassName])}>
            <label
              className='flex w-fit cursor-pointer select-none items-center text-sm font-normal'
              htmlFor={id}
            >
              <input
                checked={!!value}
                id={id}
                type='checkbox'
                value={value}
                onBlur={onBlur}
                onChange={onInputChange}
                {...props}
                className={cc([
                  styles.checkbox,
                  className,
                  { 'border-red-500': error?.message?.length },
                  { 'mr-3': label },
                ])}
              />
              {label}
            </label>

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
