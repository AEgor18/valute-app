import { Space } from 'antd';

export default function CoinOption({ icon, label }) {
	return (
		<Space>
			<img style={{ width: 20 }} src={icon} alt={label} />
			{label}
		</Space>
	);
}
