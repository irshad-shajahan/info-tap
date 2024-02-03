import { Button, Input, Spinner, Switch, Textarea } from '@nextui-org/react';
import React, { useState } from 'react';
import { BsCheckAll } from 'react-icons/bs';
import Datepicker from 'react-tailwindcss-datepicker';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAddMemberMutation } from '../../redux/features/api/apiSlice';
import { useNavigate } from 'react-router-dom';

function AddMember() {
    const [loading, Setloading] = useState(false)
    const navigate = useNavigate()
    const [AddMember, actions] = useAddMemberMutation()
    const [value, setValue] = useState({
        startDate: null,
        endDate: null,
    });
    const [profileImage, setImage] = useState('')
    const [formData, setFormData] = useState({
        name: '',
        role: '',
        address: '',
        contactNumber: '',
        emergencyContactNumber: '',
        isModerator: false,
        email: '',
        age: '',
        dob: '',
        isWfh: false,
        officialMail: '',
        igProfileLink: '',
        linkedInProfileLink: '',
    });
    const handleValueChange = (newValue) => {
        if (newValue) {
            const today = new Date();
            const birthDate = new Date(newValue.startDate);
            const ageDiff = today - birthDate;
            const ageDate = new Date(ageDiff);
            const age = Math.abs(ageDate.getUTCFullYear() - 1970);

            setFormData({
                ...formData,
                age: age, // Update the age property
                dob: newValue.startDate,
            });
        } else {
            setFormData({
                ...formData,
                age: '', // Clear the age if there is no date of birth
            });
        }
        setValue(newValue);
        // setFormData({
        //     ...formData,
        //     dob: newValue.startDate,
        // });

    };

    //upload image to cloudinary
    const handleImageUpload = (event) => {
        Setloading(true)
        const file = event.target.files[0];
        console.log('image upload called');
        const formData = new FormData()
        formData.append("file", file)
        formData.append("upload_preset", "info-tap")
        formData.append("cloud_name", "dbpxhm5vt")
        axios.post("https://api.cloudinary.com/v1_1/dbpxhm5vt/image/upload", formData).then((res) => {
            console.log(res.data.secure_url);
            setImage(res.data.secure_url);
            toast.success('Image succesfully updated')
            Setloading(false)
        }).catch((err) => {
            toast.error('Error while uploading image')
            console.log(err);
            Setloading(false)
        })
    };
        const handleInputChange = (e) => {
            const { name, value } = e.target;
            setFormData({
                ...formData,
                [name]: value,
            });
        };

    // Function to handle form submission
    const handleSubmit = async () => {
        if (!actions.isLoading) {
            AddMember({ ...formData, profileImage }).then((res) => {
                toast.info(res.data.msg)
                navigate('/admin/members')
            }).catch((err) => {
                toast.info('Something went wrong')
                console.log(err);
            })
        }
    };
    const handleWFHToggle = () => {
        setFormData({
            ...formData,
            isWfh: !formData.isWfh, // Toggle the 'wfh' property
        });
    };
    const handlModToggle = () => {
        setFormData({
            ...formData,
            isModerator: !formData.isModerator, // Toggle the 'wfh' property
        });
    };

    return (
        <div className='font-readex p-5 h-screen'>
            <h1 className='text-5xl ml-10'>Add Member</h1>
            <div className='flex mt-10 w-full justify-between items-center h-[80%] px-10'>
                <div className='flex flex-col w-[30%] gap-5'>
                    <Input label='Name' name='name' onChange={handleInputChange} value={formData.name} />
                    <Input label='Role' name='role' onChange={handleInputChange} value={formData.role} />
                    <Textarea label='Address' name='address' onChange={handleInputChange} value={formData.address} />
                    <Input label='Contact Number' name='contactNumber' onChange={handleInputChange} value={formData.contactNumber} />
                    <Input label='Emergency Contact Number' name='emergencyContactNumber' onChange={handleInputChange} value={formData.emergencyContactNumber} />
                    <div onClick={handleWFHToggle} className={`border cursor-pointer border-gray-700 rounded-xl flex bg-opacity-50 duration-200 ease-linear h-24 ${formData.isWfh ? 'bg-blue-500' : 'bg-yellow-500'} pl-5 relative items-center`}>
                        <h1 className='text-xl flex items-center gap-3'>The selected employeee is <span className='uppercase text-4xl'>{formData.isWfh ? 'wfh' : 'wfo'}</span></h1>
                        <Switch name='wfh' onChange={handleWFHToggle} isSelected={formData.isWfh} className='absolute right-1 top-1'>
                        </Switch>
                    </div>
                </div>
                <div className='flex flex-col gap-5 w-[30%]'>
                    <p className='-mb-2'>Date Of Birth</p>
                    <Datepicker containerClassName={'relative z-20'} primaryColor={'fuchsia'} asSingle={true} value={value} onChange={handleValueChange} />
                    <h1>Age: <span className={`${formData.age >= 18 ? 'text-green-500' : 'text-red-500'}`}>{formData.age}</span></h1>
                    <Input label='Email' name='email' onChange={handleInputChange} value={formData.email} />
                    <Input label='Official Mail' name='officialMail' onChange={handleInputChange} value={formData.officialMail} />
                    <Input label='IG Profile Link' name='igProfileLink' onChange={handleInputChange} value={formData.igProfileLink} />
                    <Input label='LinkedIn Profile Link' name='linkedInProfileLink' onChange={handleInputChange} value={formData.linkedInProfileLink} />
                    <div onClick={handlModToggle} className={`border cursor-pointer border-gray-700 rounded-xl flex bg-opacity-50 h-24 duration-200 ease-linear ${formData.isModerator ? 'bg-green-500' : 'bg-gray-500'} pl-5 relative items-center`}>
                        <h1 className='text-xl flex items-center gap-3'>The employeee is <span className='uppercase text-xl'>{formData.isModerator ? 'a Moderator' : 'not a Moderator'}</span></h1>
                        <Switch onChange={handlModToggle} className='absolute right-1 top-1' isSelected={formData.isModerator}>
                        </Switch>
                    </div>
                </div>
                <div className='flex flex-col items-center gap-5 justify-end h-[65vh] w-[30%]'>
                    {loading ? <Spinner /> : false}
                    <img src={profileImage} alt='Profile Image' className={`object-cover max-h-[15rem] ${profileImage ? 'block' : 'hidden'}`} />
                    <p>Profile Image</p>
                    <input type='file' onChange={handleImageUpload} accept='image/*' className='w-full' />
                    <Button disabled={loading} className='bg-green-500 w-full' endContent={<BsCheckAll />} onClick={handleSubmit}>
                        Save
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default AddMember;
