import Calendar from 'react-calendar'
import React, {Component} from 'react'
import request from 'superagent'
import Consumption from './Consumption'
import { Link } from 'react-router-dom'

let now= new Date()

class calendar extends Component{
    state={
        locale:null,
        date: new Date(),
        maxDate: new Date(now.getUTCFullYear(), now.getUTCMonth() + 1, 15, 12),
        maxDetail: 'month',
        returnValue: 'start',
        selectRange: true,
        start:'',
        end:''
    }

    onChange = (value) => {
        let s=value[0]
        let e=value[1]
        this.setState({
            value,
            start: `${s.getFullYear()}-${s.getMonth()+1}-${s.getDate()}`,
            end: `${e.getFullYear()}-${e.getMonth()+1}-${e.getDate()}`
        })
    }

    Post = () =>{
        console.log(this.state.start, this.state.end)
        request
            .get('http://localhost:3001/api/comsumption')
            .query({
                start:this.state.start,
                end:this.state.end
            })
            .end((err,res)=>{
                if(err) throw err

            })
    }

    render(){
        return (
            <div>
                <Calendar
                    onChange={this.onChange}
                    selectRange={this.state.selectRange}
                    value={this.state.value}
                />
                <Link to={'/Consumption'}><button onClick={e=> this.Post(e)}> 조회 </button></Link>
            </div>
        )
    }
}

export default calendar