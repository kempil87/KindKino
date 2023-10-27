import { useEffect, useState } from 'react';

interface Props {
  callback: (top: number) => void;
}
export const useScroll = ({ callback }: Props) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const body = document.body;

    setScrollY(body.scrollTop);
    body.addEventListener('scroll', () => callback(body.scrollTop));
  }, [callback]);

  const toTop = () => {
    document.body.scroll({ behavior: 'smooth', top: 0 });
  };

  return { scrollY, toTop };
};
