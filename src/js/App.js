import React from "react";
import "./app.css";

class App extends React.Component {
    state = {
        firstVal: "",
        secondVal: "",
        operator: "",
        display: "0"
    };

    resetState = (resetAll) => {
        if (resetAll) {
            this.setState({
                firstVal: "",
                secondVal: "",
                operator: "",
                display: "0"
            });
        } else {
            this.setState({
                firstVal: "",
                secondVal: "",
                operator: ""
            });
        }
    };

    hasPoint = (value) => {
        return value.indexOf(".") > -1;
    };

    setNumberValue = (value) => {
        const { firstVal, secondVal, operator } = this.state;
        const { fixNumberString, setDisplay } = this;
        let total;

        if (value === '.') {
            if (!operator && !this.hasPoint(firstVal)) {
                total = fixNumberString(firstVal + value)
                this.setState({
                    firstVal: total
                })
            }
            if (!!operator && !this.hasPoint(secondVal)) {
                total = fixNumberString(secondVal + value)
                this.setState({
                    secondVal: total
                })
            }
            if (total) {
                setDisplay(total + '')
            }
            return
        }

        if (!operator) {
            total = fixNumberString(firstVal + value)
            this.setState({
                firstVal: total
            });
        } else {
            total = fixNumberString(secondVal + value)
            this.setState({
                secondVal: total
            });
        }
        setDisplay(total + "");
    };

    setDisplay = (value) => {
        this.setState({
            display: value
        });
    };

    getCurrentTargetValue = () => {
        const { firstVal, secondVal, operator } = this.state;
        return !operator ? firstVal : secondVal;
    };

    numberClickHandler = (value) => {
        if (value) {
            this.setNumberValue(value);
        }
    };

    setOperatorValue = (operatorInput) => {
        const { firstVal, secondVal, operator, display } = this.state;
        const { fixNumberString, calculate, setDisplay } = this;

        const fixedNumber = fixNumberString(firstVal, false)

        if (firstVal && !secondVal) {
            this.setState({
                operator: operatorInput,
                display: fixedNumber
            });
        } else if (firstVal && operator && secondVal) {
            const total = calculate();
            this.setState({
                operator: operatorInput,
                firstVal: total + "",
                secondVal: ""
            });
            setDisplay(total + "");
        } else {
            this.setState({
                operator: operatorInput,
                firstVal: fixNumberString(display, false),
            });
        }
    };

    operatorClickHandler = (val) => {
        const { setOperatorValue } = this;
        const operatorInput = val;
        setOperatorValue(operatorInput);
    };

    allClear = () => {
        this.resetState(true);
    };


    // removeZeroAtStart = (value) => {
    //     return value.indexOf("0") === 0 ? value.substring(1) : value;
    // };

    fixNumberString = (value, finalize = false) => {
        if (finalize && value.indexOf('.') === value.length - 1 && value.length > 1) {
            return value + '0'
        }
        if (value.indexOf('0') === 0 && !value.indexOf('0.') === 0) {
            return value.substring(1)
        }
        if (value.indexOf('.') === 0 && value.length === 1) {
            return '0.'
        }
        if (!value) {
            return '0'
        }
        return value
    }

    calculate = () => {
        const { firstVal, secondVal, operator } = this.state;
        const {
            fixNumberString,
        } = this
        const vfirstVal = fixNumberString(firstVal, true)
        const vsecondVal = fixNumberString(secondVal, true)
        let total = "0";

        switch (operator) {
            case "-":
                total = parseFloat(vfirstVal) - parseFloat(vsecondVal);
                break;
            case "*":
                total = parseFloat(vfirstVal) * parseFloat(vsecondVal);
                break;
            case ":":
                total = parseFloat(vfirstVal) / parseFloat(vsecondVal);
                break;
            case "+":
            default:
                total = parseFloat(vfirstVal) + parseFloat(vsecondVal);
                break;
        }

        return total.toLocaleString();
    };

    equalHandler = () => {
        const { firstVal, secondVal, operator } = this.state;
        const { setDisplay, resetState, calculate } = this;

        if (firstVal && secondVal && operator) {
            let total = calculate();
            setDisplay(total + "");
            resetState();
        }
    };

    render() {
        return (
            <div>
                <div className="display-value">
                    <input type="text" value={this.state.display} />
                </div>
                <div className="key-number">
                    <input
                        type="button"
                        name="one"
                        onClick={() => this.numberClickHandler("1")}
                        value="1"
                    />
                    <input
                        type="button"
                        onClick={() => this.numberClickHandler("2")}
                        name="two"
                        value="2"
                    />
                    <input
                        type="button"
                        onClick={() => this.numberClickHandler("3")}
                        name="three"
                        value="3"
                    />
                    <input
                        type="button"
                        class="operator"
                        name="plus"
                        onClick={() => this.operatorClickHandler("+")}
                        value="+"
                    />
                    <input
                        type="button"
                        onClick={() => this.numberClickHandler("4")}
                        name="four"
                        value="4"
                    />
                    <input
                        type="button"
                        onClick={() => this.numberClickHandler("5")}
                        name="five"
                        value="5"
                    />
                    <input
                        type="button"
                        onClick={() => this.numberClickHandler("6")}
                        name="six"
                        value="6"
                    />
                    <input
                        type="button"
                        class="operator"
                        name="minus"
                        onClick={() => this.operatorClickHandler("-")}
                        value="-"
                    />
                    <input
                        type="button"
                        onClick={() => this.numberClickHandler("7")}
                        name="seven"
                        value="7"
                    />
                    <input
                        type="button"
                        onClick={() => this.numberClickHandler("8")}
                        name="eight"
                        value="8"
                    />
                    <input
                        type="button"
                        onClick={() => this.numberClickHandler("9")}
                        name="nine"
                        value="9"
                    />
                    <input
                        type="button"
                        class="operator"
                        name="times"
                        onClick={() => this.operatorClickHandler("*")}
                        value="*"
                    />
                    <input
                        type="button"
                        id="clear"
                        onClick={this.resetState}
                        name="clear"
                        value=" AC "
                    />
                    <input
                        type="button"
                        onClick={() => this.numberClickHandler("0")}
                        name="zero"
                        value="0"
                    />
                    <input
                        type="button"
                        name="doit"
                        value=" . "
                        onClick={() => this.numberClickHandler(".")}
                    />
                    <input
                        type="button"
                        class="operator"
                        onClick={() => this.operatorClickHandler("/")}
                        name="div"
                        value="/"
                    />
                    <input
                        type="button"
                        name="doit"
                        onClick={this.equalHandler}
                        value=" = "
                        class="equal"
                    />
                </div>
            </div>

        );
    }
}

export default App;
