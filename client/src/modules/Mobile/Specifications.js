import React, { Component } from 'react'
import { Divider, Header, Icon, Table, Grid } from 'semantic-ui-react';

class Specifications extends Component {
  render() {
    const {mobile} = this.props;
    return (
      <React.Fragment>
      <Divider horizontal>
        <Header as='h4'>
          <Icon name='bar chart' />
          Specifications
        </Header>
      </Divider>
      <Grid columns={2}>
      <Grid.Column>
      <Table definition>
        <Table.Header>
          <Table.Row>
            <Table.Cell textAlign='center' colSpan='2'>Связь</Table.Cell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
        {[
            { id:1, title: 'Стандарт связи', propertyName: 'standart' },
            { id:2, title: 'Доступ в Интернет', propertyName: 'internet_access' },
            { id:3, title: 'Bluetooth', propertyName: 'bluetooth' },
            { id:4, title: 'WiFi (802.11)', propertyName: 'WiFi'},
            { id:5, title: 'Синхронизация с ПК', propertyName: 'Sync'},
            { id:6, title: 'Разъем для синхронизации', propertyName: 'sync_сonnector'},
          ].map(({ id, title, propertyName }) => (
            <Table.Row key={id}>
              <Table.Cell textAlign='left' width={8}>
                {title}
              </Table.Cell>
                {mobile.specifications && mobile.specifications.map((conn,id) => (
              <Table.Cell key={id}>
                        {conn[propertyName] ? conn[propertyName] : "No information"}
              </Table.Cell>
                ))
              }
            </Table.Row>
          ))
          }
        </Table.Body>
      </Table>

      <Table definition>
        <Table.Header>
          <Table.Row>
            <Table.Cell textAlign='center' colSpan='2'>Навигация</Table.Cell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
        {[
            { id:1, title: 'GPS-навигация', propertyName: 'gps' },
            { id:2, title: 'Cистема A-GPS', propertyName: 'agps' },
          ].map(({ id, title, propertyName }) => (
            <Table.Row key={id}>
              <Table.Cell textAlign='left' width={8}>
                {title}
              </Table.Cell>
              {mobile.specifications && mobile.specifications.map((conn,id) => (
              <Table.Cell key={id}>
                        {conn[propertyName] ? conn[propertyName] : "No information"}
              </Table.Cell>
                ))
              }
            </Table.Row>
          ))
          }
        </Table.Body>
      </Table>


      <Table definition>
        <Table.Header>
          <Table.Row>
            <Table.Cell textAlign='center' colSpan='2'>Дисплей</Table.Cell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
        {[
            { id:1, title: 'Тип дисплея', propertyName: 'type' },
            { id:2, title: 'Количество цветов дисплея', propertyName: 'display_colors' },
            { id:3, title: 'Разрешение дисплея (пикс)', propertyName: 'display_resolutions' },
            { id:4, title: 'Диагональ дисплея (дюйм)', propertyName: 'display_diagonal' },
            { id:5, title: 'Сенсорный экран', propertyName: 'touch_screen' },
            { id:6, title: 'Тип сенсорного экрана', propertyName: 'touch_screen_type' },
            { id:7, title: 'Поддержка Multitouch', propertyName: 'multitouch_support' },

          ].map(({ id, title, propertyName }) => (
            <Table.Row key={id}>
              <Table.Cell textAlign='left' width={8}>
                {title}
              </Table.Cell>
              {mobile.specifications && mobile.specifications.map((conn,id) => (
              <Table.Cell key={id} >
                        {conn[propertyName] ? conn[propertyName] : "No information"}
              </Table.Cell>
                ))
              }
            </Table.Row>
          ))
          }
        </Table.Body>
      </Table>


      <Table definition>
        <Table.Header>
          <Table.Row>
            <Table.Cell textAlign='center' colSpan='2'>Система</Table.Cell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
        {[
            { id:1, title: 'Операционная система', propertyName: 'operating_system' },
            { id:2, title: 'Тип процессора', propertyName: 'processor_type' },
            { id:3, title: 'Частота процессора (МГц)', propertyName: 'processor_frequency' },
            { id:4, title: 'Количество ядер', propertyName: 'core_count' },
            { id:5, title: 'Графический ускоритель', propertyName: 'graphics_accelerator' },
          ].map(({ id, title, propertyName }) => (
            <Table.Row key={id}>
              <Table.Cell textAlign='left' width={8}>
                {title}
              </Table.Cell>
              {mobile.specifications && mobile.specifications.map((conn,id) => (
              <Table.Cell key={id}>
                        {conn[propertyName] ? conn[propertyName] : "No information"}
              </Table.Cell>
                ))
              }
            </Table.Row>
          ))
          }
        </Table.Body>
      </Table>


      <Table definition>
        <Table.Header>
          <Table.Row>
            <Table.Cell textAlign='center' colSpan='2'>Память</Table.Cell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
        {[
            { id:1, title: 'Объем оперативной памяти (Мб)', propertyName: 'amoutRam' },
            { id:2, title: 'Встроенная память (Мб)', propertyName: 'builtin_memory' },
            { id:3, title: 'Поддержка карт памяти', propertyName: 'card_supporting' },
            { id:4, title: 'Макс. объем карты памяти (Гб)', propertyName: 'maxMemoryCardSize' },
          ].map(({ id, title, propertyName }) => (
            <Table.Row key={id}>
              <Table.Cell textAlign='left' width={8}>
                {title}
              </Table.Cell>
              {mobile.specifications && mobile.specifications.map((conn,id) => (
              <Table.Cell key={id}>
                        {conn[propertyName] ? conn[propertyName] : "No information"}
              </Table.Cell>
                ))
              }
            </Table.Row>
          ))
          }
        </Table.Body>
      </Table>

      <Table definition>
        <Table.Header>
          <Table.Row>
            <Table.Cell textAlign='center' colSpan='2'>SIM-карта</Table.Cell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
        {[
            { id:1, title: 'Кол-во SIM-карт', propertyName: 'sim_count' },
            { id:2, title: 'Формат SIM-карты', propertyName: 'sim_format' },
          ].map(({ id, title, propertyName }) => (
            <Table.Row key={id}>
              <Table.Cell textAlign='left' width={8}>
                {title}
              </Table.Cell>
              {mobile.specifications && mobile.specifications.map((conn,id) => (
              <Table.Cell key={id}>
                        {conn[propertyName] ? conn[propertyName] : "No information"}
              </Table.Cell>
                ))
              }
            </Table.Row>
          ))
          }
        </Table.Body>
      </Table>


      </Grid.Column>


      {/* second column start */}
      <Grid.Column>

      <Table definition>
        <Table.Header>
          <Table.Row>
            <Table.Cell textAlign='center' colSpan='2'>Фотокамера</Table.Cell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
        {[
            { id:1, title: 'Фотокамера (Мп)', propertyName: 'camera' },
            { id:2, title: 'Автофокус', propertyName: 'autofocus' },
            { id:3, title: 'Вспышка', propertyName: 'flash' },
            { id:4, title: 'Видеозапись', propertyName: 'video' },
            { id:5, title: 'Фронтальная камера (Мп)', propertyName: 'front_camera' },
          ].map(({ id, title, propertyName }) => (
            <Table.Row key={id}>
              <Table.Cell textAlign='left' width={8}>
                {title}
              </Table.Cell>
              {mobile.specifications && mobile.specifications.map((conn,id) => (
              <Table.Cell key={id}>
                        {conn[propertyName] ? conn[propertyName] : "No information"}
              </Table.Cell>
                ))
              }
            </Table.Row>
          ))
          }
        </Table.Body>
      </Table>

      <Table definition>
        <Table.Header>
          <Table.Row>
            <Table.Cell textAlign='center' colSpan='2'>Мультимедиа</Table.Cell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
        {[
            { id:1, title: 'MP3 - звонок', propertyName: 'mpthree_call' },
            { id:2, title: 'Аудиоплеер', propertyName: 'audioplayer' },
            { id:3, title: 'Видеоплеер', propertyName: 'videoplayer' },
            { id:4, title: 'FM - радио', propertyName: 'fmradio' },
            { id:5, title: 'Аудиоразъем', propertyName: 'audiojack' },
          ].map(({ id, title, propertyName }) => (
            <Table.Row key={id}>
              <Table.Cell textAlign='left' width={8}>
                {title}
              </Table.Cell>
              {mobile.specifications && mobile.specifications.map((conn,id) => (
              <Table.Cell key={id}>
                        {conn[propertyName] ? conn[propertyName] : "No information"}
              </Table.Cell>
                ))
              }
            </Table.Row>
          ))
          }
        </Table.Body>
      </Table>

      <Table definition>
        <Table.Header>
          <Table.Row>
            <Table.Cell textAlign='center' colSpan='2'>Питание</Table.Cell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
        {[
            { id:1, title: 'Тип аккумулятора', propertyName: 'battery_type' },
            { id:2, title: 'Емкость аккумулятора (мАч)', propertyName: 'battery_capacity' },
            { id:3, title: 'Поддержка технологии быстрой зарядки', propertyName: 'supporting_fast_charge' },
          ].map(({ id, title, propertyName }) => (
            <Table.Row key={id}>
              <Table.Cell textAlign='left' width={8}>
                {title}
              </Table.Cell>
              {mobile.specifications && mobile.specifications.map((conn,id) => (
              <Table.Cell key={id}>
                        {conn[propertyName] ? conn[propertyName] : "No information"}
              </Table.Cell>
                ))
              }
            </Table.Row>
          ))
          }
        </Table.Body>
      </Table>

      <Table definition>
        <Table.Header>
          <Table.Row>
            <Table.Cell textAlign='center' colSpan='2'>Корпус</Table.Cell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
        {[
            { id:1, title: 'Тип корпуса', propertyName: 'enclosure_type' },
            { id:2, title: 'Материал корпуса', propertyName: 'body_material' },
            { id:3, title: 'Высота (мм)', propertyName: 'height' },
            { id:4, title: 'Ширина (мм)', propertyName: 'width' },
            { id:5, title: 'Толщина (мм)', propertyName: 'thickness' },
          ].map(({ id, title, propertyName }) => (
            <Table.Row key={id}>
              <Table.Cell textAlign='left' width={8}>
                {title}
              </Table.Cell>
              {mobile.specifications && mobile.specifications.map((conn,id) => (
              <Table.Cell key={id}>
                        {conn[propertyName] ? conn[propertyName] : "No information"}
              </Table.Cell>
                ))
              }
            </Table.Row>
          ))
          }
        </Table.Body>
      </Table>

      <Table definition>
        <Table.Header>
          <Table.Row>
            <Table.Cell textAlign='center' colSpan='2'>Прочее</Table.Cell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
        {[
            { id:1, title: 'G-сенсор (акселерометр)', propertyName: 'accelerometer' },
            { id:2, title: 'Датчик освещенности', propertyName: 'light_sensor' },
            { id:3, title: 'Датчик приближения', propertyName: 'proximity_sensor' },
          ].map(({ id, title, propertyName }) => (
            <Table.Row key={id}>
              <Table.Cell textAlign='left' width={8}>
                {title}
              </Table.Cell>
              {mobile.specifications && mobile.specifications.map((conn,id) => (
              <Table.Cell key={id}>
                        {conn[propertyName] ? conn[propertyName] : "No information"}
              </Table.Cell>
                ))
              }
            </Table.Row>
          ))
          }
        </Table.Body>
      </Table>



      </Grid.Column>
      </Grid>

      </React.Fragment>
      )
  }
}

export default Specifications;














