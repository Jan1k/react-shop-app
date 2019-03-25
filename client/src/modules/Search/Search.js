import React from 'react';
import { Input, Menu, Button } from 'semantic-ui-react';
import styles from './search.module.css';

class Search extends React.Component {
  handleSearch = (e) => {
    let searchValue = e.target.value;
    this.props.fetchProductsFilter(searchValue);
  }
  render() {
    const { search } = this.props;
    return (
        <Menu className={styles.changed_menu}>
          <h3 className={styles.h3_style}>Sorting:</h3>
          <Button
            className={styles.buttons_view}
            onClick={this.props.fetchProductById}>
            All
          </Button>
          <Button
            className={styles.buttons_view}
            onClick={this.props.fetchProductPriceFromHigh}>
            By price (DESC)
          </Button>
          <Button
            className={styles.buttons_view}
            onClick={this.props.fetchProductPriceFromLow}>
            By price (ASC)
          </Button>
          <Button
            className={styles.buttons_view}
            onClick={this.props.fetchProductByPopularity}>
            By rating
          </Button>
          <Button 
            className={styles.buttons_view}
            onClick={this.props.fetchProductBySale}>
            On sale
          </Button>
          <Input
            icon="search"
            onChange={this.handleSearch}
            value={search}
            className={styles.input_view}
            placeholder="Search by name..."
          />
        </Menu>
)}}

export default Search;

