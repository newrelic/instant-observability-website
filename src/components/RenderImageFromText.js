import React from 'react';

const txt = `## Title #1
Text #1
![Transactions](https://raw.githubusercontent.com/newrelic/newrelic-quickstarts/main/quickstarts/dotnet/dotnet/images/Transactions.png)
`

const txt2 = `Dua Lipa is an English singer, songwriter, and model. Her musical career began at age 14, when she began covering songs by other artists on YouTube. In 2015, she was signed with Warner Music Group and released her first single soon after. In December 2016, a documentary about Lipa was commissioned by The Fader magazine, titled See in Blue. In January 2017, Lipa won the EBBA Public Choice Awar
 this is Dua lipa's profile photo https://static.onecms.io/wp-content/uploads/sites/20/-0001/11/30/GettyImages-1130966043.jpg Lipa was born in London, to Albanian parents from Kosovo who had left Pristina in the 1990s. She attended Sylvia Young Theatre School`


const sampleJson = {
    description: txt
}

const textMD = `"## Comprehensive monitoring quickstart for .NET

.NET Framework is a software product developed by Microsoft. It is a platform used on the Microsoft Windows operating system to build desktop and web applications and supports many programming languages.

### Why monitor .NET?

.NET monitoring is an essential activity in .NET software development that enables software developers to observe the performance of an application in real-time. .NET monitoring enables a swift intervention if issues arise while the application runs.

### What should you look for in a .NET Monitor?

An ideal ![.NET Performance Monitor](https://raw.githubusercontent.com/newrelic/newrelic-quickstarts/main/quickstarts/dotnet/dotnet/images/Transactions.png) must offer comprehensive and actionable information that software developers need to troubleshoot an application successfully. Some key components are:

- Preemptive performance monitoring
- Comprehensive full-stack performance monitoring
- Intimate code insights
- Granular error identification mechanism
- Comprehensive .NET Framework, Common Language Runtime (CLR), and Internet Information Services (IIS) monitoring

### What's included in this quickstart:

- High-value alerts
- Code-related insights that acquaint developers with the intricate details of their application’s health and status by providing detailed information on errors, database queries, and transaction traces
- Alerts that proactively inform developers about the status of their applications

### What makes this quickstart unique?

With this quickstart, you can monitor health and status in one place, focus on the most important information, and enable preventative maintenance strategy."`


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
