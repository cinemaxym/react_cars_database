import React from 'react' //imports React
import Button from 'react-bootstrap/Button' //Imports Button component 
import Form from 'react-bootstrap/Form' //Imports Form component 
import Card from 'react-bootstrap/Card'; //Imports Card component 
import '../styles/carsStyle.css' //imports styles

class Cars extends React.Component {
    constructor(props) {
        super(props);
        // Set the initial state of the component
        this.state = {
            cars: [],
            inputCarMake: "",
            inputCarModel: "",
            inputCarYear: "",
            inputCarNumber: "",
            inputCarOwner: "",
            inputCarId: "",
            carEdit: false
        }
        // Bind "this" to the class methods, so they can access state and props
        this.displayCars = this.displayCars.bind(this)
        this.displayOlderCars = this.displayOlderCars.bind(this)
        this.handleCarInput = this.handleCarInput.bind(this)
        this.addCar = this.addCar.bind(this)
        this.deleteCar = this.deleteCar.bind(this)
        this.updateCarHandle = this.updateCarHandle.bind(this)
        this.updateCar = this.updateCar.bind(this)
        this.updateCars = this.updateCars.bind(this)
    }
    // After the component mounts, display the cars from the server
    componentDidMount() {
        this.displayCars()
    }
    // Fetch cars from the server and update the state with the data
    displayCars() {
        fetch('/api/cars')
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                this.setState({ cars: data });
            }, (err) => {
                console.log(err)
            });
    }
    // Fetch older cars from the server and update the state with the data
    displayOlderCars() {
        fetch('/api/cars/older')
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                this.setState({ cars: data });
            }, (err) => {
                console.log(err)
            });
    }

    // Send a POST request to the server to add a new car
    addCar() {
        let car = {
            make: this.state.inputCarMake,
            model: this.state.inputCarModel,
            year: this.state.inputCarYear,
            number: this.state.inputCarNumber,
            owner: this.state.inputCarOwner
        }
        fetch('/api/cars', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(car)
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
            }, (err) => {
                console.log(err)
            });

        // After adding the car, refresh the displayed cars
        this.displayCars()
    }

    // Event hahdler updates the appropriate input field in state as the user types
    handleCarInput(e) {
        const input = e.target.id
        if (input === "input1") {
            this.setState({
                inputCarMake: e.target.value
            })
        } else if (input === "input2") {
            this.setState({
                inputCarModel: e.target.value
            })
        } else if (input === "input3") {
            this.setState({
                inputCarYear: e.target.value
            })
        } else if (input === "input4") {
            this.setState({
                inputCarNumber: e.target.value
            })
        } else {
            this.setState({
                inputCarOwner: e.target.value
            })
        }
    }

    // Send a DELETE request to the server to delete the particular car document
    deleteCar(e) {
        let id = e.target.id
        fetch('/api/cars', {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id })
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
            }, (err) => {
                console.log(err)
            });

        // After deleting the project, refresh the displayed projects
        this.displayCars()
    }
    // Update the state of the component with the data of the selected car
    updateCarHandle(e) {
        const car = this.state.cars // Get the array of cars from the component state
        this.setState({  // Update the info of the selected car in the input field
            inputCarMake: car[e.target.value].make,
            inputCarModel: car[e.target.value].model,
            inputCarYear: car[e.target.value].year,
            inputCarNumber: car[e.target.value].number,
            inputCarOwner: car[e.target.value].owner,
            inputCarId: car[e.target.value]._id
        })
    }
    //update an existing car document with new data.
    updateCar() {
        // Create a new car object with the updated data
        let car = {
            id: this.state.inputCarId,
            make: this.state.inputCarMake,
            model: this.state.inputCarModel,
            year: this.state.inputCarYear,
            number: this.state.inputCarNumber,
            owner: this.state.inputCarOwner
        }
        this.setState({
            carEdit: true
        })
         // Send a PUT request to the server to update the car
        fetch('/api/cars', {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(car)
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
            }, (err) => {
                console.log(err)
            });

        // After adding the car, refresh the displayed cars
        this.displayCars()
    }
    // This function is triggered when the user click check or uncheck button
    updateCars(e) {
        let checked = e.target.value // Get the value of the button
        // Send a PUT request to the server to update the "checked" status of the car
        fetch('/api/cars/checked', {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({checked})
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
            }, (err) => {
                console.log(err)
            });

        // After updating the checked status of the car, refresh the displayed cars
        this.displayCars()
    }
    
    render() {
        return (
            <div>
                <h1>Cars Database</h1>
                <div className='main-container'>
                    <section>
                        {/* Map over the cars array and create a Card for each car */}
                        {this.state.cars.map((car, id) => (
                            <Card style={{ width: '13rem' }} className="car-container" key={car._id}>
                                <div> <b>Make:</b>  {car.make}</div>
                                <div> <b>Model:</b>  {car.model}</div>
                                <div> <b>Year:</b>  {car.year}</div>
                                <div> <b>Number:</b>  {car.number}</div>
                                <div> <b>Owner:</b>  {car.owner}</div>
                                {/* Display whether the car is checked or unchecked */}
                                <div>{car.checked ? "Checked" : "Unchecked"}</div>
                                {/* Add a delete button for the car */}
                                <Button variant="outline-danger" className="btn" type="button" size="sm" id={car._id} onClick={this.deleteCar} >Delete</Button>
                                {/* Add an edit button for the car */}
                                <Button variant="outline-danger" className="btn" type="button" size="sm" id={car._id} value={id} onClick={this.updateCarHandle} >Edit</Button>
                            </Card>
                        ))}
                    </section>
                    <aside>
                        <div className="form-container">
                            {/* Add inputs for the car's make, model, year, number, and owner */}
                            <Form.Control type="text" id="input1" placeholder="Make" value={this.state.inputCarMake} onChange={this.handleCarInput} /><br />
                            <Form.Control type="text" id="input2" placeholder="Model" value={this.state.inputCarModel} onChange={this.handleCarInput} /><br />
                            <Form.Control type="number" id="input3" placeholder="Year" value={this.state.inputCarYear} onChange={this.handleCarInput} /><br />
                            <Form.Control type="text" id="input4" placeholder="Number" value={this.state.inputCarNumber} onChange={this.handleCarInput} /><br />
                            <Form.Control type="text" id="input5" placeholder="Owner" value={this.state.inputCarOwner} onChange={this.handleCarInput} /><br />
                            <br />
                            {/* Add buttons to add or update a car */}
                            <Button variant="outline-primary" className="btn" type="button" onClick={this.addCar}>Add Car</Button>{' '}
                            {this.state.carEdit?
                            <Button variant="outline-primary" className="btn" type="button" onClick={this.updateCar} >Update One</Button>:
                            ""}{' '}
                            <br />
                        </div>
                        <div className="form-container">
                            {/* Add buttons to check or uncheck all cars */}
                            <h4>Mark as Checked</h4>
                            <Button variant="outline-primary" className="btn" type="button" value={true} onClick={this.updateCars} >Check All</Button>{' '}
                            <Button variant="outline-primary" className="btn" type="button" value={false} onClick={this.updateCars} >Uncheck All</Button>{' '}
                        </div>
                        <div className="form-container">
                            {/* Add buttons to display all cars or only cars older than 5 years */}
                            <h4>Display</h4>
                            <Button variant="outline-primary" className="btn" type="button" onClick={this.displayCars} >All</Button>{' '}
                            <Button variant="outline-primary" className="btn" type="button" onClick={this.displayOlderCars} >Older than 5 years</Button>{' '}
                        </div>
                    </aside>
                </div>
            </div>
        )
    }
}

export default Cars; //exports Cars component