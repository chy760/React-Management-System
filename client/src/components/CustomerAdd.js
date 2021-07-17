import React from 'react';
import { post } from 'axios';
import { Dialog } from '@material-ui/core';
import { DialogActions } from '@material-ui/core';
import { DialogTitle } from '@material-ui/core';
import { DialogContent } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';

const styles = theme => ({
    hidden: {
        display: 'none'
    }
})

// 고객추가 컴포넌트
class CustomerAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
            name: '',
            birthday: '',
            gender: '',
            job: '',
            fileName: '',
            open: false // 모달창 오픈 여부
        }
    }

    addCustomer = () => {
        // api 주소로 데이터를 보낼 수 있도록 함.
        const url = '/api/customers';
        const formData = new FormData();
        // byte 형태의 file를 image 이름으로 보냄.
        formData.append('image', this.state.file)
        formData.append('name', this.state.name)
        formData.append('birthday', this.state.birthday)
        formData.append('gender', this.state.gender)
        formData.append('job', this.state.job)
        // 보내는 form 안에 파일을 보낼경우 headers에 multipart/form-data 명시
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        // axios의 포함되어 있는 post 라이브러리를 이용함.
        return post(url, formData, config);
    }

    handleFormSubmit = (e) => {
        e.preventDefault()
        this.addCustomer()
            .then((response) => {
                console.log("handleFormSubmit:" + response.data);
                // 고객목록부분만 새로고침, 고객응답 이후 state 값 초기화
                this.props.stateRefresh();
            })
        this.setState({
            file: null,
            name: '',
            birthday: '',
            gender: '',
            job: '',
            fileName: '',
            open: false
        })        
    }

    handleFileChange = (e) => {
        this.setState({
            file: e.target.files[0],
            fileName: e.target.value
        });
    }

    handleValueChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
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
            file: null,
            name: '',
            birthday: '',
            gender: '',
            job: '',
            fileName: '',
            open: false
        }) 
    }

    render() {
        const { classes } = this.props;
        return(
            <div>
                <Button variant="contained" color="primary" onClick={this.handleClickOpen}>
                    고객 추가하기
                </Button>
                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <DialogTitle>고객 추가</DialogTitle>
                    <DialogContent>
                        <input className={classes.hidden} accept="image/*" id="raised-button-file" type="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange}/><br/>
                        <label htmlFor="raised-button-file">
                            <Button variant="contained" color="primary" component="span" name="file">
                                { this.state.fileName === "" ? "프로필 이미지 선택" : this.state.fileName }
                            </Button>
                        </label><br/>
                        <TextField label="이름" type="text" name="name" value={this.state.name} onChange={this.handleValueChange}/><br/>
                        <TextField label="생년월일" type="text" name="birthday" value={this.state.birthday} onChange={this.handleValueChange}/><br/>
                        <TextField label="성별" type="text" name="gender" value={this.state.gender} onChange={this.handleValueChange}/><br/>
                        <TextField label="직업" type="text" name="job" value={this.state.job} onChange={this.handleValueChange}/><br/>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={this.handleFormSubmit}>추가</Button>
                        <Button variant="outlined" color="primary" onClick={this.handleClose}>닫기</Button>
                    </DialogActions>
                </Dialog>
            </div>
            /*
            <form onSubmit={this.handleFormSubmit}>
                <h1>고객 추가</h1>
                프로필 이미지: <input type="file" name="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange}/><br/>
                이름: <input type="text" name="name" value={this.state.name} onChange={this.handleValueChange}/><br/>
                생년월일: <input type="text" name="birthday" value={this.state.birthday} onChange={this.handleValueChange}/><br/>
                성별: <input type="text" name="gender" value={this.state.gender} onChange={this.handleValueChange}/><br/>
                직업: <input type="text" name="job" value={this.state.job} onChange={this.handleValueChange}/><br/>
                <button type="submit">추가하기</button>
            </form>
            */
        )
    }    
}

export default withStyles(styles) (CustomerAdd);