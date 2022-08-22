import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

// Components
import SuperTiles from '@components/SuperTiles';
import Slider from 'react-slick';
import withInstrumentation from '@components/withInstrumentation';
import QuickstartTile from '@components/QuickstartTile';
// Utils
import shuffleArray from '@utils/shuffleArray';
// Types
import { quickstart } from '../types';

const SliderWrapper = ({ indexSettings, quickstarts, category }) => {
  const shuffledQuickstarts = useMemo(() => shuffleArray(quickstarts), []);

  return (
    <Slider {...indexSettings}>
      {category === 'MostPopularQuickstartClick' && <SuperTiles />}
      {shuffledQuickstarts.map((pack, i) => {
        const InstrumentedTile = withInstrumentation(QuickstartTile);

        return (
          <InstrumentedTile
            category={category}
            index={i}
            key={pack.id}
            featured={false}
            {...pack}
          />
        );
      })}
    </Slider>
  );
};

SliderWrapper.propTypes = {
  quickstarts: PropTypes.arrayOf(quickstart),
  indexSettings: PropTypes.object,
  category: PropTypes.string,
};

export default SliderWrapper;
