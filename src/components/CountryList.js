import React, { Component } from 'react';

/**
 * React component CountryList
 */
export default class CountryList extends Component {
  /** [render description] */
  render() {
    const { countries, isLoading } = this.props;
    return (
      <div className={this.props.onListVisibility()}>
        { (isLoading === true)
          ? <p className='text-center'>
              <span className='glyphicon glyphicon-refresh'></span> Loading countries...
            </p>
          : ''}
        <ul className='list-group'>
        { countries.map((country, key) =>
          <li
            key={key}
            className='list-group-item row'
            onClick={this.props.onDetailViewOpen.bind(this, country)}
            >
              <div className='col-sm-1 col-sm-offset-1'>
                <div className={this.props.onCountryFlag(country)}></div>
              </div>
              <div className='col-sm-8'>
                <span>{country.name}</span>
              </div>
          </li>
        )}
        </ul>
      </div>
    )
  }
}

/**
 * PropTypes
 */
CountryList.propTypes = {
  countries: React.PropTypes.array.isRequired,
  isLoading: React.PropTypes.bool.isRequired
}
