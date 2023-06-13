import React, { forwardRef, SVGProps } from 'react';

import cc from 'classcat';

import { ICONS } from '~/shared/constants/icons';

interface Props extends SVGProps<SVGSVGElement> {
  name: IconName;
  size?: number;
}

export const Icon = forwardRef<SVGSVGElement, Props>(
  ({ name, className, size, width = 16, height = 16, ...props }, parentRef) => {
    const { data, viewBox } = ICONS[name];

    return (
      <svg
        viewBox={viewBox || '0 0 512 512'}
        {...props}
        ref={parentRef}
        className={cc(['fill-current', className])}
        height={size || height}
        width={size || width}
      >
        {data}
      </svg>
    );
  }
);

Icon.displayName = 'Icon';

export type IconName =
  | 'arrowLeft'
  | 'close'
  | 'search'
  | 'downAngle'
  | 'done'
  | 'bookmark';
