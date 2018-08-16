import React, {Component} from 'react'
import request from 'superagent'

class Monitoring extends Component{
    constructor(props){
        super(props)
        this.state={
            items:[],
            OnOff: 'On'
        }
    }

    componentWillMount(){
        request
            .get('http://localhost:3001/api/Monitoring')
            .end((err,res)=>{
                if(err){
                    console.log(err)
                    return
                }
                console.log("res:" +res.body);
                this.setState({items: res.body})
            })
    }

    OnOffChange(e){
        if(this.state.OnOff==='On')
            this.setState({OnOff: 'Off'})
        else
            this.setState({OnOff: 'On'})
    }


    render(){
        const itemsHtml= this.state.items.map(e=>(
            <tr>
                <td> {e.name}</td>
                <td> {e.start_time}</td>
                <td> {e.end_time}</td>
                <td> <button onClick={e=> this.OnOffChange(e)}> {this.state.OnOff} </button></td>
            </tr>
        ))
        return (
            <div>
                <table>
                    <tr><td colSpan="2"> 현재 동작되는 기기들</td></tr><br />
                    <tr><td> Object </td><td> Start </td><td> End </td></tr>
                    {itemsHtml}
                </table>
            </div>
        )
    }
}

export default Monitoring