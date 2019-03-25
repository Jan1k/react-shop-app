import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Table, Button, Header, Image, Grid, Icon, Container } from 'semantic-ui-react';
import styles from './compare.module.css';
import Footer from '../common/Footer';


class Compare extends Component {
  state = {
    highlightedProperties: {},
    active: true,
  };

  getBestProperties() {
    const { comparecart } = this.props;
    let compareProducts = comparecart.map(value => value.product);
    const COMPARED_PROPERTIES = ['bluetooth','display_diagonal','processor_frequency','core_count','amoutRam','builtin_memory','maxMemoryCardSize','sim_count','camera','front_camera','battery_capacity'];
    const COMPARED_STRINGS_PROPERTIES = ['WiFi','Sync','touch_screen','multitouch_support','autofocus','flash','video'];
    const COMPARED_PRICE_PROPERTIES = ['price'];
    const highlightedProperties = {};

    function getAllIndexes(arr, val) {
      var indexes = [], i = -1;
      while ((i = arr.indexOf(val, i+1)) !== -1){
          indexes.push(i);
      }
      return indexes;
    }
  
    let arrayAllMaxIndexes = function(array){
        return getAllIndexes(array, Math.max.apply(null, array));
      }
    let arrayAllMinIndexes = function(array){
      return getAllIndexes(array, Math.min.apply(null, array));
      }
    
    COMPARED_STRINGS_PROPERTIES.forEach(item => {
      const comparedStrings = compareProducts.map(product => (product.specifications[0][item]));  
      let changedString = [...comparedStrings].map(item => item === 'Yes' ? 1 : 0);
      const set = new Set(comparedStrings);
      if (set.size === 1) {
        return;
      }
      highlightedProperties[item] = arrayAllMaxIndexes([...changedString]);
    })  

    COMPARED_PROPERTIES.forEach(item => {
      const comparedValues = compareProducts.map(product => Number(product.specifications[0][item]));
      const set = new Set(comparedValues);
      if (set.size === 1) {
        return;
      }
      highlightedProperties[item] = arrayAllMaxIndexes([...comparedValues]);
    })
    
    COMPARED_PRICE_PROPERTIES.forEach(item => {
      const comparedPrice = compareProducts.map(product => Number(product[item]));
      const set = new Set(comparedPrice);
      if (set.size === 1) {
        return;
      }
      highlightedProperties[item] = arrayAllMinIndexes([...comparedPrice]);
    })
    this.setState({ highlightedProperties, active: false });
  }

    getCount(highlightedProperties,index) {
      const countsMap = {};
      Object.keys(highlightedProperties).forEach(propertyName => {
        highlightedProperties[propertyName].forEach(count => {
    
            countsMap[count] = countsMap[count] ? countsMap[count] + 1 : 1;
        });
      })
      return countsMap[index] || 0;
    }
    

    reset() {
      this.setState({ highlightedProperties: {}, active: true });
    }

    getButtonName() {
      const { active } = this.state;
      if ( active ) {
        return (
        <Button color="facebook" onClick={ () => this.getBestProperties() }>Highlight best properties</Button>
        )
      }
      return (
        <Button color="twitter" onClick={ () => this.reset() }>Reset</Button>
      )
    }


