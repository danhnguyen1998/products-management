import React, { Component } from "react";
import {Link} from "react-router-dom";

class ProductItem extends Component {
    onDelete = id => {
        if (confirm("Do you sure to delete this item?")) { //eslint-disable-line
            this.props.onDelete(id);
        }
    };
    render() {
        var { product, index } = this.props;
        var statusName = product.status ? "Available" : "Out of stock";
        var statusClass = product.status ? "warning" : "danger";
        return (
            <tr>
                <td>{index + 1}</td>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>
                    <span className={`badge badge-${statusClass}`}>
                        {statusName}
                    </span>
                </td>
                <td>
                    <Link to={`/product/${product.id}/edit`} className="btn btn-success mr-10">
                        Edit
                    </Link>
                    <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => this.onDelete(product.id)}
                    >
                        Delete
                    </button>
                </td>
            </tr>
        );
    }
}

export default ProductItem;
