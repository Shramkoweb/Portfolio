import React from "react";
import { Meta, Story } from "@storybook/react/types-6-0";
import Button, { ButtonProps } from "./index";

export default {
  title: "Components/Button",
  component: Button,
} as Meta;

const Template: Story<ButtonProps> = (args: ButtonProps) => <Button {...args}>Hello</Button>;

export const Default = Template.bind({});
