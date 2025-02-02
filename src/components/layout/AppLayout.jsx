import { Layout, Spin } from 'antd';
import AppHeader from '../layout/AppHeader';
import AppSider from '../layout/AppSider';
import AppContent from '../layout/AppContent';
import useCrypto  from '../../context/crypto-context';

export function AppLayout() {
    const {loading} = useCrypto()

    if (loading) {
        return (
          <Spin fullscreen />
        )
      }

    return (
        <Layout>
            <AppHeader/>
            <Layout>
                <AppSider/>
                <AppContent/>
            </Layout>
        </Layout>
    )
}