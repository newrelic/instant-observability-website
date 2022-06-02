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
const Share = (url) => (

    <div
        css={css`
        .button {
        margin-right: 0;
        }
        `}
        className="post-social">
        <FacebookShareButton url={url} className="button" >
            <FacebookSVG
                width="24"
                height="24"
            />
        </FacebookShareButton>

        <TwitterShareButton url={url} className="button" >
            <TwitterSVG width="24"
                height="24" />
        </TwitterShareButton>

        <LinkedinShareButton url={url} className="button">
            <LinkedinSVG width="24"
                height="24" />
        </LinkedinShareButton>

        <EmailShareButton url={url} className="button" >
            <MailSVG width="24"
                height="24" />
        </EmailShareButton>
    </div>
);

export default Share;