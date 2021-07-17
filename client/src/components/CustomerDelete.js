import React from 'react';
import { Dialog } from '@material-ui/core';
import { DialogActions } from '@material-ui/core';
import { DialogTitle } from '@material-ui/core';
import { DialogContent } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { Typography } from '@material-ui/core';

class CustomerDelete extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
    }

    // 모달창 클릭시 state.open 값을 true 변경
    handleClickOpen = () => {
        this.setState({
            open: true
        })
    }

    // 모달창 클릭시 state 값을 초기화
    handleClose = () => {
        this.setState({
            open: false
        }) 
    }

    // 삭제 API 함수 생성, 매개변수는 (고객 id)
    deleteCustomer(id) {
        const url = '/api/customers/' + id;
        fetch(url, {// Rest API에서는 DELETE method로 해당경로에 접속 했을때 삭제가 이루어진다.
            method: 'DELETE'
        });
        this.props.stateRefresh();
    }

    render() {
        //<button onClick={(e) => {this.deleteCustomer(this.props.id)}}>삭제</button>
        return(
            <div>
                <Button variant="contained" color="secondary" onClick={this.handleClickOpen}>삭제</Button>
                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <DialogTitle onClose={this.handleClose}>
                        삭제 경고
                    </DialogTitle>
                    <DialogContent>
                        <Typography gutterBottom>
                            선택한 고객 정보가 삭제됩니다.
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={(e) => {this.deleteCustomer(this.props.id)}}>삭제</Button>
                        <Button variant="outlined" color="primary" onClick={this.handleClose}>닫기</Button>
                    </DialogActions>
                </Dialog>                
            </div>            
        )
    }
}

export default CustomerDelete;