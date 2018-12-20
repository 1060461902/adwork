import React,{Component} from 'react';
import {Table,Button,Modal,Input,message} from 'antd';

import './user-info.less'

export default class UserInfo extends Component{
    constructor(props){
        super(props);
        this.state = {
            dataSource:[],
            loading:false,
            visible:false,
        }
    }

    componentDidMount = () => {
        this.getUsers();
    }

    getUsers = () =>{
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
        this.setState({
            visible:true,
        });
        let id = parseInt(e.target.dataset.id);
        document.getElementById("id").value = id;
    }

    handleDeleteUser = (e) => {
        let user_id = parseInt(e.target.dataset.id);
        fetch('http://localhost:8080/delete-user',{
                method:'post',
                headers:{
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({
                    user_id,
                })
            }).then((res) => {
                console.log(res.status);
                return res.json();
            }).then((data) => {
                if(data.code == 200){
                    message.success('删除成功');
                }else{
                    message.error('删除失败');
                }
            }).catch((err) => {
                console.log(err);
            }).then(() => {
                this.getUsers();
            });
    }

    handleCancle = () => {
        this.setState({
            visible:false,
        })
    }

    handleOk = () => {
        let user_id = document.getElementById("id").value;
        let password = document.getElementById("password").value;
        this.setState({
            loading:true,
        })
        if(!password){
            message.error('请设置密码');
        }else{
            fetch('http://localhost:8080/change-password',{
                method:'post',
                headers:{
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({
                    user_id,
                    password
                })
            }).then((res) => {
                console.log(res.status);
                return res.json();
            }).then((data) => {
                if(data.code == 200){
                    message.success('修改成功');
                    this.setState({
                        visible:false,
                    });
                    document.getElementById("password").value = '';
                }else{
                    message.error('修改失败');
                }
            }).catch((err) => {
                console.log(err);
            }).then(() => {
                this.getUsers();
            });
            this.setState({
                loading:false,
            })
        }
    }

    render(){
        let _this = this;
        let {loading,visible} = this.state;
        const columns = [
            {
                title:'ID',
                dataIndex:'id',
                key:'id',
                width:'10%'
            },
            {
                title:'昵称',
                dataIndex:'nickName',
                key:'nickName',
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
                <Modal
                    visible={visible}
                    title='修改密码'
                    onOk={this.handleOK}
                    onCancel={this.handleCancle}
                    footer={[
                        <Button key='back' type='default' onClick={this.handleCancle}>取消</Button>,
                        <Button key='submit' type='primary' onClick={this.handleOk} loading={loading}>确定</Button>
                    ]}
                >
                    <Input id="password"
                        placeholder='请输入新密码'
                    ></Input>
                    <Input id="id"
                        style={{display:'none'}}
                    ></Input>
                </Modal>
                <Table columns={columns} dataSource={this.state.dataSource}></Table>
            </div>
        )
    }
}