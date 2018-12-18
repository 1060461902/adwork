import React,{Component} from 'react';
import {Table,Button,Modal,Input,InputNumber,message} from 'antd';

import './book-info.less'

export default class BookInfo extends Component{
    constructor(props){
        super(props);
        this.state = {
            dataSource:[],
            visible:false,
            loading:false,
            visible_c:false,
            price:''
        }
    }

    componentDidMount = () => {
        this.getBooks();
    }

    getBooks = () => {
        fetch('http://localhost:8080/pass-books').then((res) =>{
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

    handleChangeInfo = (e) => {
        let id = parseInt(e.target.dataset.id);
        this.setState({
            loading:true,
        });
        //获取书籍信息
        fetch('http://localhost:8080/book-detail',{
                method:'post',
                headers:{
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({book_id:id})
            }).then((res) => {
                console.log(res.status);
                return res.json();
            }).then((d) => {
                // let d = JSON.parse(data);
                this.setState({
                    loading:false,
                    visible_c:true,
                    price:d.price
                });
                document.getElementById("book-name-c").value  = d.name;
                document.getElementById("book-article-c").value = d.article;
                document.getElementById("book-publisher-c").value = d.publisher;
                document.getElementById("book-id-c").value = id;
            }).catch((err) => {
                console.log(err);
            })
    }

    handleDeleteInfo = (e) => {
        let id = parseInt(e.target.dataset.id);
        fetch('http://localhost:8080/delete',{
                method:'post',
                headers:{
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({book_id:id})
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
                this.getBooks();
            });
    }

    //[start] add-book
    handleAddBook = () => {
        this.setState({
            visible:true
        });
    }

    handleAddBookOk = () => {
        this.setState({
            loading:true
        });
        let name = document.getElementById("book-name").value;
        let price = document.getElementById("book-price").value;
        let article = document.getElementById("book-article").value;
        let publisher = document.getElementById("book-publisher").value;
        if(!name){
            message.error('请输入书名');
        }else if(price == '￥ '){
            message.error('请输入价格');
        }else if(!article){
            message.error('请输入作者');
        }else if(!publisher){
            message.error('请输入出版社');
        }else{
            let book = {
                name,
                price:parseFloat(price.substring(2,price.length)),
                article,
                publisher,
                pass:1
            }
            fetch('http://localhost:8080/save-book',{
                method:'post',
                headers:{
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify(book)
            }).then((res) => {
                console.log(res.status);
                return res.json();
            }).then((data) => {
                if(data.code == 200){
                    message.success('添加成功');
                }else{
                    message.error('添加失败');
                }
            }).catch((err) => {
                console.log(err);
            }).then(() => {
                this.getBooks();
            });
            this.setState({
                loading:false,
                visible:false,
                price:''
            });
            document.getElementById("book-name").value  = '';
            document.getElementById("book-article").value = '';
            document.getElementById("book-publisher").value = '';
        }
    }

    handleAddBookOk_c = () => {
        this.setState({
            loading:true
        });
        let id = document.getElementById("book-id-c").value;
        let name = document.getElementById("book-name-c").value;
        let price = document.getElementById("book-price-c").value;
        let article = document.getElementById("book-article-c").value;
        let publisher = document.getElementById("book-publisher-c").value;
        if(!name){
            message.error('请输入书名');
        }else if(price == '￥ '){
            message.error('请输入价格');
        }else if(!article){
            message.error('请输入作者');
        }else if(!publisher){
            message.error('请输入出版社');
        }else{
            let book = {
                id,
                name,
                price:parseFloat(price.substring(2,price.length)),
                article,
                publisher,
                pass:1
            }
            fetch('http://localhost:8080/change-book',{
                method:'post',
                headers:{
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify(book)
            }).then((res) => {
                console.log(res.status);
                return res.json();
            }).then((data) => {
                if(data.code == 200){
                    message.success('修改成功');
                }else{
                    message.error('修改失败');
                }
            }).catch((err) => {
                console.log(err);
            }).then(() => {
                this.getBooks();
            });
            this.setState({
                loading:false,
                visible_c:false,
                price:''
            });
            document.getElementById("book-name-c").value  = '';
            document.getElementById("book-article-c").value = '';
            document.getElementById("book-publisher-c").value = '';
        }
    }

    handleAddBookCancle = () => {
        this.setState({
            visible:false
        })
    }

    handleAddBookCancle_c = () => {
        this.setState({
            visible_c:false
        })
    }

    changePrice = (value) => {
        this.setState({
            price:value
        });
    }
    //[end] add-book


    render(){
        let _this = this;
        const {visible,loading,price,visible_c} = this.state;
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
                            <button className='change-info' data-id={record.id} onClick={_this.handleChangeInfo}>修改</button>
                            <span>&nbsp;&nbsp;&nbsp;</span>
                            <button className='delete-info' data-id={record.id} onClick={_this.handleDeleteInfo}>删除</button>
                        </div>
                    )
                }
            }
        ];
        return(
            <div>
                <Modal
                    visible={visible}
                    title='添加图书'
                    onOk={this.handleAddBookOk}
                    onCancel={this.handleAddBookCancle}
                    footer={[
                        <Button key='back' type='default' onClick={this.handleAddBookCancle}>取消</Button>,
                        <Button key='submit' type='primary' onClick={this.handleAddBookOk} loading={loading}>确定</Button>
                    ]}
                >
                    <Input id="book-name"
                        placeholder='请输入书名'
                    ></Input>
                    <InputNumber id="book-price"
                        placeholder='请输入价格'
                        value={price}
                        onChange={value => {this.changePrice(value)}}
                        formatter={value => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        parser={value => value.replace(/￥\s?|(,*)/g, '')}
                    ></InputNumber>
                    <Input id="book-article"
                        placeholder='请输入作者'
                    ></Input>
                    <Input id="book-publisher"
                        placeholder='请输入出版社'
                    ></Input>
                </Modal>
                <Modal
                    visible={visible_c}
                    title='修改图书'
                    onOk={this.handleAddBookOk_c}
                    onCancel={this.handleAddBookCancle_c}
                    footer={[
                        <Button key='back' type='default' onClick={this.handleAddBookCancle_c}>取消</Button>,
                        <Button key='submit' type='primary' onClick={this.handleAddBookOk_c} loading={loading}>确定</Button>
                    ]}
                >
                    <Input id="book-name-c"
                        placeholder='请输入书名'
                    ></Input>
                    <InputNumber id="book-price-c"
                        placeholder='请输入价格'
                        value={price}
                        onChange={value => {this.changePrice(value)}}
                        formatter={value => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        parser={value => value.replace(/￥\s?|(,*)/g, '')}
                    ></InputNumber>
                    <Input id="book-article-c"
                        placeholder='请输入作者'
                    ></Input>
                    <Input id="book-publisher-c"
                        placeholder='请输入出版社'
                    ></Input>
                    <Input id="book-id-c"
                        style={{display:'none'}}
                    ></Input>
                </Modal>
                <div id='add-book-bar'>
                    <Button type='primary' id='add-book-btn' onClick={this.handleAddBook}>添加图书</Button>
                </div>
                <Table columns={columns} dataSource={this.state.dataSource}></Table>
            </div>
        )
    }
}