  render() {
    const {comparecart,compareTotal, clearCompare, addToCart, removeFromCompare, cart, currency} = this.props;
    let compareProducts = comparecart.map((value) => value.product);
    const { highlightedProperties } = this.state;
    let currencyKeys = Object.keys(currency);
    let currencyValue = currency[currencyKeys[0]];
    let currencyName = currency[currencyKeys[1]];
    function getCartValue(mobile) {
      const isSelected = !!cart.find(item => item.id === mobile.id );
      if (isSelected) {
        return (
          <Link className="ui button" to='/cart'>Go to cart</Link>
        )
      }
      if (mobile.quantity < 1) {
        return <Button disabled>Out of stock</Button>
      }
      return <Button color='olive' onClick={() => addToCart(mobile.id, mobile.quantity)}>Add to cart</Button>
    }
    function getMaxValue(highlightedProperties){
      const countsMap = {};
      Object.keys(highlightedProperties).forEach(propertyName => {
        highlightedProperties[propertyName].forEach(count => {
    
            countsMap[count] = countsMap[count] ? countsMap[count] + 1 : 1;
        });
      })
      let values = Object.values(countsMap)
      let max = Math.max(...values)
      return max;
      
    }
    if(compareTotal >= 2) {
      return (
        <Container>
          {
            <>
              <Header as='h2' content='Compare phones' className={styles.h2_view} textAlign='center' />
              <Link className="ui button" to={`/catalog`}><Icon className="arrow left icon"/>Back to catalog</Link>
              <Button color='red' onClick={clearCompare}>Remove all</Button>
              {this.getButtonName()}
              <Table definition className={styles.table_styles}>
                  <Table.Header fullWidth>
                    <Table.Row>
                      <Table.HeaderCell />
                        {
                          compareProducts && compareProducts.map((data) =>
                          <Table.HeaderCell key={data.id} textAlign='center'> {data.name} </Table.HeaderCell>
                         
                          )}
                    </Table.Row>
                    <Table.Row>
                      <Table.HeaderCell />
                      
                        {
                          compareProducts && compareProducts.map((data) =>
                          <Table.HeaderCell  key={data.id}>
                            <Grid centered className={styles.grid_margin}>
                              <Image className={styles.img_style} src={data.img}/>
                            </Grid>
                          </Table.HeaderCell>
                         
                          )}
                         
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {[
                      { id:1, title: 'Price', propertyName: 'price' },
                    ].map(({ id, title, propertyName }) => (
                      <Table.Row key={id}>
                      <Table.Cell textAlign='right'>{title}</Table.Cell>
                      {
                          compareProducts && compareProducts.map((data,index) =>(
                          
                          <Table.Cell key={data.id} textAlign='center' className=
                            { (highlightedProperties[propertyName] && highlightedProperties[propertyName].includes(index) && styles.hightlight)
                            ? (highlightedProperties[propertyName] && highlightedProperties[propertyName].includes(index) && styles.hightlight)
                            : styles.unhighlited }>
                            {Math.round(data.price * currencyValue).toLocaleString()} <span>{currencyName}</span>
                          </Table.Cell>
                          ))
                      }
                        </Table.Row>
                       
                      ))}
                  <Table.Row>
                    <Table.Cell textAlign='right'>Action:</Table.Cell>
                    
                      {
                          compareProducts && compareProducts.map((data) =>
                          
                          <Table.Cell key={data.id} textAlign='center'>
                            {getCartValue(data)}
                            <Button
                             onClick={() => removeFromCompare(data.id) && this.reset() }
                             >Remove
                            </Button>
                            
                          </Table.Cell>
                          )
                      }
                      
                    </Table.Row>
                    {[
                      { id:1, title: 'Стандарт связи', propertyName: 'standart' },
                      { id:2, title: 'Доступ в Интернет', propertyName: 'internet_access' },
                      { id:3, title: 'Bluetooth', propertyName: 'bluetooth' },
                      { id:4, title: 'WiFi (802.11)', propertyName: 'WiFi'},
                      { id:5, title: 'Синхронизация с ПК', propertyName: 'Sync'},
                      { id:6, title: 'Разъем для синхронизации', propertyName: 'sync_сonnector'},
                      { id:7, title: 'Тип дисплея', propertyName: 'type' },
                      { id:8, title: 'Количество цветов дисплея', propertyName: 'display_colors' },
                      { id:9, title: 'Разрешение дисплея (пикс)', propertyName: 'display_resolutions' },
                      { id:10, title: 'Диагональ дисплея (дюйм)', propertyName: 'display_diagonal' },
                      { id:11, title: 'Сенсорный экран', propertyName: 'touch_screen' },
                      { id:12, title: 'Тип сенсорного экрана', propertyName: 'touch_screen_type' },
                      { id:13, title: 'Поддержка Multitouch', propertyName: 'multitouch_support' },
                      { id:14, title: 'Операционная система', propertyName: 'operating_system' },
                      { id:15, title: 'Тип процессора', propertyName: 'processor_type' },
                      { id:16, title: 'Частота процессора (МГц)', propertyName: 'processor_frequency' },
                      { id:17, title: 'Количество ядер', propertyName: 'core_count' },
                      { id:18, title: 'Графический ускоритель', propertyName: 'graphics_accelerator' },
                      { id:19, title: 'Объем оперативной памяти (Мб)', propertyName: 'amoutRam' },
                      { id:20, title: 'Встроенная память (Мб)', propertyName: 'builtin_memory' },
                      { id:21, title: 'Поддержка карт памяти', propertyName: 'card_supporting' },
                      { id:22, title: 'Макс. объем карты памяти (Гб)', propertyName: 'maxMemoryCardSize' },
                      { id:23, title: 'Кол-во SIM-карт', propertyName: 'sim_count' },
                      { id:24, title: 'Формат SIM-карты', propertyName: 'sim_format' },
                      { id:25, title: 'Камера (Мп)', propertyName: 'camera' },
                      { id:26, title: 'Автофокус', propertyName: 'autofocus' },
                      { id:27, title: 'Вспышка', propertyName: 'flash' },
                      { id:28, title: 'Видеозапись', propertyName: 'video' },
                      { id:29, title: 'Фронтальная камера (Мп)', propertyName: 'front_camera' },
                      { id:30, title: 'MP3 - звонок', propertyName: 'mpthree_call' },
                      { id:31, title: 'Аудиоплеер', propertyName: 'audioplayer' },
                      { id:32, title: 'Видеоплеер', propertyName: 'videoplayer' },
                      { id:33, title: 'FM - радио', propertyName: 'fmradio' },
                      { id:34, title: 'Аудиоразъем', propertyName: 'audiojack' },
                      { id:35, title: 'Тип аккумулятора', propertyName: 'battery_type' },
                      { id:36, title: 'Емкость аккумулятора (мАч)', propertyName: 'battery_capacity' },
                      { id:37, title: 'Поддержка технологии быстрой зарядки', propertyName: 'supporting_fast_charge' },
                      { id:38, title: 'Тип корпуса', propertyName: 'enclosure_type' },
                      { id:39, title: 'Материал корпуса', propertyName: 'body_material' },
                      { id:40, title: 'Высота (мм)', propertyName: 'height' },
                      { id:41, title: 'Ширина (мм)', propertyName: 'width' },
                      { id:42, title: 'Толщина (мм)', propertyName: 'thickness' },
                      { id:43, title: 'G-сенсор (акселерометр)', propertyName: 'accelerometer' },
                      { id:44, title: 'Датчик освещенности', propertyName: 'light_sensor' },
                      { id:45, title: 'Датчик приближения', propertyName: 'proximity_sensor' },  
                    ].map(({ id, title, propertyName }) => (
                      
                      <Table.Row key={id}>
                        <Table.Cell textAlign='right'>
                          {title}
                        </Table.Cell>
                          {compareProducts && compareProducts.map((data, index) =>
                            data.specifications && data.specifications.map((spec) => (
                        <Table.Cell className={ (highlightedProperties[propertyName] && highlightedProperties[propertyName].includes(index) && styles.hightlight)
                                              ? (highlightedProperties[propertyName] && highlightedProperties[propertyName].includes(index) && styles.hightlight)
                                              : styles.unhighlited }
                                              textAlign='center'> 
                                  {spec[propertyName] ? spec[propertyName] : 'No information' }
                                  
                        </Table.Cell>
                        
                          ))
                          
                        )
                        
                        }
                        
                      </Table.Row>
                    ))}
                    <Table.Row className={!this.state.active ? null : styles.hide}>
                      <Table.Cell textAlign='right'>
                        {!this.state.active ? 'Quantity of all best parameters' : null}
                      </Table.Cell> 
                        {compareProducts && compareProducts.map((data, index) =>
                            data.specifications && data.specifications.map(() => (
                      <Table.Cell textAlign='center' className={!this.state.active && this.getCount(highlightedProperties,index) === getMaxValue(highlightedProperties) ? styles.hightlight_best : null}>
                        {!this.state.active ? this.getCount(highlightedProperties,index) : null }
                      </Table.Cell>
                          )))}
                  </Table.Row>      
                  </Table.Body>
                </Table>
                <Footer/>
            </>
          }
        </Container>
      )
    }
    else {
      return (
        <h3 className={styles.empty_compare}>There are no items to compare. Add at least two mobiles to see the result.&nbsp;<Link to={'/catalog'}> Return to catalog</Link></h3>
      )
    }
}
}


export default Compare;