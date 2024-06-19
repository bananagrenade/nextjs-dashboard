"use client";

import { useState, useEffect } from 'react';
import { lusitana } from '@/app/ui/fonts';
import { Metadata } from 'next';
import { motion } from 'framer-motion';

export default function SignUpPage() {
    const [userType, setUserType] = useState('customer'); // 'customer' or 'partner'
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [businessName, setBusinessName] = useState('');
    const [error, setError] = useState('');

    const [inputFields, setInputFields] = useState([
        { id: 1, label: 'First Name', value: firstName, setValue: setFirstName },
    ]);

    const handleInputChange = (id, newValue, next) => {
        setInputFields((prevFields) =>
            prevFields.map((field) =>
                field.id === id ? { ...field, value: newValue } : field
            )
        );
        if (next && newValue !== '') {
            addNewInputField();
        }
    };

    useEffect(() => {
        const lastField = inputFields[inputFields.length - 1];
        if (lastField.value !== '') {
            addNewInputField();
        }
    }, [inputFields]);

    const addNewInputField = () => {
        const newFieldId = inputFields.length + 1;
        let newFieldLabel = '';
        let newFieldSetValue;

        switch (newFieldId) {
            case 2:
                newFieldLabel = 'Last Name';
                newFieldSetValue = setLastName;
                break;
            case 3:
                newFieldLabel = 'Username';
                newFieldSetValue = setUsername;
                break;
            case 4:
                newFieldLabel = 'Email';
                newFieldSetValue = setEmail;
                break;
            case 5:
                newFieldLabel = 'Password';
                newFieldSetValue = setPassword;
                break;
            case 6:
                newFieldLabel = 'Confirm Password';
                newFieldSetValue = setConfirmPassword;
                break;
            default:
                return;
        }

        setInputFields((prevFields) => [
            ...prevFields,
            { id: newFieldId, label: newFieldLabel, value: '', setValue: newFieldSetValue },
        ]);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        // Proceed with form submission logic here
    };

    return (
        <main className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl text-center`}>
                    Sign Up as {userType === 'customer' ? 'Customer' : 'Business Partner'}
                </h1>
                <div className="flex justify-center mb-6">
                    <button
                        type="button"
                        className={`py-2 px-4 ${userType === 'customer' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'
                            } rounded-l-md border ${userType === 'customer' ? 'border-indigo-600' : 'border-gray-200'} focus:outline-none`}
                        onClick={() => setUserType('customer')}
                    >
                        Customer
                    </button>
                    <button
                        type="button"
                        className={`py-2 px-4 ${userType === 'partner' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'
                            } rounded-r-md border ${userType === 'partner' ? 'border-indigo-600' : 'border-gray-200'} focus:outline-none -ml-px`}
                        onClick={() => setUserType('partner')}
                    >
                        Business Partner
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        {inputFields.map((field, index) => (
                            <motion.div
                                key={field.id}
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                                className="mb-4"
                            >
                                <label htmlFor={field.label} className="block text-sm font-medium text-gray-700">
                                    {field.label}
                                </label>
                                <div className="relative">
                                    <input
                                        type={field.label.includes('Password') ? 'password' : 'text'}
                                        id={field.label}
                                        name={field.label}
                                        value={field.value}
                                        onChange={(e) => handleInputChange(field.id, e.target.value, index === inputFields.length - 1)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        required
                                    />
                                    {index === inputFields.length - 1 && (
                                        <span
                                            className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
                                            onClick={() => handleInputChange(field.id, field.value, true)}
                                        >
                                            ➔
                                        </span>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Sign Up
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
}
