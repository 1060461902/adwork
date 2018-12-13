import React,{Component} from 'react';
import {Table,Button} from 'antd';

import './user-info.less'

export default class UserInfo extends Component{
    constructor(props){
        super(props);
        this.state = {
            dataSource:[]
        }
    }

    componentDidMount = () => {
        fetch('http://localhost:8080/users').then((res) =>{
            console.log(res.status);
            return res.json();
        }).then((data) => {
            this.setState({
                dataSource:data
            })
        }).catch((err) => {
            console.log(err);
        });
    }

    handleChangePwd = (e) => {
        let id = e.target.dataset.id;
    }

    handleDeleteUser = (e) => {
        let id = e.target.dataset.id;
    }

    render(){
        let _this = this;
        const columns = [
            {
                title:'ID',
                dataIndex:'id',
                key:'id',
                width:'10%'
            },
            {
                title:'昵称',
                dataIndex:'nick_name',
                key:'nick_name',
                width:'20%'
            },
            {
                title:'登录账号',
                dataIndex:'loginId',
                key:'loginId',
                width:'20%'
            },
            {
                title:'密码',
                dataIndex:'password',
                key:'password',
                width:'20%'
            },
            {
                title:'操作',
                key:'operation',
                width:'30%',
                render(text,record){
                    return(
                        <div>
                            <button className='change-password' onClick={_this.handleChangePwd} data-id={record.id}>修改密码</button>
                            <span>&nbsp;&nbsp;&nbsp;</span>
                            <button className='delete-user' onClick={_this.handleDeleteUser} data-id={record.id}>删除用户</button>
                        </div>
                    )
                }
            }
        ];
        return(
            <div>
                <div id='add-user-bar'>
                    <Button type='primary' id='add-user-btn'>添加用户</Button>
                </div>
                <Table columns={columns} dataSource={this.state.dataSource}></Table>
            </div>
        )
    }
}