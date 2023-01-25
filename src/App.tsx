
import { Container, Spinner, Stack } from 'react-bootstrap';
import './App.scss';
import FilterFiles from './components/FilterFIles';
import Uploader from './components/Uploader';
import FilesDistributionGraph from './components/FilesDistributionGraph';
import ShareInfoCard from './components/ShareInfoCard';
import FilesList from './components/FilesList';
import { isError, QueryClient, QueryClientProvider, useQuery } from 'react-query';
import { getFiles, UploadCenterFile } from './services/api';
import { useEffect, useState } from 'react';
import useDebounce from './hooks/useDebounce';


function App() {
  

  const [minSize, setMinSize] = useState(0)
  const [status, setStatus] = useState(null);
  const [search, setSearch] = useState('');
  const [dateRange, setDateRange] = useState({ createdAtStart: '', createdAtEnd: '' })
  const [files, setFiles] = useState<UploadCenterFile[]>([]);
  const debouncedSearch = useDebounce<string>(search, 500)
  const { data, error, isLoading } = useQuery(`getFiles-${minSize}-${status}-${debouncedSearch}-${dateRange}`,
    () => getFiles({ status, createdAtEnd: dateRange.createdAtEnd, createdAtStart: dateRange.createdAtStart, search:debouncedSearch, take: 10, skip: 0, minSize }));
  
  useEffect(() => {
    if (data?.data) { 
      setFiles(data.data);
    }
    },[data]);
  
  return (
    <Container className="App">
      <Stack gap={3} style={{ marginTop: 10 }}>
        <Stack direction='horizontal' gap={3} className="d-flex justify-content-around flex-wrap">
          <FilesDistributionGraph></FilesDistributionGraph>
          <ShareInfoCard></ShareInfoCard>
        </Stack>
        <hr />
        <Uploader addFile={(file: UploadCenterFile) => setFiles([file, ...files])}></Uploader>
        <FilterFiles search={search}
          setSearch={setSearch}
          dateRange={dateRange}
          setDateRange={setDateRange}
          status={status}
          setStatus={setStatus}
          minSize={minSize}
          setMinSize={setMinSize}></FilterFiles>
        {isLoading && <Spinner animation="border" variant='primary' className='d-flex align-self-center' />}
        {data?.data && <FilesList files={files}></FilesList>}
      </Stack>
    </Container>
  );
}
function Wrapper() { 
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 0
      }
    }
})
  return (
    <QueryClientProvider client={queryClient}>
      <App></App>
    </QueryClientProvider>
  )
}

export default Wrapper;
