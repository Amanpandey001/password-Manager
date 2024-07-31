import React, { useState, useRef, useEffect } from 'react';
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Mainmanager = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [passarr, setPassarr] = useState([]);
    const [form, setForm] = useState({
        website: '',
        username: '',
        password: ''
    });
    const [editIndex, setEditIndex] = useState(null);
    const showIcon = useRef();

    useEffect(() => {
        const passwords = localStorage.getItem('passwords');
        if (passwords) {
            try {
                const parsedPasswords = JSON.parse(passwords);
                if (Array.isArray(parsedPasswords)) {
                    setPassarr(parsedPasswords);
                } else {
                    console.error("Passwords retrieved from localStorage is not an array.");
                }
            } catch (error) {
                console.error("Error parsing passwords from localStorage:", error);
            }
        }
    }, []);

    const togglePasswordVisibility = () => {
        setShowPassword(prevState => !prevState);
        if (showIcon.current) {
            showIcon.current.src = showPassword ? '/show.svg' : '/hide.svg';
        }
    };

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleEdit = (index) => {
        setForm(passarr[index]);
        setEditIndex(index);
    };

    const handleDelete = (index) => {
        toast('Password Deleted!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        const newPassarr = [...passarr];
        newPassarr.splice(index, 1);
        setPassarr(newPassarr);
        localStorage.setItem('passwords', JSON.stringify(newPassarr));
    };

    const addContent = () => {
        toast('Password Added', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        if (editIndex !== null) {
            const newPassarr = [...passarr];
            newPassarr[editIndex] = form;
            setPassarr(newPassarr);
            localStorage.setItem('passwords', JSON.stringify(newPassarr));
            setEditIndex(null);
        } else {
            const newPassarr = [...passarr, form];
            setPassarr(newPassarr);
            localStorage.setItem('passwords', JSON.stringify(newPassarr));
        }

        // Clear form after adding or editing
        setForm({
            website: '',
            username: '',
            password: ''
        });
    };

    return (
        <div className='text-white p-3 md:h-[80%] h-[80%] w-[98%] md:w-[80%] mx-auto my-5'>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                theme="dark"
            />
            <div className='inputlabelkacss'>
                <input value={form.website} onChange={handleChange} type='text' className='weburl inputs' placeholder='Website URL' name='website' id='weburl' />
            </div>
            <div className='sm:flex gap-5 justify-center'>
                <div className='inputlabelkacss'>
                    <input value={form.username} onChange={handleChange} type='text' className='uname inputs' placeholder='Username' name='username' id='uname' />
                </div>
                <div className='inputlabelkacss relative'>
                    <span className='absolute right-3 cursor-pointer' onClick={togglePasswordVisibility}>
                        <img ref={showIcon} src={showPassword ? '/hide.svg' : '/show.svg'} width={20} height={20} alt="Toggle visibility" />
                    </span>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        name='password'
                        value={form.password}
                        onChange={handleChange}
                        className='passwd inputs'
                        placeholder='Password'
                        id='passwd'
                    />
                </div>
            </div>
            <div className='flex justify-center my-5'>
                <button onClick={addContent} className='bg-violet-600 px-3 py-2 transition-all flex justify-center items-center duration-150 hover:scale-105 hover:text-gray-200 hover:bg-violet-900 rounded-lg disabled:bg-violet-300 disabled:scale-100' disabled={!form.website || !form.username || !form.password}>
                    {editIndex !== null ? 'Update Password' : 'Add Password'}
                </button>
            </div>
            <div className='sm:h-[70%] h-[55%] p-3 overflow-auto'>
                <h1 className='text-center font-bold underline text-2xl mb-3'>Your Passwords</h1>
                {passarr.length === 0 && <p className='text-center'>No Passwords</p>}
                <table className='w-full text-center'>
                    <thead>
                        <tr className='bg-violet-500'>
                            <th className='shadow-black shadow-xl'>Website</th>
                            <th className='shadow-black shadow-xl'>Username</th>
                            <th className='shadow-black shadow-xl'>Password</th>
                            <th className='shadow-black shadow-xl'>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {passarr.map((item, index) => (
                            <tr key={index} className='bg-violet-300 text-gray-900'>
                                <td className='shadow-black shadow-xl'><a href={item.website} target="_blank" rel="noopener noreferrer">{item.website}</a></td>
                                <td className='shadow-black shadow-xl'>{item.username}</td>
                                <td className='shadow-black shadow-xl'>{item.password}</td>
                                <td className='flex sm:justify-around justify-between items-center'>
                                    <button onClick={() => handleEdit(index)}><FaEdit size={20} /></button>
                                    <button onClick={() => handleDelete(index)}><MdDeleteOutline size={20} /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Mainmanager;
