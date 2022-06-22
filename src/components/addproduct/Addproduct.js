import { faCamera } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../utiles/firbase";
import Alert from '../../utiles/alert/Alert'
import './addproduct.css'

const Addproduct = ({ id = '', Name = "", Price = "", Description = "", Image = '/avatar.png', update = false }) => {

    const [image, setimage] = useState(Image)
    const [dataimage, setdataimage] = useState('')
    const [urlimage, setUrleimage] = useState('')
    const [prog, setProgress] = useState(0)

    const [name, setname] = useState(Name)
    const [price, setprice] = useState(Price)
    const [description, setdescription] = useState(Description)

    const access = useSelector((state) => state.user.access)
    const [response, setresponse] = useState({ type: "", message: "", isExist: false })


    const handleimage = (e) => {
        setimage(URL.createObjectURL(e.target.files[0]))
        setdataimage(e.target.files[0])
    }

    const handleName = (e) => {
        name.length < 50 && setname(e.target.value)
    }

    const handlePrice = (e) => {
        setprice(e.target.value)
    }

    const handledescription = (e) => {
        description.length < 200 && setdescription(e.target.value)
    }

    const handlSubmit = (e) => {
        e.preventDefault()
        const fetch_url = update
            ? `https://imade-store.herokuapp.com/products/edit/${id}/`
            : `https://imade-store.herokuapp.com/products/addproduct/`
        const method = update
            ? "PUT"
            : "POST"


        const upload_data = {}
        upload_data['name'] = name
        upload_data['price'] = price
        upload_data['description'] = description
        if (urlimage !== '') {
            upload_data['image'] = urlimage
        }


        try {
            const products = async () => {
                const data = await fetch(fetch_url, {
                    method: method,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + access,

                    },
                    body: JSON.stringify(upload_data)
                })
                if (data.status === 201) window.location.reload(true)
                else setresponse({ type: "error", message: "failed to add new product , please try again!!", isExist: true })
            }
            products()
        } catch (err) {
            setresponse({ type: "error", message: "failed to add new product , please try again!!", isExist: true })
        }

    }

    const uploadimage = () => {

        if (!dataimage) return;
        const sotrageRef = ref(storage, `files/${dataimage.name}`);
        const uploadTask = uploadBytesResumable(sotrageRef, dataimage);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const prog = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(prog);
            },
            (error) => setresponse({ type: "error", message: "failed to upload image", isExist: true }),
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setUrleimage(downloadURL);
                });
            }
        );
    }

    return (
        <div className='add-product'>
            <form onSubmit={handlSubmit} >
                <input
                    type="text"
                    placeholder='product name'
                    required
                    value={name}
                    onChange={handleName}
                />

                <input
                    type="text"
                    placeholder='price'
                    required
                    value={price}
                    onChange={handlePrice}
                />

                <textarea
                    type="text"
                    placeholder='description'
                    required
                    value={description}
                    onChange={handledescription}
                />
                <div className='hanle-image'  >
                    <div className='container-btn'>
                        <button className='custome-btn' >
                            <FontAwesomeIcon icon={faCamera} />
                            <input
                                onChange={(e) => handleimage(e)}
                                type="file"
                                placeholder='image'
                                required={!update}
                            />
                        </button>
                    </div>
                    <div
                        className='add-product-image'
                        style={{ backgroundImage: `url(${image})` }}>
                    </div>
                </div>

                <div className='upload-image'>
                    <div
                        className={urlimage ? 'disabled' : 'botton'} onClick={uploadimage}>
                        Upload image
                    </div>
                    <span className='progress'>
                        {
                            (prog > 0 && prog < 100) &&
                            <div>
                                <span className='progress-text'>{prog} %</span>
                                <progress max="100" value={prog}></progress>
                            </div>
                        }
                    </span>
                </div>
                <div className='sub'>
                    <button
                        type='submit'
                        className={(dataimage && !urlimage) ? 'disabled2' : "sub-button"}>
                        {update ? "update Product" : "add Product"}
                    </button>
                </div>
            </form >
            {response.isExist && <Alert setresponse={setresponse} response={response} />}
        </div>
    )
}

export default Addproduct



