import { render } from '@testing-library/react';
import React from 'react';
import { TableRow } from '@material-ui/core';
import { TableCell } from '@material-ui/core';
import CustomerDelete from './CustomerDelete';

// 고객 목록/삭제 컴포넌트
class Customer extends React.Component {
    render() {
        return (
            <TableRow>
                <TableCell>{this.props.id}</TableCell>
                <TableCell><img src={this.props.image} alt="profile" style={{width:64 ,height: 64}}/></TableCell>
                <TableCell>{this.props.name}</TableCell>
                <TableCell>{this.props.birthday}</TableCell>
                <TableCell>{this.props.gender}</TableCell>
                <TableCell>{this.props.job}</TableCell>
                <TableCell><CustomerDelete stateRefresh={this.props.stateRefresh} id={this.props.id}/></TableCell>
            </TableRow>
        );
    }
}

export default Customer;