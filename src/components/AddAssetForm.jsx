import { Divider, Form, InputNumber, Button, DatePicker, Result } from 'antd';
import { useState, useRef } from 'react';
import { useCrypto } from '../context/crypto-context';
import CoinInfo from './CoinInfo';
import CoinSelect from './CoinSelect';
import { updateTotal } from '../utils/utils';

const validateMessages = {
	required: '${label} is required!',
	types: {
		number: '${label} in not valid number',
	},
	number: {
		range: '${label} must be between ${min} and ${max}',
	},
};

export default function AddAssetForm({ onClose }) {
	const [form] = Form.useForm();
	const { crypto, addAsset } = useCrypto();
	const [coin, setCoin] = useState(null);
	const [submitted, setSubmitted] = useState(false);
	const assetRef = useRef();

	function handleSelect(value) {
		setCoin(crypto.find((c) => c.id === value));
	}

	if (submitted) {
		return (
			<Result
				status='success'
				title='New Asset Added'
				subTitle={`Added ${assetRef.current.amount} of ${coin.name} by price ${assetRef.current.price}`}
				extra={[
					<Button type='primary' key='console' onClick={onClose}>
						Close
					</Button>,
				]}
			/>
		);
	}

	if (!coin) {
		return (
			<CoinSelect
				style={{ width: '100%' }}
				value='Select coin'
				onToggle={() => setSelectOpen((prev) => !prev)}
				onSelect={handleSelect}
			/>
		);
	}

	function onFinish(values) {
		const newAsset = {
			id: coin.id,
			amount: values.amount,
			price: values.price,
			date: values.date?.$d ?? new Date(),
		};
		assetRef.current = newAsset;
		setSubmitted(true);
		addAsset(newAsset);
	}

	return (
		<Form
			form={form}
			name='basic'
			labelCol={{
				span: 4,
			}}
			wrapperCol={{
				span: 10,
			}}
			style={{
				maxWidth: 600,
			}}
			initialValues={{
				price: +coin.price.toFixed(2),
			}}
			onFinish={onFinish}
			validateMessages={validateMessages}
		>
			<CoinInfo coin={coin} />
			<Divider />

			<Form.Item
				label='Amount'
				name='amount'
				rules={[
					{
						required: true,
						type: 'number',
						min: 0,
					},
				]}
			>
				<InputNumber
					placeholder='Enter coin amount'
					onChange={(value) => updateTotal(form, 'price', value)}
					style={{ width: '100%' }}
				/>
			</Form.Item>

			<Form.Item label='Price' name='price'>
				<InputNumber
					onChange={(value) => updateTotal(form, 'amount', value)}
					style={{ width: '100%' }}
				/>
			</Form.Item>

			<Form.Item label='Date & Time' name='date'>
				<DatePicker showTime />
			</Form.Item>

			<Form.Item label='Total' name='total'>
				<InputNumber disabled style={{ width: '100%' }} />
			</Form.Item>

			<Form.Item>
				<Button type='primary' htmlType='submit'>
					Add Asset
				</Button>
			</Form.Item>
		</Form>
	);
}
