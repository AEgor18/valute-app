import { Select } from 'antd';
import { useCrypto } from '../context/crypto-context';
import CoinOption from './CoinOption';

export default function CoinSelect({
	value,
	onSelect,
	placeholder = 'Select coin',
	open,
	onToggle,
	style = { width: 250 },
}) {
	const { crypto } = useCrypto();

	const options = crypto.map((coin) => ({
		label: coin.name,
		value: coin.id,
		icon: coin.icon,
	}));

	return (
		<Select
			style={style}
			value={value}
			onSelect={onSelect}
			open={open}
			onClick={onToggle}
			placeholder={placeholder}
			options={options}
			optionRender={(option) => (
				<CoinOption icon={option.data.icon} label={option.data.label} />
			)}
		/>
	);
}
