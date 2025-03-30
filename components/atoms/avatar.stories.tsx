import type { Meta, StoryObj } from "@storybook/react";
import { View } from "react-native";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Text } from "./text";
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
      <AvatarFallback>
        <Text>CN</Text>
      </AvatarFallback>
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
      <AvatarFallback>
        <Text>JD</Text>
      </AvatarFallback>
    </Avatar>
  ),
};

export const MultipleAvatars: Story = {
  render: () => (
    <View style={{ flexDirection: "row", gap: 16 }}>
      <Avatar alt="First user avatar">
        <AvatarImage source={{ uri: "https://github.com/shadcn.png" }} />
        <AvatarFallback>
          <Text>CN</Text>
        </AvatarFallback>
      </Avatar>
      <Avatar alt="Second user avatar">
        <AvatarImage source={{ uri: "https://github.com/radix-ui.png" }} />
        <AvatarFallback>
          <Text>RU</Text>
        </AvatarFallback>
      </Avatar>
      <Avatar alt="Third user avatar">
        <AvatarFallback>
          <Text>JD</Text>
        </AvatarFallback>
      </Avatar>
    </View>
  ),
};
