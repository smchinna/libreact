import * as React from 'react';
import {ViewportSensor} from '../ViewportSensor';
import {ViewportScrollSensor} from '../ViewportScrollSensor';

const h = React.createElement;
const defaultSentinel = h('div', {style: {width: 1, height: 1}});

export interface InfiniteScrollProps {
  cursor?: number | string;
  sentinel?: React.ReactElement<any>;
  hasMore?: boolean;
  loadMore: () => void;
}

export interface InfiniteScrollState {
}

export class InfiniteScroll extends React.Component<InfiniteScrollProps, InfiniteScrollProps> {
  static defaultProps = {
    sentinel: defaultSentinel,
    hasMore: true,
  };

  lastLoadMoreCursor: number | string | null = null;

  onViewportChange = ({visible}) => {
    if (visible) {
      if (this.lastLoadMoreCursor !== this.props.cursor) {
        this.lastLoadMoreCursor = this.props.cursor;
        this.props.loadMore();
      }
    }
  };

  render () {
    const {props} = this;
    const {children, hasMore, sentinel} = props;
    return h(React.Fragment, null,
      children,
      hasMore &&
        h(ViewportScrollSensor, {onChange: this.onViewportChange}, () => sentinel),
    );
  }
}
