import styled from 'styled-components';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import GlobalStyle from './styles/GlobalStyle';
import Hero from './components/Hero/Hero';
import Countdown from './components/Countdown/Countdown';
import Event from './components/Event/Event';
import Schedule from './components/Schedule/Schedule';
import Gallery from './components/Gallery/Gallery';
import Gifts from './components/Gifts/Gifts';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <AppContainer>
        <Hero />
        <Countdown />
        <Gallery />
        <Event />
        <Schedule />
        <Gifts />
      </AppContainer>
    </ThemeProvider>
  );
}

const AppContainer = styled.div`
  overflow-x: hidden;
`;

export default App;
