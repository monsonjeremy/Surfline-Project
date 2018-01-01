import React from 'react';
import PropTypes from 'prop-types';
import { SearchBox } from 'react-google-maps/lib/components/places/SearchBox';

/**
 * @description CustomSearchBar component represents the view for the SearchBar container which 
 * contains logic for rendering and controlling the search bar on the google map
 * 
 * Documentation for the react-google-maps library available at: https://tomchentw.github.io/react-google-maps/
 * 
 * @param {object} props - Props
 * @param {function} props.handleSearchBoxMounted - Function to dispatch related actions when search box is mounted
 * @param {function} props.handlePlacesChanged - Function to dispatch related actions when a place is selected in the search bar
 * 
 * @returns {<CustomSearchBar />}
 */
const CustomSearchBox = props => (
  <SearchBox
    ref={props.handleSearchBoxMounted}
    controlPosition={google.maps.ControlPosition.TOP_LEFT}
    onPlacesChanged={props.handlePlacesChanged}
  >
    <input
      type="text"
      placeholder="Search for a location"
      style={{
        boxSizing: `border-box`,
        border: `1px solid transparent`,
        width: `240px`,
        height: `32px`,
        marginTop: `27px`,
        marginLeft: `27px`,
        padding: `0px 12px`,
        borderRadius: `3px`,
        boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
        fontSize: `12px`,
        fontFamily: `Montserrat`,
        outline: `none`,
        textOverflow: `ellipses`,
      }}
    />
  </SearchBox>
);

CustomSearchBox.propTypes = {
  // Functions and dispatchers
  handlePlacesChanged: PropTypes.func.isRequired,
  handleSearchBoxMounted: PropTypes.func.isRequired,
};

export default CustomSearchBox;
