import type { Meta, StoryObj } from "@storybook/react";
import { View } from "react-native";
import { Text } from "./text";

const meta: Meta<typeof Text> = {
	title: "Atoms/Text",
	component: Text,
};

export default meta;
type Story = StoryObj<typeof Text>;

export const Default: Story = {
	render: () => (
		<View className="flex flex-col gap-2">
			<Text>Default</Text>
			<Text color="primary">Primary</Text>
			<Text color="secondary">Secondary</Text>
			<Text color="muted">Muted</Text>
			<Text color="info">Info</Text>
			<Text color="success">Success</Text>
			<Text color="warning">Warning</Text>
			<Text color="destructive">Destructive</Text>
		</View>
	),
};

export const TextSize: Story = {
	render: () => (
		<View className="flex flex-col gap-2">
			<Text variant="largeTitle">Large Title</Text>
			<Text variant="title1">Title 1</Text>
			<Text variant="title2">Title 2</Text>
			<Text variant="title3">Title 3</Text>
			<Text variant="heading">Heading</Text>
			<Text variant="body">Body</Text>
			<Text variant="callout">Callout</Text>
			<Text variant="subhead">Subhead</Text>
			<Text variant="footnote">Footnote</Text>
			<Text variant="caption1">Caption 1</Text>
			<Text variant="caption2">Caption 2</Text>
		</View>
	),
};
