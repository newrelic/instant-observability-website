import React from 'react';
import {
    FacebookShareButton,
    LinkedinShareButton,
    TwitterShareButton,
    EmailShareButton,
} from 'react-share';

import FacebookSVG from './Icons/FacebookSVG';
import TwitterSVG from './Icons/TwitterSVG';
import LinkedinSVG from './Icons/LinkedinSVG';
import MailSVG from './Icons/MailSVG';
import { css } from '@emotion/react';
import { MIN_WIDTH_BREAKPOINT } from '../data/constants';
import { useTessen } from '@newrelic/gatsby-theme-newrelic';



export default function Share({ url }) {
    const tessen = useTessen();
    const tessenOnShareClick = (value) => {

        console.log({ value }, "comein")

        tessen.track({
            eventName: 'instantObservability',
            category: 'TessenOnShareClick',
            buttonClicked: value
        });
    };

return (
    <div
        css={css`
        .button {
            margin-right: 0;
            
            @media (max-width: ${MIN_WIDTH_BREAKPOINT}) {
                margin: 0;
                margin-right: 3px;
            }
        }
        `}
        className="post-social">
        <FacebookShareButton url={url} className="button" onClick={() => tessenOnShareClick('FaceBook')} >
            <FacebookSVG
                width="24"
                height="24"
            />
        </FacebookShareButton>

        <TwitterShareButton url={url} className="button" onClick={() => tessenOnShareClick('Twitter')}>
            <TwitterSVG width="24"
                height="24" />
        </TwitterShareButton>

        <LinkedinShareButton url={url} className="button" onClick={() => tessenOnShareClick('Linkedin')}>
            <LinkedinSVG width="24"
                height="24" />
        </LinkedinShareButton>

        <EmailShareButton url={url} className="button" onClick={() => tessenOnShareClick('EmailShare')}>
            <MailSVG width="24"
                height="24" />
        </EmailShareButton>
    </div>
);
    
};

