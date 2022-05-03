import styled from '@emotion/styled';
import {
  SohneBuch,
  SohneDreiviertelfett,
  SohneFett,
  SohneExtrafett,
  SohneExtraleicht,
  SohneHalbfett,
  SohneKraftig,
  SohneLeicht,
  SohneMonoBuch,
  SohneMonoKraftig,
  SohneBuchKursiv,
  SohneDreiviertelfettKursiv,
  SohneExtrafettKursiv,
  SohneExtraleichtKursiv,
  SohneFettKursiv,
  SohneHalbfettKursiv,
  SohneKraftigKursiv,
  SohneLeichtKursiv,
} from './fonts';

const fonts = styled.div`
  @font-face {
    font-family: 'Söhne-Buch';
    src: url(${SohneBuch});
  }
  @font-face {
    font-family: 'Söhne-BuchKursiv';
    src: url(${SohneBuchKursiv});
  }
  @font-face {
    font-family: 'Söhne-Dreiviertelfett';
    src: url(${SohneDreiviertelfett});
  }
  @font-face {
    font-family: 'Söhne-DreiviertelfettKursiv';
    src: url(${SohneDreiviertelfettKursiv});
  }
  @font-face {
    font-family: 'Söhne-Extrafett';
    src: url(${SohneExtrafett});
  }
  @font-face {
    font-family: 'Söhne-ExtrafettKursiv';
    src: url(${SohneExtrafettKursiv});
  }
  @font-face {
    font-family: 'Söhne-Extraleicht';
    src: url(${SohneExtraleicht});
  }
  @font-face {
    font-family: 'Söhne-ExtraleichtKursiv';
    src: url(${SohneExtraleichtKursiv});
  }
  @font-face {
    font-family: 'Söhne-Fett';
    src: url(${SohneFett});
  }
  @font-face {
    font-family: 'Söhne-FettKursiv';
    src: url(${SohneFettKursiv});
  }
  @font-face {
    font-family: 'Söhne-Halbfett';
    src: url(${SohneHalbfett});
  }
  @font-face {
    font-family: 'Söhne-HalbfettKursiv';
    src: url(${SohneHalbfettKursiv});
  }
  @font-face {
    font-family: 'Söhne-Kräftig';
    src: url(${SohneKraftig});
  }
  @font-face {
    font-family: 'Söhne-KräftigKursiv';
    src: url(${SohneKraftigKursiv});
  }
  @font-face {
    font-family: 'Söhne-Leicht';
    src: url(${SohneLeicht});
  }
  @font-face {
    font-family: 'Söhne-LeichtKursiv';
    src: url(${SohneLeichtKursiv});
  }
  @font-face {
    font-family: 'SöhneMono-Buch';
    src: url(${SohneMonoBuch});
  }
  @font-face {
    font-family: 'SöhneMono-Kräftig';
    src: url(${SohneMonoKraftig});
  }
`;

export default fonts;
