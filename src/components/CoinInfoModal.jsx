import { Flex, Tag, Typography, Divider } from 'antd';
import PercentageTag from './PercentageTag';
import InfoRow from './InfoRow';
import CoinInfo from './CoinInfo';

export default function CoinInfoModal({ coin }) {
	return (
		<>
			<CoinInfo coin={coin} withSymbol />
			<Divider />
			<Typography.Paragraph>
				<PercentageTag label='1 hour' value={coin.priceChange1h} />
				<PercentageTag label='1 day' value={coin.priceChange1d} />
				<PercentageTag label='1 week' value={coin.priceChange1w} />
			</Typography.Paragraph>
			<InfoRow label='Price' value={coin.price.toFixed(2)} suffix='$' />
			<InfoRow label='Price BTC' value={coin.priceBtc} />
			<InfoRow label='Market Cap' value={coin.marketCap} suffix='$' />
			{coin.contractAddress && (
				<InfoRow
					label='Contract Address'
					value={coin.contractAddress}
				/>
			)}
		</>
	);
}
