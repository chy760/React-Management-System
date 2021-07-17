import React from 'react';
import { post } from 'axios';

class CustomerAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
            name: '',
            birthday: '',
            gender: '',
            job: '',
            fileName: ''
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
            })
        this.setState({
            file: null,
            name: '',
            birthday: '',
            gender: '',
            job: '',
            fileName: ''
        })
        window.location.reload();
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

    render() {
        return(
            <form onSubmit={this.handleFormSubmit}>
                <h1>고객 추가</h1>
                프로필 이미지: <input type="file" name="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange}/><br/>
                이름: <input type="text" name="name" value={this.state.name} onChange={this.handleValueChange}/><br/>
                생년월일: <input type="text" name="birthday" value={this.state.birthday} onChange={this.handleValueChange}/><br/>
                성별: <input type="text" name="gender" value={this.state.gender} onChange={this.handleValueChange}/><br/>
                직업: <input type="text" name="job" value={this.state.job} onChange={this.handleValueChange}/><br/>
                <button type="submit">추가하기</button>
            </form>
        )
    }    
}

export default CustomerAdd;