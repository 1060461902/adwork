import React,{Component} from 'react';
import {Table} from 'antd';

import './user-info.less'

export default class UserInfo extends Component{
    constructor(props){
        super(props);
        this.state = {
            dataSource:[]
        }
    }

    componentDidMount = () => {
        fetch('./json/table.json').then((res) =>{
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

    render(){
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
                dataIndex:'login_id',
                key:'login_id',
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
                render(){
                    return(
                        <div>
                            <button className='change-password'>修改密码</button>
                            <span>&nbsp;&nbsp;&nbsp;</span>
                            <button className='delete-user'>删除用户</button>
                        </div>
                    )
                }
            }
        ];
        return(
            <Table columns={columns} dataSource={this.state.dataSource}></Table>
        )
    }
}