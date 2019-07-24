import React from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { API_KEY } from '../../googlePlaces';
import AddPlace from './AddPlace';
import { withNavigation } from 'react-navigation';

const GooglePlacesInput = props => {
  const { groupName, members } = props;
  console.log(members);
  return (
    <GooglePlacesAutocomplete
      placeholder="Add a new place"
      minLength={2} // minimum length of text to search
      autoFocus={false}
      returnKeyType="search"
      listViewDisplayed="auto"
      fetchDetails={true}
      renderDescription={row => row.description}
      onPress={(data, details = null) => {
        const name = details.name;
        const address = details.formatted_address;
        const priceLevel = details.price_level;
        const starRating = details.rating;
        const website = details.website;
        const phone = details.formatted_phone_number;
        return props.navigation.navigate('AddPlace', {
          members,
          groupName,
          name,
          address,
          priceLevel,
          starRating,
          website,
          phone,
        });
      }}
      getDefaultValue={() => ''}
      query={{
        key: API_KEY,
        language: 'en',
        types: 'establishment',
      }}
      styles={{
        textInputContainer: {
          width: '100%',
        },
        description: {
          fontWeight: 'bold',
        },
        predefinedPlacesDescription: {
          color: '#1faadb',
        },
      }}
      nearbyPlacesAPI="GooglePlacesSearch"
      GooglePlacesSearchQuery={{
        rankby: 'distance',
        type: ['cafe', 'restaurant', 'bar'],
      }}
      GooglePlacesDetailsQuery={{
        fields: ['name', 'formatted_address'],
      }}
      debounce={200}
    />
  );
};

export default withNavigation(GooglePlacesInput);
