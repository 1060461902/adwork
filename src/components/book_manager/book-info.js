import React,{Component} from 'react';
import {Table} from 'antd';

import './book-info.css'

export default class BookInfo extends Component{
    constructor(props){
        super(props);
        this.state = {
            dataSource:[]
        }
    }

    componentDidMount = () => {
        fetch().then((res) =>{
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
                title:'书名',
                dataIndex:'b_name',
                key:'b_name',
                width:'15%'  
            },
            {
                title:'价格',
                dataIndex:'b_price',
                key:'b_price',
                width:'15%'  
            },
            {
                title:'作者',
                dataIndex:'b_article',
                key:'b_article',
                width:'15%'  
            },
            {
                title:'出版商',
                dataIndex:'b_publisher',
                key:'b_publisher',
                width:'15%'  
            },
            {
                title:'操作',
                key:'operation',
                width:'30%',
                render(){
                    return(
                        <div>
                            <a>修改</a>
                            <span>&nbsp;&nbsp;&nbsp;</span>
                            <a>删除</a>
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