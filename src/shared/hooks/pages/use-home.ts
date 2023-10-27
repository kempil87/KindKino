import { useEffect, useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { type KeenSliderInstance } from 'keen-slider';
import { useKeenSlider } from 'keen-slider/react';

import { fetchFilms } from '~/shared/api/films/films';

export const useHome = () => {
  const premieresFilms = useQuery({
    queryFn: () => fetchFilms.premieres(),
    queryKey: ['top-list'],
  });

  const [activeSlide, setActiveSlide] = useState(0);

  const slideChanged = (slider: KeenSliderInstance) => {
    const index = slider.track.details.rel;

    setActiveSlide(index);
  };
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    slideChanged,
    slides: {
      origin: 'center',
      perView: 2,
      spacing: 20,
    },
  });

  const onPrev = () => {
    instanceRef.current?.prev();
  };

  const onNext = () => {
    instanceRef.current?.next();
  };

  useEffect(() => {
    instanceRef.current?.update();
  }, [instanceRef, premieresFilms.isLoading]);

  return {
    activeSlide,
    instanceRef,
    onNext,
    onPrev,
    premieresFilms,
    sliderRef,
  };
};
