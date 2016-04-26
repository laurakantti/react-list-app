import React, { Component } from 'react';

/**
 * React component CountryDetail
 */
export default class CountryDetail extends Component {
  /** Render method for CountryDetail */
  render() {
    const { country } = this.props;
    /** Get data that comes in as arrays and map them */
    let timezones, languages, currencies,
        altSpellings, latlng;
    (country.timezones)
      ? timezones = country.timezones.map((value, key) =>
          <span className='array-list' key={key}>{value}</span>
        )
      : timezones = <span>-</span>;
    (country.languages)
      ? languages = country.languages.map((value, key) =>
          <span className='array-list' key={key}>{value}</span>
        )
      : languages = <span>-</span>;
    (country.currencies)
      ? currencies = country.currencies.map((value, key) =>
          <span className='array-list' key={key}>{value}</span>
        )
      : currencies = <span>-</span>;
    (country.altSpellings)
      ? altSpellings = country.altSpellings.map((value, key) =>
          <span className='array-list' key={key}>{value}</span>
        )
      : altSpellings = <span>-</span>;
    (country.latlng)
      ? latlng = country.latlng.map((value, key) =>
          <span className='array-list' key={key}>{value}</span>
        )
      : latlng = <span>-</span>;

    return (
      <div className={this.props.onDetailVisibility()}>
        <button
          type='button'
          className='close pull-right'
          onClick={this.props.onDetailViewClose}>
          <span aria-hidden='true'>&times;</span>
        </button>
        <h3 className='text-center'>{country.name}</h3>
        <ul>
          <li><strong>Capital:</strong> {country.capital}</li>
          <li><strong>Native name:</strong> {country.nativeName}</li>
          <li><strong>Region:</strong> {country.region}</li>
          <li><strong>Subregion:</strong> {country.subregion}</li>
          <li><strong>Demonym:</strong> {country.demonym}</li>
          <li><strong>Lat/Long:</strong> {latlng}</li>
          <li><strong>Population:</strong> {country.population}</li>
          <li><strong>Timezones:</strong> {timezones}</li>
          <li><strong>Languages:</strong> {languages}</li>
          <li><strong>Currencies:</strong> {currencies}</li>
          <li><strong>Alternative spellings:</strong> {altSpellings}</li>
        </ul>
      </div>
    )
  }
}

/**
 * PropTypes
 */
CountryDetail.propTypes = {
  country: React.PropTypes.object.isRequired
}
