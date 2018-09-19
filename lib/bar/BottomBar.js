import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import PropTypes from 'prop-types';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import { BarContainer, BAR_POSITIONS } from './BarContainer';

const BUTTON_WIDTH = 60;

export default class BottomBar extends React.Component {

  static propTypes = {
    displayed: PropTypes.bool,
    height: PropTypes.number,
    caption: PropTypes.string,
    displayNavArrows: PropTypes.bool,
    displayGridButton: PropTypes.bool,
    displayActionButton: PropTypes.bool,
    onPrev: PropTypes.func,
    onNext: PropTypes.func,
    onGrid: PropTypes.func,
    onAction: PropTypes.func,
  };

  static defaultProps = {
    displayed: false,
    caption: '',
    displayNavArrows: false,
    displayGridButton: false,
    displayActionButton: false,
    onPrev: () => {},
    onNext: () => {},
    onGrid: () => {},
    onAction: () => {},
  };

  _renderNavArrows() {
    const {
      displayNavArrows,
      displayGridButton,
      displayActionButton,
      onPrev,
      onNext,
    } = this.props;
    const missingButtonMargin = BUTTON_WIDTH;
    const arrows = [];

    if (displayNavArrows) {
      // make sure arrows are always at the center of the bar
      // if grid or action buttons are missing
      // note: making grid and action button positions absolute is a nicer way
      // but it's breaking TouchableHiglight for some reason
      // FIX_ME: when you find out a nicer way

      const leftArrow = (
        <TouchableOpacity
          key="left_arrow"
          style={styles.button}
          onPress={onPrev}
        >
          <Icon name="arrow-alt-left" style={styles.buttonImage} />
        </TouchableOpacity>
      );
      const rightArrow = (
        <TouchableOpacity
          key="right_arrow"
          style={styles.button}
          onPress={onNext}
        >
          <Icon name="arrow-alt-right" style={styles.buttonImage} />
        </TouchableOpacity>
      );

      arrows.push(leftArrow, rightArrow);
    }
    return (
      <View style={[styles.arrowContainer, {
        marginRight: displayGridButton ? missingButtonMargin : 0,
        marginLeft: displayActionButton ? missingButtonMargin : 0,
      }]}>
      {arrows}
    </View>
    );
  }

  _renderGridButton() {
    const { displayGridButton, onGrid } = this.props;

    if (displayGridButton) {
      return (
        <TouchableOpacity style={[styles.button, { flex: 0 }]} onPress={onGrid}>
          <Icon name="th-large" style={styles.buttonImage} />
        </TouchableOpacity>
      );
    }
    return null;
  }

  _renderActionSheet() {
    const { displayActionButton, onAction } = this.props;

    if (displayActionButton) {
      return (
        <TouchableOpacity style={[styles.button, { flex: 0 }]} onPress={onAction}>
          <Icon name="trash" style={styles.buttonImage} />
        </TouchableOpacity>
      );
    }
    return null;
  }

  render() {
    const { displayed, caption, height } = this.props;

    return (
      <BarContainer
        position={BAR_POSITIONS.BOTTOM}
        displayed={displayed}
        height={height}
        style={styles.container}
      >
        <View style={styles.buttonContainer}>
          {this._renderGridButton()}
          {this._renderNavArrows()}
          {this._renderActionSheet()}
        </View>
      </BarContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  captionContainer: {
    flex: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    borderBottomWidth: 1,
  },
  caption: {
    color: 'white',
    alignSelf: 'center',
    paddingTop: 8,
  },
  arrowContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
    paddingHorizontal: 16,
    height: 60,
  },
  button: {
    alignItems: 'center',
    width: BUTTON_WIDTH,
    height: BUTTON_WIDTH,
  },
  buttonImage: {
    fontSize: 30,
    marginTop: 8,
    color: "white",
  },
});
