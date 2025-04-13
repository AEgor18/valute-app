import { Layout, Select, Space, Button, Modal, Drawer } from 'antd';
import { useCrypto } from '../../context/crypto-context';
import { useEffect, useState } from 'react';
import CoinInfoModal from '../CoinInfoModal';
import AddAssetForm from '../AddAssetForm';
import CoinSelect from '../CoinSelect';
import { useKeyPressToggle } from '../../hooks/useKeyPressToggle';

const headerStyle = {
	width: '100%',
	textAlign: 'center',
	height: 60,
	padding: '1rem',
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
};

export default function AppHeader() {
	const [selectOpen, setSelectOpen] = useKeyPressToggle(false, '/');
	const [coin, setCoin] = useState(null);
	const [modal, setModal] = useState(false);
	const [drawer, setDrawer] = useState(false);
	const { crypto } = useCrypto();

	function handleSelect(value) {
		setCoin(crypto.find((c) => c.id === value));
		setModal(true);
	}

	return (
		<Layout.Header style={headerStyle}>
			<CoinSelect
				value='press / to open'
				open={selectOpen}
				onToggle={() => setSelectOpen((prev) => !prev)}
				onSelect={handleSelect}
			/>

			<Button type='primary' onClick={() => setDrawer(true)}>
				Add Asset
			</Button>

			<Modal open={modal} onCancel={() => setModal(false)} footer={null}>
				<CoinInfoModal coin={coin} />
			</Modal>

			<Drawer
				width={600}
				title='Add Asset'
				onClose={() => setDrawer(false)}
				open={drawer}
				destroyOnClose
			>
				<AddAssetForm onClose={() => setDrawer(false)} />
			</Drawer>
		</Layout.Header>
	);
}
