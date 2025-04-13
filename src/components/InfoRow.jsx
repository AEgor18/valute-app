import { Typography } from 'antd';

const { Paragraph, Text } = Typography;

export default function InfoRow({ label, value, suffix = '' }) {
	return (
		<Paragraph>
			<Text strong>{label}: </Text>
			{value}
			{suffix}
		</Paragraph>
	);
}
