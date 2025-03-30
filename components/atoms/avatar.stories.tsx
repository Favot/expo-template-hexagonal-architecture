import type { Meta, StoryObj } from "@storybook/react";
import { View } from "react-native";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";

const meta: Meta<typeof Avatar> = {
  title: "Atoms/Avatar",
  component: Avatar,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  render: () => (
    <Avatar alt="User avatar">
      <AvatarImage source={{ uri: "https://github.com/shadcn.png" }} />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  ),
};

export const WithImageOnly: Story = {
  render: () => (
    <Avatar alt="User avatar">
      <AvatarImage source={{ uri: "https://github.com/shadcn.png" }} />
    </Avatar>
  ),
};

export const WithFallbackOnly: Story = {
  render: () => (
    <Avatar alt="User avatar" className="h-10 w-10">
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
  ),
};

export const MultipleAvatars: Story = {
  render: () => (
    <View style={{ flexDirection: "row", gap: 16 }}>
      <Avatar alt="First user avatar">
        <AvatarImage source={{ uri: "https://github.com/shadcn.png" }} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Avatar alt="Second user avatar">
        <AvatarImage source={{ uri: "https://github.com/radix-ui.png" }} />
        <AvatarFallback>RU</AvatarFallback>
      </Avatar>
      <Avatar alt="Third user avatar">
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
    </View>
  ),
};
