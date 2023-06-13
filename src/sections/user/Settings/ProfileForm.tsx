import * as React from 'react';

/* State Management * APIs */
import { useAuthApi } from 'src/api/context';
import { User as UserType } from 'src/generated/types';

/* Components */
import { Formik } from 'formik';
import { FormInput, FormTextArea } from 'src/components/Form';
import UserAvatar from 'src/components/Sidebar/UserAvatar';

const formDisplayClass = 'flex flex-col items-start py-2';

interface FormTemplateProps {
  userAvatar: React.ReactNode;
  firstName: React.ReactNode;
  lastName: React.ReactNode;
  email: React.ReactNode;
  description: React.ReactNode;
}

const FormTemplate: React.FC<FormTemplateProps> = (props) => {
  return (
    <form className="flex flex-col items-start ml-2">
      {props.userAvatar}
      {props.firstName}
      {props.lastName}
      {props.email}
      {props.description}
    </form>
  );
};

interface Props {
  user?: Pick<
    UserType,
    'id' | 'firstname' | 'lastname' | 'email' | 'alias' | 'avatar'
  >;
}

const ProfileForm: React.FC<Props> = (props) => {
  const authApi = useAuthApi();

  return (
    <Formik
      onSubmit={() => { console.log('onSubmit ProfileForm') }}
      initialValues={{
        email: props.user?.email || '',
        firstName: props.user?.firstname || '',
        lastName: props.user?.lastname || '',
      }}
    >
      {(formik) => (
        <FormTemplate
          userAvatar={
            <UserAvatar
              imgUrl={props.user?.avatar || undefined}
              onUploadImage={async (file) => {
                await authApi.onUploadAvatar(file, props.user?.id);
              }}
              displayHeight={'h-20'}
              displayWidth={'w-20'}
            />
          }
          firstName={
            <FormInput
              containerClass={formDisplayClass}
              labelHtmlFor={'firstName'}
              labelName={'First Name'}
              ariaLabel={'enter your first name'}
              ariaRequirement={true}
              inputValue={formik.values}
              handleChange={formik.handleChange}
              handleBlur={formik.handleBlur}
              inputWidth={'w-60'}
            />
          }
          lastName={
            <FormInput
              containerClass={formDisplayClass}
              labelHtmlFor={'lastName'}
              labelName={'Last Name'}
              ariaLabel={'enter your last name'}
              ariaRequirement={true}
              inputValue={formik.values}
              handleChange={formik.handleChange}
              handleBlur={formik.handleBlur}
              inputWidth={'w-60'}
            />
          }
          email={
            <FormInput
              containerClass={formDisplayClass}
              labelHtmlFor={'email'}
              labelName={'Email'}
              ariaLabel={'enter your email'}
              ariaRequirement={true}
              inputValue={formik.values}
              handleChange={formik.handleChange}
              handleBlur={formik.handleBlur}
              inputWidth={'w-60'}
            />
          }
          description={
            <FormTextArea
              containerClass={formDisplayClass}
              labelHtmlFor={'description'}
              labelName={'Description (Optional)'}
              inputValue={formik.values}
              handleChange={formik.handleChange}
              handleBlur={formik.handleBlur}
              inputWidth={'w-60'}
            />
          }
        />
      )}
    </Formik>
  );
};

export default ProfileForm;
