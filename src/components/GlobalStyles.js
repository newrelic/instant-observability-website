import styled from '@emotion/styled';
import {
  SöhneBuch,
  SöhneDreiviertelfett,
  SöhneFett,
  SöhneExtrafett,
  SöhneExtraleicht,
  SöhneHalbfett,
  SöhneKräftig,
  SöhneLeicht,
  SöhneMonoBuch,
  SöhneMonoKräftig,
  SöhneBuchKursiv,
  SöhneDreiviertelfettKursiv,
  SöhneExtrafettKursiv,
  SöhneExtraleichtKursiv,
  SöhneFettKursiv,
  SöhneHalbfettKursiv,
  SöhneKräftigKursiv,
  SöhneLeichtKursiv,
} from './fonts';

const fonts = styled.div`
  @font-face {
    font-family: 'Söhne-Buch';
    src: url(${SöhneBuch});
  }
  @font-face {
    font-family: 'Söhne-BuchKursiv';
    src: url(${SöhneBuchKursiv});
  }
  @font-face {
    font-family: 'Söhne-Dreiviertelfett';
    src: url(${SöhneDreiviertelfett});
  }
  @font-face {
    font-family: 'Söhne-DreiviertelfettKursiv';
    src: url(${SöhneDreiviertelfettKursiv});
  }
  @font-face {
    font-family: 'Söhne-Extrafett';
    src: url(${SöhneExtrafett});
  }
  @font-face {
    font-family: 'Söhne-ExtrafettKursiv';
    src: url(${SöhneExtrafettKursiv});
  }
  @font-face {
    font-family: 'Söhne-Extraleicht';
    src: url(${SöhneExtraleicht});
  }
  @font-face {
    font-family: 'Söhne-ExtraleichtKursiv';
    src: url(${SöhneExtraleichtKursiv});
  }
  @font-face {
    font-family: 'Söhne-Fett';
    src: url(${SöhneFett});
  }
  @font-face {
    font-family: 'Söhne-FettKursiv';
    src: url(${SöhneFettKursiv});
  }
  @font-face {
    font-family: 'Söhne-Halbfett';
    src: url(${SöhneHalbfett});
  }
  @font-face {
    font-family: 'Söhne-HalbfettKursiv';
    src: url(${SöhneHalbfettKursiv});
  }
  @font-face {
    font-family: 'Söhne-Kräftig';
    src: url(${SöhneKräftig});
  }
  @font-face {
    font-family: 'Söhne-KräftigKursiv';
    src: url(${SöhneKräftigKursiv});
  }
  @font-face {
    font-family: 'Söhne-Leicht';
    src: url(${SöhneLeicht});
  }
  @font-face {
    font-family: 'Söhne-LeichtKursiv';
    src: url(${SöhneLeichtKursiv});
  }
  @font-face {
    font-family: 'SöhneMono-Buch';
    src: url(${SöhneMonoBuch});
  }
  @font-face {
    font-family: 'SöhneMono-Kräftig';
    src: url(${SöhneMonoKräftig});
  }
`;

export default fonts;
