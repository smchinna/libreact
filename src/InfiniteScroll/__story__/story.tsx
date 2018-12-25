import * as React from 'react';
import {storiesOf} from '@storybook/react';
import {InfiniteScroll} from '..';

const h = React.createElement;

const Block = () => {
  return <div style={{
    width: 100,
    height: 100,
    margin: 20,
    background: 'red',
  }}></div>
};

class Demo extends React.Component {
  state = {
    items: [],
    cursor: 1,
  };

  constructor (props) {
    super(props);
    this.load();
  }

  load = (cnt = 5) => {
    console.log('loading for cursor: ' + this.state.cursor);
    const items = [...this.state.items];
    for (let i = 0; i < cnt; i++) {
      items.push(<Block key={items.length} />);
    }
    this.setState({
      items,
      cursor: this.state.cursor + 1,
    });
  };

  render () {
    return (
      <InfiniteScroll hasMore={this.state.cursor < 5} loadMore={this.load} cursor={this.state.cursor}>
        {this.state.items}
      </InfiniteScroll>
    );
  }
}

storiesOf('UI/InfiniteScroll', module)
  // .add('Documentation', () => h(ShowDocs, {md: require('../../../docs/en/Lifecycles.md')}))
  .add('Example', () => <Demo />)
