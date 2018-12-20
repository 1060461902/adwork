import React,{Component} from 'react';
import {Table,message} from 'antd';

import './book-examine.less'

export default class BookExamine extends Component{
    constructor(props){
        super(props);
        this.state = {
            dataSource:[]
        }
    }

    componentDidMount = () => {
        this.getBooks();
    }

    getBooks = () => {
        fetch('http://localhost:8080/passing-books').then((res) =>{
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

    handleExaminePass = (e) => {
        let id = parseInt(e.target.dataset.id);
        fetch('http://localhost:8080/examine-book',{
                method:'post',
                headers:{
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({
                    book_id:id,
                    pass:1
                })
            }).then((res) => {
                console.log(res.status);
                return res.json();
            }).then((data) => {
                if(data.code == 200){
                    message.success('审核通过');
                }else{
                    message.error('请求错误');
                }
            }).catch((err) => {
                console.log(err);
            }).then(() => {
                this.getBooks();
            });
    }

    handleExamineReject = (e) => {
        let id = parseInt(e.target.dataset.id);
        fetch('http://localhost:8080/examine-book',{
                method:'post',
                headers:{
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({
                    book_id:id,
                    pass:2
                })
            }).then((res) => {
                console.log(res.status);
                return res.json();
            }).then((data) => {
                if(data.code == 200){
                    message.success('拒绝通过');
                }else{
                    message.error('请求错误');
                }
            }).catch((err) => {
                console.log(err);
            }).then(() => {
                this.getBooks();
            });
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
                title:'书名',
                dataIndex:'name',
                key:'name',
                width:'15%'  
            },
            {
                title:'价格',
                dataIndex:'price',
                key:'price',
                width:'15%'  
            },
            {
                title:'作者',
                dataIndex:'article',
                key:'article',
                width:'15%'  
            },
            {
                title:'出版商',
                dataIndex:'publisher',
                key:'publisher',
                width:'15%'  
            },
            {
                title:'操作',
                key:'operation',
                width:'30%',
                render(text,record){
                    return(
                        <div>
                            <button className='examine-pass' data-id={record.id} onClick={_this.handleExaminePass}>通过</button>
                            <span>&nbsp;&nbsp;&nbsp;</span>
                            <button className='examine-reject' data-id={record.id} onClick={_this.handleExamineReject}>拒绝</button>
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