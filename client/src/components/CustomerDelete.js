import React from 'react';

class CustomerDelete extends React.Component {

    // 삭제 API 함수 생성, 매개변수는 (고객 id)
    deleteCustomer(id) {
        const url = '/api/customers/' + id;
        fetch(url, {// Rest API에서는 DELETE method로 해당경로에 접속 했을때 삭제가 이루어진다.
            method: 'DELETE'
        });
        this.props.stateRefresh();
    }

    render() {
        return(
            <button onClick={(e) => {this.deleteCustomer(this.props.id)}}>삭제</button>
        )
    }
}

export default CustomerDelete;