import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
// Components
import Slider from 'react-slick';
import withInstrumentation from '@components/withInstrumentation';
import QuickstartTile from '@components/QuickstartTile';
import GuidedInstallTile from '@components/GuidedInstallTile';
// Utils
import shuffleArray from '@utils/shuffleArray';
// Types
import { quickstart } from '../types';

const SliderWrapper = ({
  indexSettings,
  quickstarts,
  category,
  showGuidedInstall,
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
      {showGuidedInstall && (
        <div
          css={css`
            display: grid;
            gap: 16px;
            grid-template-columns: repeat(1, 1fr);
          `}
        >
          <GuidedInstallTile />
        </div>
      )}
      {shuffledQuickstarts.map((pack, i) => {
        const InstrumentedTile = withInstrumentation(QuickstartTile);

        return (
          <InstrumentedTile
            category={category}
            index={showGuidedInstall ? i + 1 : i}
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
  showGuidedInstall: PropTypes.bool,
};

export default SliderWrapper;
