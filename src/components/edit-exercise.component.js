import React, {Component} from "react";
import DataPicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

export default class EditExercise extends Component {
    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeData = this.onChangeData.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            description: '',
            duration: '',
            data: new Date(),
            users: []
        }
    }

    // return users from the db
    componentDidMount() {
        axios.get('http://localhost:5000/exercises/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    username: response.data.username,
                    description: response.data.description,
                    duration: response.data.duration,
                    data: new Date(response.data.data)
                })
            })
            .catch(function (error) {
                console.log(error)
            })

        axios.get('http://localhost:5000/users/')
            .then(response => {
                if (response.data.length > 0) {
                    this.setState({
                        users: response.data.map(user => user.username),

                    })
                }
            })

    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        })
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        })
    }

    onChangeData(date) {
        this.setState({
            data: date
        })
    }

    onSubmit(e) {
        e.preventDefault()

        const exercise = {
            username: this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            data: this.state.data
        }
        console.log(exercise);

        axios.post('http://localhost:5000/exercises/updata'+this.props.match.params.id, exercise)
            .then(res => {
                if (res.status === 200) {
                    console.log(res)
                }
            })
            .catch(err => {
                if (err.request) {
                    console.log(err.request)
                }
                if (err.response) {
                    console.log(err.response)
                }
            });

        window.location = '/';
    }

    onChangeDuration(e) {
        this.setState({
            duration: e.target.value
        })
    }

    render() {
        return (
            <div>
                <h3>Edit  Exercise Log</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username:</label>
                        <select ref="userInput" required className="form-control" value={this.state.username}
                                onChange={this.onChangeUsername}>
                            {
                                this.state.users.map(function (user) {
                                    return <option key={user} value={user}>{user}</option>
                                })
                            }
                        </select>
                    </div>
                    <div className="form-group">
                        <label> Description:</label>
                        <input type="text" required className="form-control" value={this.state.description}
                               onChange={this.onChangeDescription}/>
                    </div>
                    <div className="form-group">
                        <label> Duration (in Mins) :</label>
                        <input type="text" required className="form-control" value={this.state.duration}
                               onChange={this.onChangeDuration}/>
                    </div>
                    <div className="form-group">
                        <label> Data :</label>
                        <div><DataPicker selected={this.state.data} onChange={this.onChangeData}/></div>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Edit Exe Log" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}