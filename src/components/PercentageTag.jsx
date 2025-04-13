import { Tag, Typography } from 'antd';

const { Text } = Typography;

export default function PercentageTag({ label, value }) {
	const color = value > 0 ? 'green' : 'red';
	return (
		<>
			<Text strong>{label}: </Text>
			<Tag color={color}>{value}%</Tag>{' '}
		</>
	);
}
