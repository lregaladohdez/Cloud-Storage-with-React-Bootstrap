import { Badge, Button, Card, Image, ProgressBar, Ratio, Spinner, Stack } from "react-bootstrap";
import * as Icon from 'react-bootstrap-icons';
import { useQuery } from "react-query";
import prettyBytes from 'pretty-bytes';
import { FileStatus, getFiles, getFilesGrouped, getSharedUsers, getUser } from "../services/api";
function ShareInfoCard() {


    const { data: user, error: errorUser, isLoading: isLoadingUser } = useQuery(`getUser`, () => getUser());
    const { data: filesGrouped, error: errorFilesGrouped, isLoading: isLoadingFilesGrouped } = useQuery(`getFilesGrouped`, () => getFilesGrouped());
    const { data: sharedUsers, error: errorSharedUsers, isLoading: isLoadingSharedUsers } = useQuery(`getSharedUsers`, () => getSharedUsers(null, true, 8, 0));
    const { data: sharedFiles, error: errorSharedFiles, isLoading: isLoadingSharedFiles } = useQuery(`getSharedFiles`, () => getFiles({
        status: FileStatus.Shared,
        take: 0,
        skip: 0,
        search: null,
        minSize: 0,
        createdAtEnd: null,
        createdAtStart: null
    }));
    
    if (isLoadingUser || isLoadingSharedUsers || isLoadingSharedFiles || isLoadingFilesGrouped ) {
        return (
            <div className="d-flex flex-fill justify-content-center">
                <Spinner animation="border" variant='primary' className='d-flex align-self-center' />
            </div>
            )
    }

    const totalSpace = filesGrouped
        ? Object.values(filesGrouped).reduce((acc, v) => acc += v,0)
        : 1;

    return (
        
        <div className="flex-fill">
            <Stack gap={3} style={{ borderRadius: 5, boxShadow: ' 0px 3px 10px 0px rgba(0, 0, 0, 0.3)' }}>
                <Stack gap={2} direction="horizontal" className="d-flex align-items-center" style={{ margin: 15 }}>
                    {/* <Image fluid style={{ height: 64, width: 64, backgroundColor: '#e0e0e0' }} src={logo} /> */}
                    {!user?.avatar && <Icon.PersonFill size={64} color="#03A9F4"> </Icon.PersonFill>}
                    {user?.avatar && <Image style={{border: '1px solid white',borderRadius: 15}}  src={user?.avatar || ''}/>}
                    <Stack>
                        <h4 style={{ textAlign: 'left', fontWeight: "600" }}> {user?.name}</h4>
                        <h5 style={{ color: '#c0c0c0', textAlign: 'left' }}>
                            <small>{prettyBytes((filesGrouped?.free || 0) * 1024 * 1024,{maximumFractionDigits: 2})}  free of {prettyBytes(((filesGrouped?.free || 0) + totalSpace * 1024 * 1024),{maximumFractionDigits: 2}) }</small></h5>
                    </Stack>
                    <Icon.ThreeDotsVertical style={{ marginTop: 4 }} className="align-self-start"
                        size={16}
                        color="#909090"
                    />
                </Stack>
                <ProgressBar style={{ margin: 15 }}>
                    <ProgressBar variant="document" about="aaa" now={(filesGrouped?.Document || 0) * 100 / totalSpace} key={1} />
                    <ProgressBar variant="archive" now={(filesGrouped?.Archive|| 0) * 100 / totalSpace } key={2} />
                    <ProgressBar variant="video" now={(filesGrouped?.Video || 0) * 100 / totalSpace} key={3} />
                    <ProgressBar variant="image" now={(filesGrouped?.Image || 0) * 100 / totalSpace} key={4} />
                </ProgressBar>
                <Stack direction="horizontal" style={{margin: 15}}>
                    <Stack>
                        <span style={{textAlign: 'left'}}>Shared Users</span>
                        <Stack direction="horizontal" gap={1}>
                            {sharedUsers?.data.map((u, i) => <Image key={u.id}
                                roundedCircle
                                src={u.avatar}
                                style={{
                                        border: '1px solid white',
                                        margin: i > 0
                                            ? '0px 0px 0px -28px'
                                            : '0px 0px 0px 0px',
                                        width: 48,
                                    height: 48,
                                    backgroundColor: '#c0c0c0'
                                }} />)}
                            {sharedUsers?.total && sharedUsers?.total > 8 &&
                                <span style={{
                                    width: 48,
                                    height: 48,
                                    lineHeight: '48px',
                                    border: '1px solid white',
                                    margin: '0px 0px 0px -28px',
                                    borderRadius: '50%',
                                    color: 'white',
                                    backgroundColor: "black"
                                }}>+{sharedUsers.total - sharedUsers.data.length }</span>}
                            
                        
                        </Stack>
                    </Stack>
                    <Stack>
                        <span>Shared Files</span>
                        <h3><Badge bg="secondary" text="light">{sharedFiles?.total}</Badge></h3>
                    </Stack>
                </Stack>
            </Stack>
        </div>)
}


export default ShareInfoCard;

/* <Card style={{ width: '100%' }}>
            <Card.Title style={{ textAlign: 'left' }}>
                <span>Drible File</span></Card.Title>
            <Card.Subtitle style={{textAlign: 'left',color: '#c0c0c0'}}> 15gb used of 25gb</Card.Subtitle>
            <Card.Body>
                <ProgressBar>
                    <ProgressBar variant="document" now={35} key={1} />
                    <ProgressBar variant="image" now={20} key={2} />
                    <ProgressBar variant="video" now={10} key={3} />
                    <ProgressBar variant="archive" now={10} key={3} />
                </ProgressBar>
            </Card.Body>
        </Card> */