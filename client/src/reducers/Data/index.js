import {
  BUOY_DATA_FAILURE,
  BUOY_DATA_REQUEST,
  BUOY_DATA_SUCCESS,
  SHOW_ALL_BUOYS,
  SHOW_FAV_BUOYS
} from './actions';

const dummyData = {
  data: {
    lastUpdated: 'Fri, 29 Dec 2017 02:13:31 +0000',
    buoys: [
      {
        title: ' LONG ISLAND  -  30 NM SOUTH OF ISLIP, NY',
        lastUpdated: 'Fri, 29 Dec 2017 02:13:31 +0000',
        buoyId: '44025',
        readings:
          '<strong>December 28, 2017 7:50 pm EST</strong><br /><strong>Location:</strong> 40.251N 73.164W or 17 nautical miles NNW of search location of 40N 73W.<br /><strong>Wind Direction:</strong> NW (310&#176;)<br /><strong>Wind Speed:</strong> 21 knots<br /><strong>Wind Gust:</strong> 27 knots<br /><strong>Significant Wave Height:</strong> 5 ft<br /><strong>Dominant Wave Period:</strong> 5 sec<br /><strong>Average Period:</strong> 4.4 sec<br /><strong>Mean Wave Direction:</strong> WNW (298&#176;)<br /><strong>Atmospheric Pressure:</strong> 30.46 in (1031.5 mb)<br /><strong>Pressure Tendency:</strong> +0.00 in (+0.0 mb)<br /><strong>Air Temperature:</strong> 21&#176;F (-6.1&#176;C)<br /><strong>Water Temperature:</strong> 48&#176;F (8.7&#176;C)<br />\n      ',
        link: 'http://www.ndbc.noaa.gov/station_page.php?station=44025',
        lat: '40.251',
        long: '-73.164',
      },
      {
        title: ' TEXAS TOWER #4  -  75 NM EAST OF LONG BEACH, NJ',
        lastUpdated: 'Fri, 29 Dec 2017 02:13:30 +0000',
        buoyId: '44066',
        readings:
          '<strong>December 28, 2017 7:50 pm EST</strong><br /><strong>Location:</strong> 39.568N 72.586W or 32 nautical miles SE of search location of 40N 73W.<br /><strong>Wind Direction:</strong> NW (310&#176;)<br /><strong>Wind Speed:</strong> 23 knots<br /><strong>Wind Gust:</strong> 33 knots<br /><strong>Significant Wave Height:</strong> 7 ft<br /><strong>Dominant Wave Period:</strong> 6 sec<br /><strong>Average Period:</strong> 5.2 sec<br /><strong>Mean Wave Direction:</strong> NW (310&#176;)<br /><strong>Atmospheric Pressure:</strong> 30.42 in (1030.1 mb)<br /><strong>Pressure Tendency:</strong> +0.00 in (+0.0 mb)<br /><strong>Air Temperature:</strong> 27&#176;F (-3.0&#176;C)<br /><strong>Dew Point:</strong> 19&#176;F (-7.3&#176;C)<br /><strong>Water Temperature:</strong> 53&#176;F (11.8&#176;C)<br />\n      ',
        link: 'http://www.ndbc.noaa.gov/station_page.php?station=44066',
        lat: '39.568',
        long: '-72.586',
      },
      {
        title: ' BARNEGAT, NJ (209)',
        lastUpdated: 'Fri, 29 Dec 2017 02:13:29 +0000',
        buoyId: '44091',
        readings:
          '<strong>December 28, 2017 8:30 pm EST</strong><br /><strong>Location:</strong> 39.778N 73.769W or 38 nautical miles WSW of search location of 40N 73W.<br /><strong>Significant Wave Height:</strong> 5 ft<br /><strong>Dominant Wave Period:</strong> 5 sec<br /><strong>Average Period:</strong> 4.1 sec<br /><strong>Mean Wave Direction:</strong> N (354&#176;)<br /><strong>Water Temperature:</strong> 46&#176;F (7.9&#176;C)<br />\n      ',
        link: 'http://www.ndbc.noaa.gov/station_page.php?station=44091',
        lat: '39.778',
        long: '-73.769',
      },
      {
        title: ' NEW YORK HARBOR ENTRANCE  -  15 NM SE OF BREEZY POINT , NY',
        lastUpdated: 'Fri, 29 Dec 2017 02:13:28 +0000',
        buoyId: '44065',
        readings:
          '<strong>December 28, 2017 7:50 pm EST</strong><br /><strong>Location:</strong> 40.369N 73.703W or 39 nautical miles NW of search location of 40N 73W.<br /><strong>Wind Direction:</strong> NW (320&#176;)<br /><strong>Wind Speed:</strong> 23 knots<br /><strong>Wind Gust:</strong> 29 knots<br /><strong>Significant Wave Height:</strong> 3 ft<br /><strong>Dominant Wave Period:</strong> 4 sec<br /><strong>Average Period:</strong> 3.7 sec<br /><strong>Mean Wave Direction:</strong> NW (309&#176;)<br /><strong>Atmospheric Pressure:</strong> 30.47 in (1031.8 mb)<br /><strong>Pressure Tendency:</strong> +0.00 in (+0.0 mb)<br /><strong>Air Temperature:</strong> 20&#176;F (-6.4&#176;C)<br /><strong>Dew Point:</strong> 7&#176;F (-14.0&#176;C)<br /><strong>Water Temperature:</strong> 49&#176;F (9.2&#176;C)<br />\n      ',
        link: 'http://www.ndbc.noaa.gov/station_page.php?station=44065',
        lat: '40.369',
        long: '-73.703',
      },
      {
        title: ' 8531680  -  SANDY HOOK, NJ',
        lastUpdated: 'Fri, 29 Dec 2017 02:13:27 +0000',
        buoyId: 'SDHN4',
        readings:
          '<strong>December 28, 2017 8:30 pm EST</strong><br /><strong>Location:</strong> 40.467N 74.009W or 54 nautical miles WNW of search location of 40N 73W.<br /><strong>Wind Direction:</strong> NNW (330&#176;)<br /><strong>Wind Speed:</strong> 16 knots<br /><strong>Wind Gust:</strong> 25 knots<br /><strong>Atmospheric Pressure:</strong> 30.52 in (1033.4 mb)<br /><strong>Air Temperature:</strong> 16&#176;F (-9.0&#176;C)<br /><strong>Water Temperature:</strong> 35&#176;F (1.4&#176;C)<br />\n      ',
        link: 'http://www.ndbc.noaa.gov/station_page.php?station=sdhn4',
        lat: '40.467',
        long: '-74.009',
      },
      {
        title: ' 8516945  -  KINGS POINT, NY',
        lastUpdated: 'Fri, 29 Dec 2017 02:13:26 +0000',
        buoyId: 'KPTN6',
        readings:
          '<strong>December 28, 2017 8:30 pm EST</strong><br /><strong>Location:</strong> 40.811N 73.765W or 60 nautical miles NW of search location of 40N 73W.<br /><strong>Wind Direction:</strong> N (360&#176;)<br /><strong>Wind Speed:</strong> 19 knots<br /><strong>Wind Gust:</strong> 24 knots<br /><strong>Atmospheric Pressure:</strong> 30.51 in (1033.2 mb)<br /><strong>Air Temperature:</strong> 15&#176;F (-9.7&#176;C)<br /><strong>Water Temperature:</strong> 35&#176;F (1.8&#176;C)<br />\n      ',
        link: 'http://www.ndbc.noaa.gov/station_page.php?station=kptn6',
        lat: '40.811',
        long: '-73.765',
      },
      {
        title: ' WESTERN LONG ISLAND SOUND',
        lastUpdated: 'Fri, 29 Dec 2017 02:13:25 +0000',
        buoyId: '44040',
        readings:
          '<strong>December 28, 2017 8:19 pm EST</strong><br /><strong>Location:</strong> 40.956N 73.58W or 63 nautical miles NNW of search location of 40N 73W.<br /><strong>Wind Direction:</strong> WNW (300&#176;)<br /><strong>Wind Speed:</strong> 17 knots<br /><strong>Wind Gust:</strong> 25 knots<br /><strong>Significant Wave Height:</strong> 2 ft<br /><strong>Dominant Wave Period:</strong> 3 sec<br /><strong>Air Temperature:</strong> 16&#176;F (-9.1&#176;C)<br /><strong>Dew Point:</strong> 4&#176;F (-15.4&#176;C)<br />\n      ',
        link: 'http://www.ndbc.noaa.gov/station_page.php?station=44040',
        lat: '40.956',
        long: '-73.580',
      },
      {
        title: ' 8518750  -  THE BATTERY, NY',
        lastUpdated: 'Fri, 29 Dec 2017 02:13:24 +0000',
        buoyId: 'BATN6',
        readings:
          '<strong>December 28, 2017 8:30 pm EST</strong><br /><strong>Location:</strong> 40.701N 74.014W or 63 nautical miles NW of search location of 40N 73W.<br /><strong>Atmospheric Pressure:</strong> 30.50 in (1033.0 mb)<br /><strong>Air Temperature:</strong> 14&#176;F (-9.9&#176;C)<br /><strong>Water Temperature:</strong> 41&#176;F (4.9&#176;C)<br />\n      ',
        link: 'http://www.ndbc.noaa.gov/station_page.php?station=batn6',
        lat: '40.701',
        long: '-74.014',
      },
      {
        title: ' 8530973  -  ROBBINS REEF, NJ',
        lastUpdated: 'Fri, 29 Dec 2017 02:13:23 +0000',
        buoyId: 'ROBN4',
        readings:
          '<strong>December 28, 2017 8:30 pm EST</strong><br /><strong>Location:</strong> 40.657N 74.065W or 63 nautical miles NW of search location of 40N 73W.<br /><strong>Wind Direction:</strong> NW (310&#176;)<br /><strong>Wind Speed:</strong> 13 knots<br /><strong>Wind Gust:</strong> 21 knots<br /><strong>Atmospheric Pressure:</strong> 30.51 in (1033.2 mb)<br /><strong>Air Temperature:</strong> 15&#176;F (-9.3&#176;C)<br />\n      ',
        link: 'http://www.ndbc.noaa.gov/station_page.php?station=robn4',
        lat: '40.657',
        long: '-74.065',
      },
      {
        title: ' 8519483  -  BERGEN POINT WEST REACH, NY',
        lastUpdated: 'Fri, 29 Dec 2017 02:13:22 +0000',
        buoyId: 'BGNN4',
        readings:
          '<strong>December 28, 2017 8:30 pm EST</strong><br /><strong>Location:</strong> 40.639N 74.146W or 65 nautical miles NW of search location of 40N 73W.<br /><strong>Atmospheric Pressure:</strong> 30.49 in (1032.6 mb)<br /><strong>Air Temperature:</strong> 16&#176;F (-8.8&#176;C)<br /><strong>Water Temperature:</strong> 37&#176;F (2.6&#176;C)<br />\n      ',
        link: 'http://www.ndbc.noaa.gov/station_page.php?station=bgnn4',
        lat: '40.639',
        long: '-74.146',
      },
      {
        title: ' 8519532  -  MARINERS HARBOR, NY',
        lastUpdated: 'Fri, 29 Dec 2017 02:13:21 +0000',
        buoyId: 'MHRN6',
        readings:
          '<strong>December 28, 2017 8:30 pm EST</strong><br /><strong>Location:</strong> 40.641N 74.162W or 66 nautical miles NW of search location of 40N 73W.<br /><strong>Wind Direction:</strong> NW (310&#176;)<br /><strong>Wind Speed:</strong> 18 knots<br /><strong>Wind Gust:</strong> 19 knots<br />\n      ',
        link: 'http://www.ndbc.noaa.gov/station_page.php?station=mhrn6',
        lat: '40.641',
        long: '-74.162',
      },
      {
        title: ' CENTRAL LONG ISLAND SOUND',
        lastUpdated: 'Fri, 29 Dec 2017 02:13:20 +0000',
        buoyId: '44039',
        readings:
          '<strong>December 28, 2017 8:30 pm EST</strong><br /><strong>Location:</strong> 41.138N 72.655W or 70 nautical miles NNE of search location of 40N 73W.<br /><strong>Wind Direction:</strong> WNW (300&#176;)<br /><strong>Wind Speed:</strong> 21 knots<br /><strong>Wind Gust:</strong> 29 knots<br /><strong>Significant Wave Height:</strong> 4 ft<br /><strong>Air Temperature:</strong> 17&#176;F (-8.6&#176;C)<br />\n      ',
        link: 'http://www.ndbc.noaa.gov/station_page.php?station=44039',
        lat: '41.138',
        long: '-72.655',
      },
      {
        title: ' 8467150  -  BRIDGEPORT, CT',
        lastUpdated: 'Fri, 29 Dec 2017 02:13:19 +0000',
        buoyId: 'BRHC3',
        readings:
          '<strong>December 28, 2017 8:30 pm EST</strong><br /><strong>Location:</strong> 41.174N 73.181W or 71 nautical miles N of search location of 40N 73W.<br /><strong>Wind Direction:</strong> NW (310&#176;)<br /><strong>Wind Speed:</strong> 5 knots<br /><strong>Wind Gust:</strong> 9 knots<br /><strong>Atmospheric Pressure:</strong> 30.44 in (1030.8 mb)<br /><strong>Air Temperature:</strong> 13&#176;F (-10.8&#176;C)<br /><strong>Water Temperature:</strong> 40&#176;F (4.5&#176;C)<br />\n      ',
        link: 'http://www.ndbc.noaa.gov/station_page.php?station=brhc3',
        lat: '41.174',
        long: '-73.181',
      },
      {
        title: ' NACOTE CREEK, JACQUES COUSTEAU RESERVE, NJ',
        lastUpdated: 'Fri, 29 Dec 2017 02:13:18 +0000',
        buoyId: 'JCRN4',
        readings:
          '<strong>December 28, 2017 8:30 pm EST</strong><br /><strong>Location:</strong> 39.535N 74.464W or 73 nautical miles WSW of search location of 40N 73W.<br /><strong>Wind Direction:</strong> SW (230&#176;)<br /><strong>Wind Speed:</strong> 2 knots<br /><strong>Atmospheric Pressure:</strong> 30.47 in (1032.0 mb)<br /><strong>Air Temperature:</strong> 13&#176;F (-10.4&#176;C)<br /><strong>Dew Point:</strong> -1&#176;F (-18.4&#176;C)<br />\n      ',
        link: 'http://www.ndbc.noaa.gov/station_page.php?station=jcrn4',
        lat: '39.535',
        long: '-74.464',
      },
      {
        title: ' 8534720  -  ATLANTIC CITY, NJ',
        lastUpdated: 'Fri, 29 Dec 2017 02:13:17 +0000',
        buoyId: 'ACYN4',
        readings:
          '<strong>December 28, 2017 8:30 pm EST</strong><br /><strong>Location:</strong> 39.357N 74.418W or 76 nautical miles WSW of search location of 40N 73W.<br /><strong>Atmospheric Pressure:</strong> 30.52 in (1033.4 mb)<br /><strong>Air Temperature:</strong> 17&#176;F (-8.1&#176;C)<br /><strong>Water Temperature:</strong> 37&#176;F (2.7&#176;C)<br />\n      ',
        link: 'http://www.ndbc.noaa.gov/station_page.php?station=acyn4',
        lat: '39.357',
        long: '-74.418',
      },
      {
        title: ' 8465705  -  NEW HAVEN, CT',
        lastUpdated: 'Fri, 29 Dec 2017 02:13:16 +0000',
        buoyId: 'NWHC3',
        readings:
          '<strong>December 28, 2017 8:30 pm EST</strong><br /><strong>Location:</strong> 41.283N 72.908W or 77 nautical miles N of search location of 40N 73W.<br /><strong>Wind Direction:</strong> N (350&#176;)<br /><strong>Wind Speed:</strong> 12 knots<br /><strong>Wind Gust:</strong> 15 knots<br /><strong>Atmospheric Pressure:</strong> 30.45 in (1031.1 mb)<br /><strong>Air Temperature:</strong> 12&#176;F (-11.2&#176;C)<br /><strong>Water Temperature:</strong> 39&#176;F (3.8&#176;C)<br />\n      ',
        link: 'http://www.ndbc.noaa.gov/station_page.php?station=nwhc3',
        lat: '41.283',
        long: '-72.908',
      },
      {
        title: ' 8510560  -  MONTAUK, NY',
        lastUpdated: 'Fri, 29 Dec 2017 02:13:15 +0000',
        buoyId: 'MTKN6',
        readings:
          '<strong>December 28, 2017 8:30 pm EST</strong><br /><strong>Location:</strong> 41.048N 71.959W or 79 nautical miles NE of search location of 40N 73W.<br /><strong>Atmospheric Pressure:</strong> 30.40 in (1029.3 mb)<br /><strong>Air Temperature:</strong> 16&#176;F (-8.9&#176;C)<br /><strong>Water Temperature:</strong> 37&#176;F (2.6&#176;C)<br />\n      ',
        link: 'http://www.ndbc.noaa.gov/station_page.php?station=mtkn6',
        lat: '41.048',
        long: '-71.959',
      },
      {
        title: ' 8548989  -  NEWBOLD, PA',
        lastUpdated: 'Fri, 29 Dec 2017 02:13:14 +0000',
        buoyId: 'NBLP1',
        readings:
          '<strong>December 28, 2017 8:30 pm EST</strong><br /><strong>Location:</strong> 40.137N 74.752W or 81 nautical miles W of search location of 40N 73W.<br /><strong>Wind Direction:</strong> N (350&#176;)<br /><strong>Wind Speed:</strong> 4 knots<br /><strong>Wind Gust:</strong> 6 knots<br /><strong>Atmospheric Pressure:</strong> 30.51 in (1033.3 mb)<br /><strong>Air Temperature:</strong> 16&#176;F (-8.8&#176;C)<br /><strong>Water Temperature:</strong> 33&#176;F (0.5&#176;C)<br />\n      ',
        link: 'http://www.ndbc.noaa.gov/station_page.php?station=nblp1',
        lat: '40.137',
        long: '-74.752',
      },
      {
        title: ' 8539094  -  BURLINGTON, DELAWARE RIVER, NJ',
        lastUpdated: 'Fri, 29 Dec 2017 02:13:13 +0000',
        buoyId: 'BDRN4',
        readings:
          '<strong>December 28, 2017 8:36 pm EST</strong><br /><strong>Location:</strong> 40.082N 74.87W or 86 nautical miles W of search location of 40N 73W.<br /><strong>Wind Direction:</strong> N (360&#176;)<br /><strong>Wind Speed:</strong> 1 knots<br /><strong>Wind Gust:</strong> 4 knots<br /><strong>Atmospheric Pressure:</strong> 30.50 in (1032.9 mb)<br /><strong>Air Temperature:</strong> 16&#176;F (-8.7&#176;C)<br /><strong>Water Temperature:</strong> 36&#176;F (2.4&#176;C)<br />\n      ',
        link: 'http://www.ndbc.noaa.gov/station_page.php?station=bdrn4',
        lat: '40.082',
        long: '-74.870',
      },
      {
        title: ' NEW LONDON LEDGE LIGHT, NEW LONDON HARBOR, CT',
        lastUpdated: 'Fri, 29 Dec 2017 02:13:12 +0000',
        buoyId: 'LDLC3',
        readings:
          '<strong>December 28, 2017 6:45 pm EST</strong><br /><strong>Location:</strong> 41.306N 72.077W or 89 nautical miles NNE of search location of 40N 73W.<br /><strong>Wind Direction:</strong> NW (320&#176;)<br /><strong>Wind Speed:</strong> 21 knots<br /><strong>Wind Gust:</strong> 28 knots<br /><strong>Atmospheric Pressure:</strong> 30.37 in (1028.6 mb)<br /><strong>Air Temperature:</strong> 13&#176;F (-10.7&#176;C)<br /><strong>Dew Point:</strong> -4&#176;F (-20.2&#176;C)<br />\n      ',
        link: 'http://www.ndbc.noaa.gov/station_page.php?station=ldlc3',
        lat: '41.306',
        long: '-72.077',
      },
      {
        title: ' 8461490  -  NEW LONDON, CT',
        lastUpdated: 'Fri, 29 Dec 2017 02:13:11 +0000',
        buoyId: 'NLNC3',
        readings:
          '<strong>December 28, 2017 8:30 pm EST</strong><br /><strong>Location:</strong> 41.361N 72.09W or 92 nautical miles NNE of search location of 40N 73W.<br /><strong>Wind Direction:</strong> NNW (330&#176;)<br /><strong>Wind Speed:</strong> 6 knots<br /><strong>Wind Gust:</strong> 10 knots<br /><strong>Atmospheric Pressure:</strong> 30.41 in (1029.8 mb)<br /><strong>Air Temperature:</strong> 10&#176;F (-12.3&#176;C)<br /><strong>Water Temperature:</strong> 41&#176;F (5.0&#176;C)<br />\n      ',
        link: 'http://www.ndbc.noaa.gov/station_page.php?station=nlnc3',
        lat: '41.361',
        long: '-72.090',
      },
      {
        title: ' 8546252  -  BRIDESBURG, PA',
        lastUpdated: 'Fri, 29 Dec 2017 02:13:10 +0000',
        buoyId: 'BDSP1',
        readings:
          '<strong>December 28, 2017 8:30 pm EST</strong><br /><strong>Location:</strong> 39.98N 75.079W or 96 nautical miles W of search location of 40N 73W.<br /><strong>Atmospheric Pressure:</strong> 30.51 in (1033.3 mb)<br /><strong>Air Temperature:</strong> 18&#176;F (-7.7&#176;C)<br /><strong>Water Temperature:</strong> 38&#176;F (3.6&#176;C)<br />\n      ',
        link: 'http://www.ndbc.noaa.gov/station_page.php?station=bdsp1',
        lat: '39.980',
        long: '-75.079',
      },
      {
        title: ' 8545240  -  PHILADELPHIA, PA',
        lastUpdated: 'Fri, 29 Dec 2017 02:13:09 +0000',
        buoyId: 'PHBP1',
        readings:
          '<strong>December 28, 2017 8:30 pm EST</strong><br /><strong>Location:</strong> 39.933N 75.142W or 99 nautical miles W of search location of 40N 73W.<br /><strong>Atmospheric Pressure:</strong> 30.50 in (1033.0 mb)<br /><strong>Air Temperature:</strong> 19&#176;F (-7.4&#176;C)<br /><strong>Water Temperature:</strong> 37&#176;F (2.7&#176;C)<br />\n      ',
        link: 'http://www.ndbc.noaa.gov/station_page.php?station=phbp1',
        lat: '39.933',
        long: '-75.142',
      }
    ],
  },
  isLoading: false,
  isRequested: false,
};

const Data = (
  state = {
    filterFavorites: false,
    buoy: dummyData,
  },
  action
) => {
  switch (action.type) {
    case BUOY_DATA_REQUEST:
      return {
        ...state,
        buoy: {
          ...state.buoy,
          isLoading: true,
          isRequested: true,
        },
      };
    case BUOY_DATA_SUCCESS:
      return {
        ...state,
        buoy: {
          ...state.buoy,
          isLoading: false,
          isRequested: false,
          data: action.data,
        },
      };
    case BUOY_DATA_FAILURE:
      return {
        ...state,
        buoy: {
          ...state.buoy,
          isLoading: false,
          isRequested: false,
          data: null,
          error: action.errMsg,
        },
      };
    case SHOW_ALL_BUOYS:
      return {
        ...state,
        filterFavorites: false,
      };
    case SHOW_FAV_BUOYS:
      return {
        ...state,
        filterFavorites: true,
      };
    default:
      return state;
  }
};

export default Data;
