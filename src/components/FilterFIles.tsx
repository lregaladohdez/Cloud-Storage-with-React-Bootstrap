import React from 'react';
import { Col, Form, InputGroup, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as Icon from 'react-bootstrap-icons';
import { FileStatus } from '../services/api';
import { DateTime } from "luxon";

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
        { name: 'Time',start: DateTime.now().minus({years: 100}).toISO(),end: DateTime.now().endOf('day').toISO()},
        { name: 'Today',start: DateTime.now().startOf('day').toISO(),end: DateTime.now().endOf('day').toISO() },
        { name: 'Yesterday',start: DateTime.now().minus({day: 1}).startOf('day').toISO(),end: DateTime.now().minus({day: 1}).endOf('day').toISO() },
        { name: 'This Week',start: DateTime.now().startOf('week').toISO(),end: DateTime.now().endOf('week').toISO() },
        { name: 'This Month',start: DateTime.now().startOf('month').toISO(),end: DateTime.now().endOf('month').toISO() },
        { name: 'Last 30 days',start: DateTime.now().minus({days: 30}).toISO(),end: DateTime.now().endOf('day').toISO() },
    ]
    const statuses = [
        { name: 'Status', value: '' },
        { name: 'Uploaded', value: FileStatus.Uploaded },
        { name: 'Uploading', value: FileStatus.Uploading },
        { name: 'Shared', value: FileStatus.Shared },
    ]

    function handleTimeChange(e: React.ChangeEvent<HTMLSelectElement>){
        const time = times.find(t => t.name === e.target.value);
        if (time) { 
            setDateRange({ createdAtStart: time.start, createdAtEnd: time.end })
        }
    }

    return (
        <Form>
            <Row >
                <Col className="mb-1" sm={3} md={2}>
                    
                    <Form.Select placeholder="Time" onChange={handleTimeChange} >
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
