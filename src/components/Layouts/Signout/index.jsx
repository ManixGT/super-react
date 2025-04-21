import styles from './SignOutPage.module.css';
import { ReusableFormComponent } from '../../SharedUI/ReactForms';

const fields = [
    {
        name: 'confirmSignOut',
        label: 'Confirm Sign Out',
        type: 'checkbox',
        placeholder: 'I confirm I want to sign out',
        validation: {
            required: 'Please confirm to sign out',
        },
    },
    {
        name: 'reason',
        label: 'Reason (Optional)',
        type: 'select',
        placeholder: 'Select a reason',
        options: [
            { value: '', label: 'Select a reason' },
            { value: 'finished', label: 'Finished my session' },
            { value: 'break', label: 'Taking a break' },
            { value: 'switching', label: 'Switching accounts' },
            { value: 'other', label: 'Other' },
        ],
    },
    {
        name: 'feedback',
        label: 'Feedback (Optional)',
        type: 'textarea',
        placeholder: 'Share your experience with us',
    },
];

const SignOutPage = () => {
    const handleSubmit = (data) => {
        console.log('Signed out:', data);
        // Here you would typically clear authentication tokens/cookies
        // and redirect to home page or login page
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h1 className={styles.heading}>Sign Out</h1>
                <p className={styles.message}>Are you sure you want to sign out?</p>
                <ReusableFormComponent
                    fields={fields}
                    onSubmit={handleSubmit}
                    submitButtonText="Sign Out"
                />
            </div>
        </div>
    );
};

export default SignOutPage;