import { Container, Stack } from 'react-bootstrap';
import './App.scss';
import FilterFiles from './components/FilterFIles';
import Uploader from './components/Uploader';
import FilesDistributionGraph from './components/FilesDistributionGraph';
import ShareInfoCard from './components/ShareInfoCard';
import FilesList from './components/FilesList';

function App() {
  return (
    <Container className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <Button as="a"
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </Button>
      </header> */}
      <Stack gap={3} style={{marginTop:10}}>
        <Stack direction='horizontal' gap={3} className="d-flex justify-content-around flex-wrap">
          <FilesDistributionGraph></FilesDistributionGraph>
          <ShareInfoCard></ShareInfoCard>
        </Stack>
        <hr />
        <Uploader></Uploader>
        <FilterFiles></FilterFiles>
        <FilesList></FilesList>
      </Stack>
        
        
      
    </Container>
  );
}

export default App;
