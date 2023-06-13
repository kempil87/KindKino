import React, { ChangeEvent, useEffect, useRef } from 'react';

import { useStore } from 'effector-react';
import { useForm } from "react-hook-form";

import style from '../../styles/search-drawer.module.css';

import { $search } from '~/shared/store/search';

export const SearchDrawer = () => {
  const { register } = useForm();
  const ref = useRef<HTMLDivElement>(null);
  const searchVisible = useStore($search);

  useEffect(() => {
    if (ref.current) {
      if (searchVisible) {
        ref.current.classList.remove("-translate-y-full");
      } else {
        ref.current.classList.add("-translate-y-full");
      }
    }
  }, [searchVisible]);

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e);
  };

  return (
    <div ref={ref} className={style.searchWrapper}>
      <div className="flex w-full items-center justify-center gap-6">
        <p>поиск</p>

        <input
          maxLength={50}
          onChange={onInputChange}
          {...register('keyword')}
          placeholder="Фильмы, сериалы, актеры"
        />
      </div>
    </div>
  );
};
