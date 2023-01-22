import React from 'react';
import { Col, Form, InputGroup, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as Icon from 'react-bootstrap-icons';
import { FileStatus } from '../services/api';
import { DebounceInput } from 'react-debounce-input';

function FilterFiles({ minSize, setMinSize, search, dateRange,setSearch,setDateRange,setStatus,status }: {
    minSize: number,
    search: string,
    dateRange: { createdAtStart: string, createdAtEnd: string },
    status: FileStatus | null,
    setMinSize: Function,
    setSearch: Function,
    setDateRange: Function,
    setStatus: Function
}) {
    const sizes = [
        { name: 'Size',value: 0 },
        { name: '5mb',value: 5 },
        { name: '10mb',value: 10 },
        { name: '50mb',value: 50 }
    ];
    const times = [
        { name: 'Time'},
        { name: 'Today' },
        { name: 'Yesterday' },
        { name: 'This Week' },
        { name: 'This Month' },
        { name: 'Last 30 days' },
    ]
    const statuses = [
        { name: 'Status', value: '' },
        { name: 'Uploaded', value: FileStatus.Uploaded },
        { name: 'Uploading', value: FileStatus.Uploading },
        { name: 'Shared', value: FileStatus.Shared },
    ]
    return (
        <Form>
            <Row >
                <Col className="mb-1" sm={3} md={2}>
                    <Form.Select placeholder="Time" >
                        {times.map(t => <option key={t.name}>{t.name}</option>)}
                    </Form.Select>
                
                </Col>
                <Col className="mb-1" sm={9} md={6}>
                    <InputGroup className="me-auto">
                        <InputGroup.Text><Icon.Search /></InputGroup.Text>
                        <Form.Control placeholder="Search" value={search}
                            onChange={(e) => setSearch(e.target.value)} />
                    </InputGroup>
                
                </Col>
                <Col className="mb-1" sm={6} md={2}>
                    <Form.Select value={status || ''} onChange={e => setStatus(e.target.value || null)}>
                        {statuses.map(t => <option key={t.name} value={t.value}>{t.name}</option>)}
                    </Form.Select>
                
                </Col>
                <Col className="mb-1" sm={6} md={2}>
                    <Form.Select onChange={(event) => setMinSize(event.target.value) }>
                        {sizes.map(t => <option key={t.name} value={t.value }>{t.name}</option>)}
                    </Form.Select>
                </Col>
                
            </Row>
            
        </Form>
    );
}

export default FilterFiles;
