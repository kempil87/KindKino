export const MAP_STYLES = [
  {
    elementType: 'geometry',
    featureType: 'administrative.country',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    elementType: 'labels',
    featureType: 'administrative.country',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    elementType: 'geometry',
    featureType: 'administrative.province',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    elementType: 'labels',
    featureType: 'administrative.province',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    elementType: 'labels',
    featureType: 'administrative.locality',
    stylers: [
      {
        visibility: 'on',
      },
    ],
  },
  {
    elementType: 'labels.text.fill',
    featureType: 'administrative.locality',
    stylers: [
      {
        saturation: '100',
      },
      {
        lightness: '-70',
      },
      {
        gamma: '3.16',
      },
      {
        color: '#ffffff',
      },
    ],
  },
  {
    elementType: 'labels.text.stroke',
    featureType: 'administrative.locality',
    stylers: [
      {
        visibility: 'on',
      },
      {
        lightness: '-100',
      },
      {
        gamma: '0.00',
      },
      {
        saturation: '100',
      },
    ],
  },
  {
    elementType: 'labels',
    featureType: 'administrative.neighborhood',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    elementType: 'geometry',
    featureType: 'administrative.land_parcel',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    elementType: 'labels',
    featureType: 'administrative.land_parcel',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    elementType: 'labels',
    featureType: 'landscape',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    elementType: 'geometry',
    featureType: 'landscape.man_made',
    stylers: [
      {
        invert_lightness: true,
      },
      {
        visibility: 'on',
      },
      {
        lightness: '-42',
      },
      {
        saturation: '35',
      },
    ],
  },
  {
    elementType: 'geometry.fill',
    featureType: 'landscape.man_made',
    stylers: [
      {
        hue: '#b4b5b6',
      },
      {
        lightness: '-73',
      },
      {
        gamma: '1.81',
      },
      {
        saturation: '-32',
      },
    ],
  },
  {
    elementType: 'geometry.stroke',
    featureType: 'landscape.man_made',
    stylers: [
      {
        weight: '0.01',
      },
      {
        hue: '#ffd300',
      },
      {
        lightness: '-100',
      },
      {
        gamma: '0.00',
      },
      {
        saturation: '85',
      },
    ],
  },
  {
    elementType: 'geometry',
    featureType: 'landscape.natural',
    stylers: [
      {
        hue: '#9900ff',
      },
      {
        saturation: '9',
      },
      {
        lightness: '-94',
      },
    ],
  },
  {
    elementType: 'labels',
    featureType: 'landscape.natural',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    elementType: 'geometry.fill',
    featureType: 'poi',
    stylers: [
      {
        lightness: '-66',
      },
      {
        visibility: 'off',
      },
    ],
  },
  {
    elementType: 'labels',
    featureType: 'poi',
    stylers: [
      {
        lightness: '-50',
      },
      {
        saturation: '-100',
      },
      {
        color: '#7a7100',
      },
    ],
  },
  {
    elementType: 'labels.text.fill',
    featureType: 'poi',
    stylers: [
      {
        weight: '0.01',
      },
      {
        saturation: '-48',
      },
      {
        lightness: '-58',
      },
      {
        gamma: '2.40',
      },
      {
        color: '#772cf6',
      },
    ],
  },
  {
    elementType: 'labels.text.stroke',
    featureType: 'poi',
    stylers: [
      {
        visibility: 'on',
      },
      {
        color: '#000000',
      },
    ],
  },
  {
    elementType: 'labels.icon',
    featureType: 'poi',
    stylers: [
      {
        visibility: 'simplified',
      },
      {
        saturation: '100',
      },
      {
        hue: '#00bbff',
      },
      {
        lightness: '-13',
      },
      {
        gamma: '0.89',
      },
    ],
  },
  {
    elementType: 'geometry',
    featureType: 'road',
    stylers: [
      {
        hue: '#ad5df5',
      },
      {
        lightness: '-80',
      },
      {
        saturation: '82',
      },
      {
        weight: '0.50',
      },
    ],
  },
  {
    elementType: 'labels',
    featureType: 'road',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    elementType: 'geometry.fill',
    featureType: 'road.highway',
    stylers: [
      {
        color: '#8f22d9',
      },
      {
        weight: '0.90',
      },
    ],
  },
  {
    elementType: 'geometry.fill',
    featureType: 'road.highway.controlled_access',
    stylers: [
      {
        visibility: 'on',
      },
    ],
  },
  {
    elementType: 'geometry.stroke',
    featureType: 'road.arterial',
    stylers: [
      {
        visibility: 'on',
      },
      {
        weight: '0.90',
      },
      {
        gamma: '1.28',
      },
      {
        hue: '#8f22d9',
      },
      {
        saturation: '100',
      },
      {
        lightness: '40',
      },
    ],
  },
  {
    elementType: 'all',
    featureType: 'transit',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    elementType: 'all',
    featureType: 'water',
    stylers: [
      {
        visibility: 'on',
      },
      {
        color: '#000000',
      },
    ],
  },
  {
    elementType: 'labels',
    featureType: 'water',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
];
