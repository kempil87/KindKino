import { useRef } from 'react';

import { Logo } from '~/components/logo/logo';

// let timer: NodeJS.Timeout;

export const AppLoader = () => {
  const loadingRef = useRef<HTMLDivElement>(null);

  // const handler = () => {
  //   timer = setTimeout(() => loadingRef.current?.classList.add('!hidden'), 500);
  // };

  // useEffect(() => {
  //   if (document.readyState === 'complete') {
  //     handler();
  //   } else {
  //     window.addEventListener('load', handler);
  //
  //     return () => {
  //       window.removeEventListener('load', handler);
  //       clearTimeout(timer);
  //     };
  //   }
  // }, []);

  return (
    <div
      ref={loadingRef}
      // className="fixed inset-0 z-[1000] flex flex-col items-center justify-center gap-3 bg-black text-center"
    >
      <Logo />
      <p className="text-xl">Загрузка...</p>
    </div>
  );
};
