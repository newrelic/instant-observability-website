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

const SliderWrapper = ({
  indexSettings,
  quickstarts,
  category,
  showSuperTiles,
}) => {
  /* 
    The following line is disabled because including `quickstarts` in the dependencies or not 
    including the empty dep array, we run into issues with an onHover event from react-slick 
    which causes the tiles to re-render.  In this case, re-render also causes a shuffle of the 
    components which we don't want.
  */
  const shuffledQuickstarts = useMemo(() => shuffleArray(quickstarts), []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Slider {...indexSettings}>
      {showSuperTiles && <SuperTiles />}
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
  showSuperTiles: PropTypes.bool,
};

export default SliderWrapper;
