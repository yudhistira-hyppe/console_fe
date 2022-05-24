import React, {Component} from "react";
import {Button} from "@material-ui/core";
import {Add, Remove} from "@material-ui/icons";
import PropTypes from 'prop-types';
import {render} from "react-dom";

class NumberPlusMinus extends Component{
    constructor(props) {
        super(props)
        this.state = {
            value: props.counter,
        }
    }
    onChange = (number) => {
        this.setState({value: number});
        this.props.onChange(number);
    };

    render() {
        return (
            <div className='flex flex-row border-1 align-items-center p-1 justify-content-between'
                 style={{borderRadius: '5px', borderColor: '#E0E0E0', width: '76px'}}>
                <Button variant={"text"} disabled={this.state.value == 0} onClick={event => this.onChange(this.state.value - 1)}
                        className='min-w-0 p-0'>
                    <Remove htmlColor={this.state.value == 0 ? 'gray' : 'blue'}/>
                </Button>
                <div style={{fontFamily: 'lato'}}>{this.state.value}</div>
                <Button variant={"text"} onClick={event => this.onChange(this.state.value + 1)}
                        className='min-w-0 p-0'>
                    <Add htmlColor={'blue'}/>
                </Button>
            </div>
        )
    }
}

NumberPlusMinus.propTypes = {
    counter: PropTypes.number,
    onChange: PropTypes.func.isRequired,
};
NumberPlusMinus.defaultProps = {
    counter: 0,
};

export default NumberPlusMinus;
