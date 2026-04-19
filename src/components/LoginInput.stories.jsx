import React from 'react';
import LoginInput from './LoginInput';

export default {
  title: 'Components/LoginInput',
  component: LoginInput,
  argTypes: {
    login: { action: 'login' },
  },
};

const Template = (args) => <LoginInput {...args} />;

export const Default = Template.bind({});
Default.args = {};
