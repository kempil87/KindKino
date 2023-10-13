import React, {forwardRef, SVGProps} from 'react';

import cc from 'classcat';

import {IconCore, IconName, ICONS} from '~/shared/constants/icons';

interface Props extends SVGProps<SVGSVGElement> {
    name: IconName;
    size?: number;
}

export const Icon = forwardRef<SVGSVGElement, Props>(
  ({name, className, size, width = 16, height = 16, ...props}, parentRef) => {
    const icon = ICONS[name] as IconCore;

    return (
      <svg
        viewBox={icon?.viewBox || '0 0 512 512'}
        {...props}
        ref={parentRef}
        className={cc(['fill-current', className])}
        height={size || height}
        width={size || width}
      >
        {icon.data}
      </svg>
    );
  }
);

Icon.displayName = 'Icon';
