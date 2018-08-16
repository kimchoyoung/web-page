import React, {Component} from 'react'
import request from 'superagent'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'


class ObjTime extends Component {
    constructor(props){
        super(props)
        this.state={
            items: []
        }
    }

    componentWillMount(){
        request
            .get('http://localhost:3001/api/getData')
            .end((err,res)=>{
                if(err){
                    console.log(err)
                    console.log("ERROR !!")
                    return
                }
                console.log("res:" +res.body);
                this.setState({items: res.body})
            })
    }

    render(){
        const itemsHtml= this.state.items.map(e=>(
            <tr>
                <Link to={'/EditForm/'+e.obj_id}><td>{e.name}</td></Link>
                <td> {e.start_time}</td>
                <td> {e.end_time}</td>
            </tr>
        ))
        return (
            <div>
                <table>
                    <thead><h1 style={styles.h1}> <tr><td colSpan="2"> 기기별 예약시간 </td></tr></h1></thead>
                    <tbody><tr><td>Object</td><td>Start</td><td>End</td></tr>
                    {itemsHtml}
                    </tbody>
                </table>
            </div>
        )

    }
}
const styles={
    h1: {
        color: 'blue',
        fontSize: 24,
        padding:12
    }
}


export default ObjTime
