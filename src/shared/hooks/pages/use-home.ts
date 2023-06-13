import { useQuery } from '@tanstack/react-query';
import { useKeenSlider } from "keen-slider/react";

import { fetchFilms } from '~/shared/api/films/films';

export const useHome = () => {
  const filmsQuery = useQuery({
    queryFn: () => fetchFilms.top(),
    queryKey: ['top-list'],
  });

  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
  });

  const onPrev = () => {
    instanceRef.current?.prev();
  };

  const onNext = () => {
    instanceRef.current?.next();
  };

  return { filmsQuery, instanceRef, onNext, onPrev, sliderRef };
};
