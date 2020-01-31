import React, { useState, useEffect } from 'react';
import axios from 'axios';
import uuidv1 from 'uuid/v1';
import { Query, Mutation, ApolloConsumer, useMutation } from 'react-apollo';
import { CREATE_PRODUCT, CREATE_PHOTO, S3_SIGN } from '../../graphql/mutations';
import { FETCH_CATEGORIES, FETCH_USER } from '../../graphql/queries';
import Dropzone from 'react-dropzone';
import '../../stylesheets/product_upload.scss';

function ProductUpload() {
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [inventoryAmount, setInventoryAmount] = useState(0);
    const [price, setPrice] = useState(0);
    const [weight, setWeight] = useState(0)
    const [imageUrl, setImageUrl] = useState("");
    const [errors, setErrors] = useState([]);
    const [photo, setPhoto] = useState(null);
    const [awsUrl, setAwsUrl] = useState("");
    let state = [name, category, description, inventoryAmount, price, weight, imageUrl, awsUrl];
    const stateFields = ["Name", "Category", "Description", "InventoryAmount", "Price", "Weight", "Image", "AWSUrl"];

    const [s3Sign, { s3SignData }] = useMutation(S3_SIGN);
    const [createPhoto, { createPhotoData }] = useMutation(CREATE_PHOTO);

    const setState = () => {
        state = [name, category, description, parseInt(inventoryAmount, 10), parseInt(price, 10), parseInt(weight, 10), imageUrl];
        return state;
    }

    useEffect(() => {
        if (imageUrl.includes("https://musicbox-products.s3.amazonaws.com")){
           console.log("In useEffect", setState());
        }
    }, [imageUrl]);

    const checkErrors = () => {
        let errorIndices = [];
        setState();
        state.forEach((val, idx) => {
            if (val === "" || val === 0) errorIndices.push(idx);
        });
        console.log(errorIndices);
        return errorIndices;
    }

    const renderErrors = (errorIndices) => {
        if (errorIndices === []) {
            return (
                <div></div>
            )
        } else {
            setState();
            const errors = errorIndices.map(idx => stateFields[idx] + ' field cannot be blank');
            setErrors(errors);
        }
    }

    const update = field => {
        return e => {
            switch(field){
                case "name":
                    setName(e.target.value)
                    break;
                case "category":
                    setCategory(e.target.value)
                    break;
                case "description":
                    setDescription(e.target.value)
                    break;
                case "inventoryAmount":
                    setInventoryAmount(parseInt(e.target.value, 10))
                    break;
                case "price":
                    if (e.target.value === "") {
                        setPrice(0)
                    } else {
                        setPrice(parseInt(e.target.value, 10))
                    }
                    break;
                case "weight":
                    if (e.target.value === "") {
                        setWeight(0)
                    } else {
                        setWeight(parseInt(e.target.value, 10))
                    }
                    break;
                case "imageUrl":
                    setImageUrl(e.target.value)
                    break;
               }
        }
    }

    const onDrop = async (files) => {
        setPhoto(files[0]);
        setImageUrl(files[0].name);
        // uploadFile();
    };

    const uploadToS3 = async (photo, signedRequest) => {
        const options = {
          headers: {
            "Content-Type": photo.type,
            'Access-Control-Allow-Origin': '*'
          }
        };
        await axios.put(signedRequest, photo, options);
      };

    const uniqueName = () => {
        const randString = uuidv1();
        return String(randString);
    }

    const uploadFile = async () => {
        const response = await s3Sign({ 
            variables: {
                filename: photo.name,
                filetype: photo.type
            } 
        })

        const { signedRequest, url } = response.data.signS3;

        // await updateImageState(url);

        console.log("AWS url: ", url);

        setAwsUrl(url);

        await uploadToS3(photo, signedRequest);

        console.log(setState());

        return setState();
    }

    // const updateImageState = async (url) => {
    //     await setImageUrl(url);
    // }

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
                                    // setState();
                                    const errorIndices = checkErrors();
                                    console.log("errorIndices", errorIndices);
                                    if (errorIndices.length > 0){
                                        renderErrors(errorIndices)
                                    } else { 
                                        uploadFile().then(() => {
                                        debugger;
                                        createProduct({
                                            variables: {
                                                name: name,
                                                description: description,
                                                category: category,
                                                seller: user.currentUser,
                                                inventoryAmount: inventoryAmount,
                                                price: price,
                                                weight: weight,
                                                imageUrl: awsUrl
                                            }
                                        });
                                    })
                                }}}
                            >   
                                <div className="left-and-right-side-upload">
                                    <div className="left-side-upload">
                                        <div className="left-side-upload-inner-content">
                                            <label> Name
                                            <br></br>
                                                <input 
                                                    type="text"
                                                    value={name}
                                                    onChange={update("name")}
                                                />
                                            </label>
                                            <br></br>
                                            <label> Category Type:
                                            <br></br>
                                                <Query query={FETCH_CATEGORIES}
                                                onCompleted={data => {
                                                    console.log("DATA", data);
                                                    setCategory( data.categories[0]._id )
                                                }}
                                                >
                                                    {({ loading, error, data }) => {
                                                        if (loading) return <p>Loading...</p>;
                                                        if (error) return <p>Error</p>;
                                                        return (
                                                            <div>
                                                                <select onChange={update("category")}>
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
                                                    value={description} 
                                                    onChange={update("description")}
                                                />
                                            </label>
                                            <br></br>
                                            <label> InventoryAmount
                                            <br></br>
                                                <input 
                                                    type="number"
                                                    name="inventory"
                                                    value={inventoryAmount}
                                                    onChange={update("inventoryAmount")}
                                                    min={1} max={10000}
                                                />
                                            </label>
                                            <br></br>
                                            <label> Price 
                                            <br></br>
                                                <input 
                                                    type="text"
                                                    name="price"
                                                    value={price}
                                                    onChange={update("price")}
                                                /> $
                                            </label>
                                            <br></br>
                                            <label> Weight
                                            <br></br>
                                                <input 
                                                    type="text"
                                                    value={weight}
                                                    onChange={update("weight")}
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
                                                    <div className="dropzone">
                                                        <Dropzone onDrop={onDrop}>
                                                            {({getRootProps, getInputProps}) => (
                                                                <div {...getRootProps()}>
                                                                    <input {...getInputProps()} />
                                                                    <p>Drag 'n' drop some files here, or click to select files</p>
                                                                </div>
                                                            )}
                                                        </Dropzone>
                                                        {/* <p>{imageUrl}</p> */}
                                                    </div>
                                                </label>
                                            </div>
                                        </div>
                                        <div className="product-upload-errors-and-upload-button">
                                            <div>
                                                <ul className="product-upload-errors">
                                                    {errors.map((error, idx) => (
                                                        <li key={idx}>
                                                            <p>- {error}</p>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <div className="upload-button">
                                                <button type="submit">List It!</button>
                                            </div>
                                        </div>
                                    </div>
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

export default ProductUpload;