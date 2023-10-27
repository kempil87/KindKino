import { memo } from 'react';
import Image from 'next/image';

import { DEFAULT_CENTER } from '~/components/map/map-view';

type MapMarker = typeof DEFAULT_CENTER;

const _Marker = (props: MapMarker) => (
  <div {...props}>
    <Image
      unoptimized
      alt='map_marker'
      height={157 / 2}
      src='/images/map_marker.png'
      width={126 / 2}
    />
  </div>
);

export const MapMarker = memo(_Marker);
