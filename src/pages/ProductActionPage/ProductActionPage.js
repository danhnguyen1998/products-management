import React, { Component } from "react";
import * as actions from "../../actions/index";
import { connect } from "react-redux";

class ProductActionPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            txtName: "",
            txtPrice: "",
            chkbStatus: ""
        };
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps && nextProps.itemEditing) {
            this.setState({
                id: nextProps.itemEditing.id,
                txtName: nextProps.itemEditing.name,
                txtPrice: nextProps.itemEditing.price,
                chkbStatus: nextProps.itemEditing.status
            });
        }
    }

    componentDidMount() {
        var { match } = this.props;
        if (match) {
            var id = match.params.id;
            this.props.editProduct(id);
        }
    }

    onChange = e => {
        var target = e.target;
        var name = target.name;
        var value = target.type === "checkbox" ? target.checked : target.value;
        this.setState({
            [name]: value
        });
    };

    onSave = e => {
        var { id, txtName, txtPrice, chkbStatus } = this.state;
        var { history } = this.props;
        e.preventDefault();
        var product = {
            id: id,
            name: txtName,
            price: txtPrice,
            status: chkbStatus
        };
        if (id) {
            this.props.updateProduct(product);
            history.push("/product-list");
        } else {
            this.props.addProduct(product);
            history.push("/product-list");
        }
    };

    render() {
        var { txtName, txtPrice, chkbStatus } = this.state;

        return (
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <form onSubmit={this.onSave}>
                    <div className="form-group">
                        <label>Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id=""
                            name="txtName"
                            value={txtName}
                            onChange={this.onChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Price</label>
                        <input
                            type="number"
                            className="form-control"
                            id=""
                            name="txtPrice"
                            value={txtPrice}
                            onChange={this.onChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Status</label>
                    </div>

                    <div className="checkbox">
                        <label>
                            <input
                                type="checkbox"
                                name="chkbStatus"
                                value={chkbStatus}
                                onChange={this.onChange}
                                checked={chkbStatus}
                            />
                            Available
                        </label>
                    </div>

                    <button type="submit" className="btn btn-primary">
                        Save
                    </button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return { itemEditing: state.itemEditing };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        addProduct: product => {
            dispatch(actions.actAddProductRequest(product));
        },
        editProduct: id => {
            dispatch(actions.actGetProductRequest(id));
        },
        updateProduct: product => {
            dispatch(actions.actUpdateProductRequest(product));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductActionPage);
