import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'

//import components
import UploadImg from './UploadImg'
import LeftNav from '../LeftNav';
import { updateBio } from '../../actions/user.action';
import { dateParser } from '../utils';

const UpdateProfil = () => {
    const [bio, setBio] = useState('');
    const [updateForm, setUpdateForm] = useState(false)
    const [pictureVersion, setPictureVersion] = useState(0)
    const userData = useSelector((state) => state.userReducer)
    const dispatch = useDispatch();

    const handleUpdate = () => {
        dispatch(updateBio(userData._id, bio));
        setUpdateForm(false)
        

    }

    useEffect(() => {
        if (userData.picture) setPictureVersion((v) => v + 1);
    }, [userData.picture]);

    return (
        <div className='profil-container'>
            <LeftNav />
            <h1>Profil de {userData.pseudo}</h1>
            <div className='update-container'>
                <div className='left-part'>
                    <h3>Photo De Profil</h3>
                    <img
                        src={
                            userData.picture
                                ? `${process.env.REACT_APP_API_URL}${userData.picture.replace("./", "")}?v=${pictureVersion}`
                                : ""
                        }
                        alt="user-Photo"
                    />
                    <UploadImg />

                </div>
                <div className='right-part'>
                    <div className='bio-update'>
                        <h3>Ma Bio</h3>
                        {updateForm === false && (
                            <>
                                <p onClick={() => setUpdateForm(!updateForm)}>{userData.bio}</p>
                                <button onClick={() => setUpdateForm(!updateForm)}>Modifier Ma Bio</button>
                            </>
                        )}
                        {updateForm && (
                            <>
                                <textarea
                                    typeof='text'
                                    defaultValue={userData.bio}
                                    onChange={(e) => setBio(e.target.value)}>
                                </textarea>
                                <button onClick={handleUpdate}>Valider Ma Modification</button>
                            </>
                        )}
                    </div>
                    <h4>Membre Depuis Le {dateParser(userData.createdAt)}</h4>
                </div>
            </div>

        </div>
    )
}

export default UpdateProfil