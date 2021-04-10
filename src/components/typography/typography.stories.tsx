import React from "react";
import { Meta, Story } from "@storybook/react/types-6-0";

import Typography, { TypographyProps } from "./index";

export default {
  title: "Components/Typography",
  component: Typography,
} as Meta;

const Template: Story<TypographyProps> = (args: TypographyProps) => <Typography {...args}>Hello</Typography>;

export const Default = Template.bind({});
