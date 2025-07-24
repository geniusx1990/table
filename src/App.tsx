import './App.css'
import { ConfigProvider, Button } from 'antd';

function App() {

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#1677ff',
                },
            }}
        >
            <Button type="primary">Click Me</Button>
        </ConfigProvider>
    );
}

export default App
