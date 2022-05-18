import React from 'react';
import { css } from '@emotion/react';

  const AnimatedText = ({
    text
  }) => {
    return (
      <div
        css={css`
        overflow: hidden;
        line-height: 30px;
        text-align: center;
        margin: 0;
        width: 106px;
        height: 48px;

        > div {
          margin: 10px auto 0;
          white-space: nowrap;
        }
        > span {
          background: none;
          border: 15px solid var(--button-background);
          position: absolute;
          z-index: 100;
          top: 0;
          left: 0;
        }

        .scroll {
          -webkit-animation: scroll-back 0.3s
            cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
          animation: scroll-back 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
            forwards;
        }
        &:hover .scroll {
          -webkit-animation: scroll 0.3s
            cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
          animation: scroll 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
            forwards;
        }

        --translateY-distance: -40px;

        @-webkit-keyframes scroll {
          0% {
            -webkit-transform: translateY(0);
            transform: translateY(0);
          }
          100% {
            -webkit-transform: translateY(var(--translateY-distance));
            transform: translateY(var(--translateY-distance));
          }
        }
        @-webkit-keyframes scroll-back {
          0% {
            -webkit-transform: translateY(var(--translateY-distance));
            transform: translateY(var(--translateY-distance));
          }
          100% {
            -webkit-transform: translateY(0);
            transform: translateY(0);
          }
        }

        @keyframes scroll {
          0% {
            -webkit-transform: translateY(0);
            transform: translateY(0);
          }
          100% {
            -webkit-transform: translateY(var(--translateY-distance));
            transform: translateY(var(--translateY-distance));
          }
        }
        @keyframes scroll-back {
          0% {
            -webkit-transform: translateY(var(--translateY-distance));
            transform: translateY(var(--translateY-distance));
          }
          100% {
            -webkit-transform: translateY(0);
            transform: translateY(0);
          }
        }
      `}
      >
        <span />
        <div className="scroll scroll-top">{text}</div>
        <div className="scroll scroll-bottom">{text}</div>
      </div>
    );
  };

  export default AnimatedText;