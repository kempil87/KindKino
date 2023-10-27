import { ChangeEvent, createRef, RefObject, useRef } from 'react';

import cc from 'classcat';
import { Controller, FieldValues, useFormContext } from 'react-hook-form';

import { InputProps } from '~/components/input/input';

interface OtpInputProps<Name extends FieldValues> extends InputProps<Name> {
  length?: number;
  onReachEnd?: (values: string) => void;
}

export const OtpInput = <Name extends FieldValues>({
  name,
  className,
  rules,
  formClassName,
  onReachEnd,
  handleChange,
  length = 4,
  ...props
}: OtpInputProps<Name>) => {
  const { control } = useFormContext();

  const inputsArray = Array.from({ length });

  const refsArray: RefObject<HTMLInputElement>[] = inputsArray.flatMap(() => [
    createRef(),
  ]);

  const inputRefs = useRef<RefObject<HTMLInputElement>[]>(refsArray);

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { value, onChange }, fieldState: { error } }) => {
        const onInputChange = (
          e: ChangeEvent<HTMLInputElement>,
          key: number,
        ) => {
          const nextInput = inputRefs.current[key + 1]?.current;

          const newValues: Record<number, string> = { ...value };

          newValues[key] = e.target.value;

          onChange(newValues);

          const stringValue = Object.values(newValues).join('');

          handleChange?.(name, stringValue);

          if (Number(stringValue.length) === length) {
            onReachEnd?.(stringValue);
          }

          nextInput && nextInput.focus();
        };

        const onFocus = (key: number) => {
          const prevInput = inputRefs.current[key - 1]?.current;

          if (!prevInput?.value) {
            prevInput?.focus();
          }
        };

        return (
          <div className={cc([formClassName, 'space-y-2.5'])}>
            <div className='group relative h-full w-full space-x-2.5 flex-center'>
              {inputsArray.map((_, key) => (
                <input
                  key={key}
                  ref={inputRefs.current[key]}
                  autoComplete='one-time-code'
                  inputMode={props.inputMode || 'numeric'}
                  maxLength={1}
                  {...(value && { value: value[key] || '' })}
                  type='number'
                  onChange={(e) => onInputChange(e, key)}
                  onFocus={() => onFocus(key)}
                  {...props}
                  className={cc([
                    'appearance-none rounded border border-solid border-border !bg-transparent py-2 text-center text-white caret-primary outline-none transition-all size-11 placeholder:text-white/60 hover:border-primary/70 focus:border-primary ',
                    className,
                    {
                      'border-red-500 placeholder:text-red-500 hover:border-red-500 focus:border-red-500':
                        error?.message?.length,
                    },
                    { 'border-primary': value && value[key] },
                  ])}
                />
              ))}
            </div>

            {error?.message && (
              <div className='mt-1 w-full pl-3 text-center text-xs font-medium text-red-500 transition-all'>
                {error.message}
              </div>
            )}
          </div>
        );
      }}
    />
  );
};
