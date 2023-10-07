import { ChangeEvent, HTMLProps, useId } from 'react';

import cc from 'classcat';
import {
  Controller,
  FieldPath,
  FieldValues,
  RegisterOptions,
  useFormContext,
} from 'react-hook-form';

interface InputProps<Name extends FieldValues>
  extends HTMLProps<HTMLInputElement> {
  name: FieldPath<Name>;
  className?: HTMLDivElement['className'];
  formClassName?: HTMLDivElement['className'];
  handleChange?: (name: string, value: string) => void;
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
  ...props
}: InputProps<Name>) => {
  const id = useId();
  const { control, formState } = useFormContext();
  const error = formState.errors[name]?.message as string;

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { value, onChange, onBlur } }) => {
        const onInputChange = (e: ChangeEvent) => {
          onChange(e);
          handleChange?.(name, value);
        };

        return (
          <div className={cc([formClassName, 'space-y-1.5'])}>
            {label && (
              <label
                className="w-fit cursor-pointer pl-3 text-sm font-normal"
                htmlFor={id}
              >
                {label}
              </label>
            )}

            <input
              autoComplete="current-password"
              id={id}
              value={value || ''}
              onBlur={onBlur}
              onChange={onInputChange}
              {...props}
              type={props.type || 'text'}
              className={cc([
                'w-full appearance-none rounded border border-solid border-border !bg-transparent px-3 py-2 text-white outline-none transition-all focus:border-primary ',
                className,
                {'border-red-500 placeholder:text-red-500 focus:border-red-500': error?.length},
              ])}
            />

            {error && (
              <span className="mt-1 font-medium w-fit pl-3 text-sm text-red-500 transition-all">
                {error}
              </span>
            )}
          </div>
        );
      }}
    />
  );
};
