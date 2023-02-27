import './App.css';
import {useEffect, useState} from 'react';
import Web3 from 'web3';
import detectEthereumProvider from '@metamask/detect-provider';
import {loadContract} from './utils/load-contract';

function App() {

    const [web3Api, setWeb3Api] = useState({
        provider: null,
        web3: null,
        contract: null,
    });
    const [account, setAccount] = useState(null);

    useEffect(() => {
        const loadProvider = async () => {
            // const contract = await loadContract('Faucet');
            // with MetaMask, we have access to window.ethereum & to window.web3
            // metamask will inject a global API into website
            // this API allows website to request users, accounts, read data to blockchain
            // sign messages and transactions
            console.log('Web3', window.web3);
            console.log('Ethereum', window.ethereum);
            const provider = await detectEthereumProvider();
            if (provider) {
                provider.request({method: "eth_requestAccounts"});
                setWeb3Api({
                    web3: new Web3(provider),
                    provider,
                })
            } else {
                console.error("Please, install Metamask.");
            }
        }
        loadProvider();
    }, []);
    useEffect(() => {
        const getAccount = async () => {
            const accounts = await web3Api.web3.eth.getAccounts();
            console.log('accounts', accounts);
            setAccount(accounts[0]);
        }
        web3Api.web3 && getAccount();
    }, [web3Api.web3]);
    console.log('web3', web3Api.web3);
    return (
        <div className="faucet-wrapper">
            <div className="faucet">
                <div className="is-flex is-align-items-center">
                    <span className="mr-2"><strong>Account:</strong></span>
                    {account || <button className="button is-small" onClick={()=>web3Api.provider.request({method: "eth_requestAccounts" +
                            ""})}>Connect Wallet</button>}
                </div>
                <div className="balance-view is-size-2 my-4">
                    Current Balance: <strong>10</strong> ETH.
                </div>
                <button className="button is-link mr-2">Donate</button>
                <button className="button is-primary">Withdraw</button>
            </div>
        </div>);
}

export default App;
