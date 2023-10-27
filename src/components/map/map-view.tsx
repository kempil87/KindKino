import { useRef } from 'react';

import GoogleMapReact from 'google-map-react';

import { MAP_STYLES } from '~/shared/constants/map-styles';

import styles from '../../styles/map-view.module.css';

import { MapMarker } from '~/components/map/elems/map-marker';

export const DEFAULT_CENTER = { lat: 55.752_22, lng: 37.615_56 };

export const MapView = () => {
  const mapRef = useRef(null);

  return (
    <div>
      <div className={styles.mapWrap}>
        <GoogleMapReact
          yesIWantToUseGoogleMapApiInternals
          bootstrapURLKeys={{ key: 'AIzaSyCuZf8_OMB7SGsE0FVGMXhlzaS6RRflegY' }}
          defaultCenter={DEFAULT_CENTER}
          defaultZoom={11}
          options={{
            backgroundColor: '#000',
            gestureHandling: 'cooperative',
            styles: MAP_STYLES,
          }}
          onGoogleApiLoaded={({ map }) => (mapRef.current = map)}
        >
          <MapMarker {...DEFAULT_CENTER} />
        </GoogleMapReact>
      </div>
    </div>
  );
};
