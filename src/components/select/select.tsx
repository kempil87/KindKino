import React, { useRef, useState } from 'react';

import cc from 'classcat';
import { Controller, useFormContext } from 'react-hook-form';
import { useOutsideClick } from "rooks";

import { Icon } from "~/components/icon/icon";

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
  notFoundText?: string;
  onChange?: (value: ValueProps, option: SelectOption) => void;
  placeholder?: string;
}

export const Select = ({
  options,
  name,
  onChange,
  placeholder,
  notFoundText = "Ничего не найдено",
}: SelectProps) => {
  const { control, watch, setValue } = useFormContext();
  const ref = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [selectOption, setSelectOption] = useState<SelectOption | null>(null);
  const [isMenuBVisible, setIsMenuVisible] = useState(false);

  const onSelectChange = (option: SelectOption) => {
    onChange?.({ name, value: option.value }, option);
    setSelectOption(option);
    setValue(name, option.value);
    onBlur();
  };

  const onFocus = () => {
    if (isMenuBVisible) {
      onBlur();

      return;
    }
    if (menuRef.current && ref.current) {
      menuRef.current.classList.remove("translate-y-6");
      menuRef.current.classList.remove("opacity-0");
      menuRef.current.classList.remove("invisible");
      ref.current.classList.add("!border-primary");
      setIsMenuVisible(true);
    }
  };

  const onBlur = () => {
    if (menuRef.current && ref.current) {
      menuRef.current.classList.add("translate-y-6");
      menuRef.current.classList.add("opacity-0");
      menuRef.current.classList.add("invisible");
      ref.current.classList.remove("!border-primary");
      setIsMenuVisible(false);
    }
  };

  useOutsideClick(ref, onBlur);

  return (
    <div
      ref={ref}
      className="relative rounded-md border border-border transition-all"
    >
      <Controller
        control={control}
        name={name}
        render={({ field }) => <input hidden {...field} />}
      />
      <div
        className="flex min-h-[40px] cursor-pointer items-center rounded-md bg-dark"
        onClick={onFocus}
      >
        <div
          className={cc([
            'relative px-5 py-1 text-white/60',
            { '!text-white': selectOption?.value },
          ])}
        >
          {selectOption?.label || placeholder || ''}
        </div>

        <Icon
          name="downAngle"
          size={24}
          className={cc([
            'absolute right-3 -rotate-180 text-white/60 transition-all',
            { '!rotate-0': isMenuBVisible },
          ])}
        />
      </div>
      <div
        ref={menuRef}
        className="invisible absolute top-[120%] z-40 max-h-80 w-full translate-y-6 space-y-2 overflow-y-auto rounded-md border border-border bg-dark px-3 py-2 opacity-0 transition-all"
      >
        {options?.length ? (
          options.map((option, index) => (
            <div
              key={option.value}
              className={cc([
                "itemc-center relative  flex w-full cursor-pointer justify-between rounded-md px-3 py-1 text-sm text-white/60 transition-all hover:text-white",
                { "!text-white": option.value === selectOption?.value },
              ])}
              onClick={() => onSelectChange(option)}
            >
              {option.label}

              {selectOption?.value === option.value && <Icon name="done" />}
            </div>
          ))
        ) : (
          <span className="text-sm opacity-75">{notFoundText}</span>
        )}
      </div>
    </div>
  );
};
