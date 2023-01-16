import { Badge, Button, Card, Image, ProgressBar, Ratio, Stack } from "react-bootstrap";
import * as Icon from 'react-bootstrap-icons';
import logo from './../logo.svg';
function ShareInfoCard() {
    return (
        <div className="flex-fill">
            <Stack gap={3} style={{ borderRadius: 5, boxShadow: ' 0px 3px 10px 0px rgba(0, 0, 0, 0.3)' }}>
                <Stack gap={2} direction="horizontal" className="d-flex align-items-center" style={{ margin: 15 }}>
                    {/* <Image fluid style={{ height: 64, width: 64, backgroundColor: '#e0e0e0' }} src={logo} /> */}
                    <Icon.PersonFill size={64} color="#03A9F4"> </Icon.PersonFill>
                    <Stack>
                        <h4 style={{ textAlign: 'left', fontWeight: "600" }}> Drible Files</h4>
                        <h5 style={{ color: '#c0c0c0', textAlign: 'left' }}> <small>16gb free of 26</small></h5>
                    </Stack>
                    <Icon.ThreeDotsVertical style={{ marginTop: 4 }} className="align-self-start"
                        size={16}
                        color="#909090"
                    />
                </Stack>
                <ProgressBar style={{ margin: 15 }}>
                    <ProgressBar variant="document" now={35} key={1} />
                    <ProgressBar variant="archive" now={20} key={2} />
                    <ProgressBar variant="video" now={10} key={3} />
                    <ProgressBar variant="image" now={10} key={4} />
                </ProgressBar>
                <Stack direction="horizontal" style={{margin: 15}}>
                    <Stack>
                        <span style={{textAlign: 'left'}}>Shared Users</span>
                        <Stack direction="horizontal" gap={1}>
                            {
                                ['orange', 'blue', 'green', 'red', 'yellow'].map((c, i) => (
                                    <Image key={c} roundedCircle style={{
                                        border: '1px solid white',
                                        margin: i > 0
                                            ? '0px 0px 0px -28px'
                                            : '0px 0px 0px 0px',
                                        width: 48,
                                        height: 48,
                                        backgroundColor: c
                                    }} />))
                            }
                            <span style={{
                                width: 48,
                                height: 48,
                                lineHeight: '48px',
                                border: '1px solid white',
                                margin: '0px 0px 0px -28px',
                                borderRadius: '50%',
                                backgroundColor: "red"
                            }}>+8</span>
                        
                        </Stack>
                    </Stack>
                    <Stack>
                        <span>Shared Files</span>
                        <h3><Badge bg="secondary" text="light">2504</Badge></h3>
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