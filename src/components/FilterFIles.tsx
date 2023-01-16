import React from 'react';
import { Col, Form, InputGroup, Row, Stack } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as Icon from 'react-bootstrap-icons';

function FilterFiles() {
    const sizes = [
        { name: 'Size' },
        { name: '5mb' },
        { name: '10mb' },
        { name: '50mb' }
    ];
    const times = [
        { name: 'Time' },
        { name: 'Today' },
        { name: 'Yesterday' },
        { name: 'This Week' },
        { name: 'This Month' },
        { name: 'Last 30 days' },
    ]
    const statuses = [
        { name: 'Status' },
        { name: 'Uploaded' },
        { name: 'Uploading' },
        { name: 'Shared' },
    ]
    return (
        <Form className='mb-2'>
            <Row>
                <Col sm={2}>
                    <Form.Select placeholder="Time" >
                        {times.map(t => <option key={t.name}>{t.name}</option>)}
                    </Form.Select>
                
                </Col>
                <Col sm={12} md={6}>
                    <InputGroup className="me-auto">
                        <InputGroup.Text><Icon.Search /></InputGroup.Text>
                        <Form.Control placeholder="Search" />
                    </InputGroup>
                
                </Col>
                <Col sm={2}>
                    <Form.Select>
                        {statuses.map(t => <option key={t.name}>{t.name}</option>)}
                    </Form.Select>
                
                </Col>
                <Col sm={2}>
                    <Form.Select >
                        {sizes.map(t => <option key={t.name}>{t.name}</option>)}
                    </Form.Select>
                </Col>
                
            </Row>
            
        </Form>
    );
}

export default FilterFiles;
