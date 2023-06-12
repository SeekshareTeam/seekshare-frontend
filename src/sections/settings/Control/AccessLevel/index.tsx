import * as React from 'react';
import { Formik, Field } from 'formik';
import * as yup from 'yup';

/* Components */
import InputRadio, {
  Props as InputRadioProps,
} from 'src/components/Input/Radio';
import InputBox from 'src/components/Input/Search';

const AccessLevel: React.FC = () => {
  const generalSettingsSchema = yup.object().shape({
    workspaceName: yup
      .string()
      .min(2, 'Too short')
      .max(50, 'Too Long!')
      .required('Required!'),
  });

  const SectionTitle = ({
    title,
    description,
  }: {
    title: string;
    description?: string;
  }) => {
    return (
      <div>
        <p className="text-nord-0 dark:text-nord-6 font-medium mb-2 text-lg">
          {title}
        </p>
        {description && <p className="text-nord-0 dark:text-nord-6">{description}</p>}
      </div>
    );
  };

  /**
   * Types of permissions
   * Any user can view the workspace
   * Only members or users that are invited can view it
   * Invite Only
   *
   */

  const publicAccountPermissions = [
    {
      name: 'publicPermissions',
      value: 'no_access',
      id: 'public_no_access',
      childDescription: 'Users outside of this workspace will have no access.',
      labelTitle: 'No Access',
    },

    {
      name: 'publicPermissions',
      value: 'read_only',
      id: 'public_read_only',
      childDescription:
        'Users outside of this workspace will only be able to read content.',
      labelTitle: 'Read Only',
    },
    {
      name: 'publicPermissions',
      value: 'read_and_write',
      id: 'public_read_and_write',
      childDescription:
        'Users outside of this workspace will be able to both read and write content.',
      labelTitle: 'Read and Write',
    },
  ];

  const privateAccountPermissions = [
    {
      name: 'privatePermissions',
      value: 'read_only',
      id: 'private_read_only',
      childDescription:
        'Users belongong to this workspace will only be able to read content.',
      labelTitle: 'Read Only',
    },
    {
      name: 'privatePermissions',
      value: 'read_and_write',
      id: 'private_read_and_write',
      childDescription:
        'Users belonging to this workspace will be able to both read and write content.',
      labelTitle: 'Read and Write',
    },
  ];

  const PermissionRadio = ({
    title,
    name,
    inputValue,
    accountPermissions,
  }: {
    title: string;
    name: string;
    inputValue: string;
    accountPermissions: Omit<InputRadioProps, 'inputValue'>[];
  }) => {
    return (
      <div className="my-4">
        {SectionTitle({ title })}
        <Field component="div" name={name}>
          {accountPermissions.map((accLevel) => {
            return (
              <InputRadio
                key={accLevel.id}
                name={accLevel.name}
                value={accLevel.value}
                id={accLevel.id}
                childDescription={accLevel.childDescription}
                inputValue={inputValue}
                labelTitle={accLevel.labelTitle}
              />
            );
          })}
        </Field>
      </div>
    );
  };

  const AllowedEmailDomains = () => {
    return (
      <div>
        {SectionTitle({
          title: 'Allowed Email Domains',
          description:
            'Users that have emails with specified domains will automatically be allowed to join the workspace.',
        })}
        <div className="w-60">
          <InputBox labelName="email_domains" labelTitle={null} />
        </div>
      </div>
    );
  };

  return (
    <Formik
      initialValues={{
        publicPermissions: publicAccountPermissions[0].value,
        privatePermissions: privateAccountPermissions[0].value,
      }}
      validationSchema={generalSettingsSchema}
      onSubmit={() => { console.log('onSubmit: AccessLevel') }}
    >
      {({ values, handleSubmit }) => (
        <form onSubmit={handleSubmit} className="">
          {PermissionRadio({
            title: 'Public Account Permissions',
            name: 'publicPermissions',
            inputValue: values.publicPermissions,
            accountPermissions: publicAccountPermissions,
          })}
          {PermissionRadio({
            title: 'Private Account Permissions',
            name: 'privatePermissions',
            inputValue: values.privatePermissions,
            accountPermissions: privateAccountPermissions,
          })}
          {AllowedEmailDomains()}
        </form>
      )}
    </Formik>
  );
};

export default AccessLevel;
