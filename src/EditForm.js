import React from 'react'
import request from 'superagent'

class EditForm extends React.Component{
    constructor (props){
        super(props)
        const params = this.props.match.params.obj_id
        console.log(params)

        this.state={
            obj:params,
            start:'',
            end:''
        }
    }

    nameChanged (e){
        this.setState({obj: e.target.value})
    }

    startChanged (e){
        this.setState({start: e.target.value})
    }

    endChanged (e){
        this.setState({end: e.target.value})
    }

    post(e){
        request
            .get('http://localhost:3001/api/write')
            .query({
                obj: this.state.obj,
                start: this.state.start,
                end: this.state.end
            })
            .end((err,data)=>{
                if(err) console.log(err)
                this.setState({body:''})
                if(this.props.onPost){
                    this.props.onPost()
                }
            })
    }

    render() {

        return (
            <div>
                Object ID: <br />
                <input type='text' value={this.state.obj}
                       onChange={e=> this.nameChanged(e)} /><br />
                Start Time: <br />
                <input type='text' value={this.state.start} size='60'
                       onChange={e=>this.startChanged(e) } /> <br />
                END Time: <br />
                <input type='text' value={this.state.end} size='60'
                       onChange={e=>this.endChanged(e) } /> <br />
                <button onClick={e=> this.post()} > 수정 </button>
            </div>
        )
    }
}

export default EditForm