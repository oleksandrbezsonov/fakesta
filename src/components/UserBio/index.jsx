import React, { useCallback, useState } from 'react';
import { useMemo } from 'react';
import { useEffect } from 'react';
import Button from '../Button';
import FormTextArea from '../FormTextArea';
import Input from '../Input';
import UserCounter from '../UserCounter';
import './styles.css';

const requiredText = 'This field is required!';

const validateText = (text, cb) => {
    if (!text) {
        cb(requiredText);
        return true;
    }

    if (text < 3) {
        cb('Too short!')
        return true;
    }

    if (/\s/g.test(text)) {
        cb('No spaces allowed!')
        return true;
    }

    return false;
};

const validateUrl = (text, cb) => {
    if (!text) {
        cb(requiredText);
        return true;
    }

    if (!/^(ftp|http|https):\/\/[^ "]+$/.test(text)) {
        cb('invalid link!')
        return true;
    }

    return false;
};

const UserBio = ({
    avatarUrl,
    nickname,
    subscribed,
    subscribers,
    firstName,
    lastName,
    description,
    url,
    isMyPage,
    isSubscribed,
    onEdit,
    fromLoading
}) => {
    const [btnProps, setBtnProps] = useState({ onClick: () => false, children: 'Подписаться' });
    const [isEditMode, setIsEditMode] = useState(false);
    const [formUserName, setFormUserName] = useState(nickname);
    const [formFirstName, setFormFirstName] = useState(firstName);
    const [formLastName, setFormLastName] = useState(lastName);
    const [formDescription, setFormDescription] = useState(description);
    const [formUrl, setFormUrl] = useState(url);
    const [userNameError, setUserNameError] = useState('');
    const [firstNameError, setFirstNameError] = useState('');
    const [lastNameError, setLastNameErrorError] = useState('');
    const [descriptionError, setDescriptionErrorError] = useState('');
    const [urlError, setUrlErrorError] = useState('');

    const onSaveEditForm = useCallback(async () => {
        const isUserNameError = validateText(formUserName, setUserNameError);
        const isFirstNameError = validateText(formFirstName, setFirstNameError);
        const isLastNameError = validateText(formLastName, setLastNameErrorError);
        const isUrlError = validateUrl(formUrl, setUrlErrorError);

        let isErrors = isUserNameError || isFirstNameError || isLastNameError || isUrlError;

        console.log(formDescription);
        if (!formDescription) {
            isErrors = true;
            setDescriptionErrorError(requiredText);
        }

        if (isErrors) {
            return;
        }

        await onEdit({
            firstName: formFirstName,
            lastName: formLastName,
            nickname: formUserName,
            description: formDescription,
            url: formUrl,
        });
        setIsEditMode(false);
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formUserName, formFirstName, formLastName, formUrl, formDescription]);

    useEffect(() => {
        if (isMyPage) {
            if (isEditMode) {
                setBtnProps({ onClick: onSaveEditForm, children: 'Save', className: 'cnUserEditButton', disabled: fromLoading });
            } else {
                setBtnProps({ onClick: () => setIsEditMode(true), children: 'Edit' });
            }
        } else if (isSubscribed) {
            setBtnProps({ onClick: () => false, children: 'Unsubscribe' })
        } else {
            setBtnProps({ onClick: () => false, children: 'Subscribe' })
        }
    }, [isMyPage, isSubscribed, isEditMode, fromLoading, onSaveEditForm]);

    const fields = useMemo(() => {
        if (isEditMode) {
            return {
                userName: <Input value={formUserName} onChange={({ target: { value } }) => setFormUserName(value)} errorText={userNameError} className="cnInput" />,
                name: (
                    <>
                        <Input value={formFirstName} onChange={({ target: { value } }) => setFormFirstName(value)} className="cnInput" errorText={firstNameError} /> 
                        <Input onChange={({ target: { value } }) => setFormLastName(value)} value={formLastName} className="cnInput" errorText={lastNameError} />
                    </>
                ),
                description: <FormTextArea value={formDescription} onChange={({ target: { value } }) => setFormDescription(value)} className="cnInput" errorText={descriptionError} />,
                url: <Input value={formUrl} onChange={({ target: { value } }) => setFormUrl(value)} errorText={urlError} />,
                firstButtonClassName: 'cnUserBioButtonRow',
            }
        }

        return {
            userName: <span className='cnUserBioNickname'>{nickname}</span>,
            name: <span className='cnUserBioName'>{firstName} {lastName}</span>,
            description: <span>{description}</span>,
            url: <a href={url} >{url}</a>,
            firstButtonClassName: 'cnUserBioRow',
        }
    }, [isEditMode, nickname, firstName, lastName, description, url, formFirstName, formDescription, formLastName, formUrl, formUserName, userNameError, firstNameError, lastNameError, descriptionError, urlError]);

    return (
        <div className='cnUserBioRoot'>
            <div>
                <img className='cnUserBioAvatar' src={avatarUrl} alt="avatar" />
            </div>
            <div className='cnUserBioInfo'>
                <div className={fields.firstButtonClassName}>
                    {fields.userName}
                    <Button {...btnProps} />
                </div>
                <div className='cnUserBioRow'>
                    <UserCounter count={5} text="Posts" className="cnUserBioCounter" />
                    <UserCounter count={subscribers} text="Subscribers" className="cnUserBioCounter" />
                    <UserCounter count={subscribed} text="Subscriptions" />
                </div>
                <div className='cnUserBioRow'>
                    {fields.name}
                </div>
                <div className='cnUserBioRow'>
                    {fields.description}
                </div>
                {fields.url}
            </div>
        </div>
    );
};

export default UserBio;
