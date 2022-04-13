import React from 'react';

const txt = `while explaining the
development and importance of accounting as a
source of disseminating the financial information
along with the discussion on basic accounting
concepts that guide the recording of business
transactions, it has been indicated https://raw.githubusercontent.com/newrelic/newrelic-quickstarts/main/quickstarts/dotnet/dotnet/images/Transactions.png
`

const txt2 = `Dua Lipa is an English singer, songwriter, and model. Her musical career began at age 14, when she began covering songs by other artists on YouTube. In 2015, she was signed with Warner Music Group and released her first single soon after. In December 2016, a documentary about Lipa was commissioned by The Fader magazine, titled See in Blue. In January 2017, Lipa won the EBBA Public Choice Awar
 this is Dua lipa's profile photo https://static.onecms.io/wp-content/uploads/sites/20/-0001/11/30/GettyImages-1130966043.jpg Lipa was born in London, to Albanian parents from Kosovo who had left Pristina in the 1990s. She attended Sylvia Young Theatre School`

function RenderImageFromText() {
    const extractImgURLFromText = (text) => {
        const urlRegex = /(https?:\/\/[^\s]+)/g;
        const imagePresentInText = RegExp(urlRegex).test(text);

        const renderOnlyText = () => {
            const onlyText = text.replaceAll(urlRegex, function() {
                return ''
            });
            return onlyText;
        }
        const renderImages = () => {
            const imagesList = []
            text.replaceAll(urlRegex, function(url) {
                imagesList.push(url);
            })
            return imagesList;
        }

        if (imagePresentInText) {
            return (
                <div>
                    {renderOnlyText()}
                    {renderImages().map(url => {
                        return (
                            <img src={url} />
                        )
                    })}
                </div>
            )
        } else {
            return (
                <div>
                    {txt}
                </div>
            )
        }
    }
    return (
        <div>
            {extractImgURLFromText(txt)}
        </div>
    )
}

export default RenderImageFromText
