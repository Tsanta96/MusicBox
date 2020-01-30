import React from 'react'
import { Query, Mutation, ApolloConsumer } from 'react-apollo';
import { CREATE_PRODUCT } from '../../graphql/mutations';
import { FETCH_CATEGORIES, FETCH_USER } from '../../graphql/queries';
import '../../stylesheets/product_index.scss';

class ProductUpload extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            category: "",
            description: "",
            inventoryAmount: 0,
            price: 0,
            weight: 0,
            imageUrl: "",
            errors: []
        }

        this.update = this.update.bind(this);
        this.checkErrors = this.checkErrors.bind(this);
        this.renderErrors = this.renderErrors.bind(this);
    }

    checkErrors(){
        let errorIndices = [];
        Object.values(this.state).slice(0,6).forEach((val, idx) => {
            if (val === "" || val === 0) errorIndices.push(idx);
        });
        return errorIndices;
    }

    renderErrors(errorIndices) {
        if (errorIndices === []) {
            return (
                <div></div>
            )
        } else {
            const stateArr = Object.keys(this.state);
            const errors = errorIndices.map(idx => stateArr[idx].toString() + ' field cannot be blank');
            this.setState({ errors: errors });
        }
    }

    update(field) {
        return e => {
            if (field === "inventoryAmount" || field === "weight" || field === "price") {
                const int = parseInt(e.target.value, 10);
                this.setState({ [field]: int})
            } else {
                this.setState({ [field]: e.target.value })
            }
        }
    }

    render() {
        return(
            <ApolloConsumer> 
                { cache => { 
                    const user = cache.readQuery({ query: FETCH_USER });
                    if (!user) return <div>Loading...</div>
                    
                    return (
                        <Mutation 
                            mutation={CREATE_PRODUCT}
                        >
                        {createProduct => (
                        <div>
                            <h1 className="list-your-product">List Your Product!</h1>
                            <div className="product-upload-form-container">
                                <form
                                    onSubmit={e => {
                                        e.preventDefault();
                                        const errorIndices = this.checkErrors();
                                        console.log("errorIndices", errorIndices);
                                        if (errorIndices.length > 0){
                                            this.renderErrors(errorIndices)
                                        } else {
                                            //updteProductCategory 
                                            createProduct({
                                                variables: {
                                                    name: this.state.name,
                                                    description: this.state.description,
                                                    category: this.state.category,
                                                    seller: user.currentUser,
                                                    inventoryAmount: this.state.inventoryAmount,
                                                    price: this.state.price,
                                                    weight: this.state.weight,
                                                    imageUrl: this.state.imageUrl
                                                }
                                            });
                                        }
                                    }}
                                >   
                                    <div className="left-and-right-side-upload">
                                        <div className="left-side-upload">
                                            <div className="left-side-upload-inner-content">
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
                                                    <Query query={FETCH_CATEGORIES}
                                                    onCompleted={data => {
                                                        console.log("DATA", data);
                                                        this.setState({ category: data.categories[0]._id })}
                                                    }
                                                    >
                                                        {({ loading, error, data }) => {
                                                            if (loading) return <p>Loading...</p>;
                                                            if (error) return <p>Error</p>;
                                                            return (
                                                                <div>
                                                                    <select onChange={this.update("category")}>
                                                                        {data.categories.map(({ name, _id }, idx) => (
                                                                            <option key={idx} name="category" value={_id}>{name}</option>
                                                                        ))}
                                                                    </select>
                                                                </div>
                                                            )
                                                        }
                                                    }
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
                                                        min={1} max={10000}
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
                                                    /> $
                                                </label>
                                                <br></br>
                                                <label> Weight
                                                <br></br>
                                                    <input 
                                                        type="text"
                                                        value={this.state.weight}
                                                        onChange={this.update("weight")}
                                                    /> lb
                                                </label>
                                                <br></br>
                                            </div>
                                        </div>
                                        <div className="right-side-upload-and-upload-button">
                                            <div className="right-side-upload">
                                                <div className="right-side-upload-inner-content">
                                                    <label> Product Image
                                                    <br></br>
                                                        <input 
                                                            type="file"
                                                            value={this.state.imageUrl}
                                                            onChange={this.update("imageUrl")}
                                                        /> 
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="upload-button">
                                                <button type="submit">List It!</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <ul>
                                            {this.state.errors.map((error, idx) => (
                                                <li key={idx}>
                                                    <p>{error}</p>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </form>
                            </div>
                        </div>
                        )}
                    </Mutation>
                    )}}
            </ApolloConsumer>
        )
    }
}

export default ProductUpload;