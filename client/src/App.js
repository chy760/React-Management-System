import React, { Component } from 'react';
import Customer from './components/Customer';
import './App.css';
import { Paper } from '@material-ui/core';
import { Table } from '@material-ui/core';
import { TableHead } from '@material-ui/core';
import { TableBody } from '@material-ui/core';
import { TableRow } from '@material-ui/core';
import { TableCell } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';

const styles = theme => ({
  root: {
    width: '100%',
    //marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 1080
  }
})

// 고객데이터 관리
class App extends Component {
  // state 값 설정, 변경되는 값
  state = {
    customers: ""
  }
  // render()->componentDidMount(), 생명주기는 랜더링 준비 완료시 동작 됨
  componentDidMount() {
    // 서버 API호출
    this.callApi()
      // 성공시 .then() 함수 실행
      .then(res => this.setState({customers: res}))
      // 실패시 .catch() 함수 실행
      .catch(err => console.log(err));      
  }
  // callApi(), 비동기 형태로 http://localhost:5000/api/customers 접속 후 json 데이터를 반환
  callApi = async () => {
    // 비동기 형태로 /api/customers 데이터를 가져온다.
    const response = await fetch('/api/customers');
    // json 데이터로 가져온다.
    const body = await response.json();
    return body;
  }

  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>번호</TableCell>
              <TableCell>이미지</TableCell>
              <TableCell>이름</TableCell>
              <TableCell>생년월일</TableCell>
              <TableCell>성별</TableCell>
              <TableCell>직업</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {// this.state.customers 값이 있을경우에만 가져온다.
              this.state.customers ? this.state.customers.map((c) => {
                  return( <Customer  key={c.id} id={c.id} image={c.image} name={c.name} birthday={c.birthday} gender={c.gender} job={c.job} />);                  
              }) : "" }
          </TableBody>          
        </Table>        
      </Paper>      
    );
  }
}

export default withStyles(styles) (App);
