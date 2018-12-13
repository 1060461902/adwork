import React,{Component} from 'react';
import {Table} from 'antd';

import './book-examine.less'

export default class BookExamine extends Component{
    constructor(props){
        super(props);
        this.state = {
            dataSource:[]
        }
    }

    componentDidMount = () => {
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
        let id = e.target.dataset.id;
    }

    handleExamineReject = (e) => {
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