
import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchStores } from '../../actions/storeActions';
import {
  setCookie,
} from '../../utils/helper';

function Dashboard() {

  return (
    <React.Fragment>
      <h1>Dashboard</h1>
    </React.Fragment>
  )
}


Dashboard.propTypes = {
  fetchStores: PropTypes.func.isRequired
};


const mapStateToProps = state => ({
  stores: state.stores.items
});

export default connect(mapStateToProps, { fetchStores })(Dashboard);

