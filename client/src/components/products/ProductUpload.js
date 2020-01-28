import React from 'react'
import { Query, Mutation } from 'react-apollo';
import { CREATE_PRODUCT } from '../../graphql/mutations';
import { FETCH_CATEGORIES } from '../../graphql/queries';

class ProductUpload extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            category: "",
            description: "",
            sellerId: "testId",
            inventoryAmount: "",
            price: "",
            weight: "",
            productImageUrl: ""
        }

        this.update = this.update.bind(this);
    }

    update(field) {
        return e => {
            this.setState({ [field]: e.target.value })
        }
    }

    render() {
        return(
            <Mutation 
                mutation={CREATE_PRODUCT}
            >
                {createProduct => (
                <div>
                    <h1>List Your Product!</h1>
                    <form
                        onSubmit={e => {
                            e.preventDefault();
                            console.log(this.state);
                            //updateProductCategory 
                            createProduct({
                                variables: {
                                    name: this.state.name,
                                    description: this.state.description,
                                    sellerId: this.state.sellerId, //GET THE SELLER ID
                                    inventoryAmount: this.state.inventoryAmount,
                                    price: this.state.price,
                                    weight: this.state.weight,
                                    productImageUrl: this.state.productImageUrl
                                }
                            });
                        }}
                        >
                        <label> Name
                        <br></br>
                            <input 
                                type="text"
                                value={this.state.name}
                                onChange={this.update("name")}
                            />
                        </label>
                        <br></br>
                        <label> Category Type:
                        <br></br>
                            <Query query={FETCH_CATEGORIES}>
                                {({ loading, error, data }) => {
                                    if (loading) return <p>Loading...</p>;
                                    if (error) return <p>Error</p>;
                                    console.log(data);
                                    return data.categories.map(({ name, _id }, idx) => (
                                        <label key={idx}>{name}
                                            <input type="radio" name="category" value={_id} onChange={this.update("category")}></input>
                                            <br></br>
                                        </label>
                                    )); 
                                }}
                            </Query>
                        </label>
                        <label> Description
                        <br></br>
                            <textarea 
                                value={this.state.description} 
                                onChange={this.update("description")}
                            />
                        </label>
                        <br></br>
                        <label> InventoryAmount
                        <br></br>
                            <input 
                                type="number"
                                name="inventory"
                                value={this.state.inventoryAmount}
                                onChange={this.update("inventoryAmount")}
                                min="1" max="10000"
                            />
                        </label>
                        <br></br>
                        <label> Price 
                        <br></br>
                            <input 
                                type="text"
                                name="price"
                                value={this.state.price}
                                onChange={this.update("price")}
                            />$
                        </label>
                        <br></br>
                        <label> Weight
                        <br></br>
                            <input 
                                type="text"
                                value={this.state.weight}
                                onChange={this.update("weight")}
                            />lb
                        </label>
                        <br></br>
                        <label> Product Image
                        <br></br>
                            <input 
                                type="file"
                                value={this.state.productImageUrl}
                                onChange={this.update("productImageUrl")}
                            /> 
                        </label>
                        <button type="submit">List Your Product!</button>
                    </form>
                </div>
                )}
            </Mutation>
        )
    }
}

export default ProductUpload;