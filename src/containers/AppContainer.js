import React, { Component } from 'react';

import CountryList from '../components/CountryList';
import CountryDetail from '../components/CountryDetail';

/**
 * React component AppContainer
 */
export default class AppContainer extends Component {
  /** Constructor */
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      countries: [],
      activeCountry: {},
      query: '',
      listVisibility: true,
      detailVisibility: false
    };
    this.handleDetailViewClose = this.handleDetailViewClose.bind(this);
    this.handleListVisibility = this.handleListVisibility.bind(this);
    this.handleDetailVisibility = this.handleDetailVisibility.bind(this);
  }

  /** Get the country data on componentWillMount */
  componentWillMount() {
    this.getCountries();
  }

  /** Get the country data from restcountries API */
  getCountries() {
    let url = 'https://restcountries.eu/rest/v1/all';
    fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      let arr = [];
      for (var value of data) {
        arr.push(value);
      }
      this.setState({countries: arr, activeCountry: arr[0], isLoading: false});
    }
    .bind(this));
  }

  /** Update the query when typing into the filter input */
  updateFilter(e) {
    let v = e.target.value.toLowerCase();
    this.setState({query: v});
  }

  /** Set a country to be active */
  handleActiveCountry(country) {
    this.setState({activeCountry: country});
  }

  /** Generate a classname from alphacode to get a flag from the spritesheet */
  handleCountryFlag(country) {
    let code = country.alpha2Code.toLowerCase();
    return 'flag flag-' + code;
  }

  /** Show the detail view */
  handleDetailViewOpen(country) {
    this.setState({activeCountry: country, query: country.name, listVisibility: false, detailVisibility: true});
  }

  /** Hide the detail view */
  handleDetailViewClose() {
    this.setState({listVisibility: true, query: '', detailVisibility: false});
  }

  /** Return the dynamic classname for the list */
  handleListVisibility() {
    return 'col-sm-4 col-sm-offset-4' + (((this.state.listVisibility === false)) ? ' hidden' : '');
  }

  /** Return the dynamic classname for the detail */
  handleDetailVisibility() {
    return 'col-sm-4 col-sm-offset-4 well' + (((this.state.detailVisibility === false)) ? ' hidden' : '');
  }

  /** Render method for the AppContainer */
  render() {
    /** Generate a filtered list from the countries to respond to the query */
    const countryList = this.state.countries.filter(
      country => country.name.toLowerCase().match(this.state.query)
    );
    return (
      <div>
        <div className='container'>
          <div className='text-center col-sm-4 col-sm-offset-4'>
            <div className='page-header'>
              <h1>Countries</h1>
              <form className='form-inline'>
                <div className='form-group'>
                  <label className='sr-only' for='exampleInputAmount'>Filter</label>
                  <div className='input-group'>
                  <input
                      type='text'
                      className='form-control'
                      placeholder='Filter'
                      disabled={this.state.detailVisibility}
                      value={this.state.query}
                      onChange={this.updateFilter.bind(this)}
                      />
                    <div className='input-group-addon'>
                      <span className='glyphicon glyphicon-filter'></span>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className='container'>
          <CountryList
            countries={countryList}
            isLoading={this.state.isLoading}
            onListVisibility={this.handleListVisibility}
            onDetailViewOpen={(country) => this.handleDetailViewOpen(country)}
            onCountryFlag={(country) => this.handleCountryFlag(country)}
            />
        </div>
        <div className='container'>
          <CountryDetail
            country={this.state.activeCountry}
            onDetailVisibility={this.handleDetailVisibility}
            onDetailViewClose={this.handleDetailViewClose}
            />
        </div>
      </div>
    )
  }
}
