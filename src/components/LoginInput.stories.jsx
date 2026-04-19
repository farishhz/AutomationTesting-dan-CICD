import React from 'react';
import LoginInput from './LoginInput';

export default {
  title: 'Components/LoginInput',
  component: LoginInput,
  argTypes: {
    login: { action: 'login' },
  },
};

function Template(args) {
  return <LoginInput {...args} />;
}

export const Default = Template.bind({});
Default.args = {};
