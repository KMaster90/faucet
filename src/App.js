import './App.css';
import {useEffect, useState} from 'react';
import Web3 from 'web3';

function App() {

    const [web3Api, setWeb3Api] = useState({
        provider: null,
        web3: null,
    });
    const [account, setAccount] = useState(null);

    useEffect(() => {
        const loadProvider = async () => {
            // with MetaMask, we have access to window.ethereum & to window.web3
            // metamask will inject a global API into website
            // this API allows website to request users, accounts, read data to blockchain
            // sign messages and transactions
            console.log('Web3', window.web3);
            console.log('Ethereum', window.ethereum);
            let provider = null;
            if (window.ethereum) {
                provider = window.ethereum;
                try {
                    await provider.request({method:"eth_requestAccounts"});
                } catch (error) {
                    console.error("User denied account access!");
                }
            } else if (window.web3) {
                provider = window.web3.currentProvider;
            } else if (!process.env.production) {
                provider = new Web3.providers.HttpProvider('http://localhost:8545');
            }
            setWeb3Api({
                web3: new Web3(provider),
                provider,
            })
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
    return (<div className="faucet-wrapper">
        <div className="faucet">
            <span><strong>Account:</strong></span>
            <h1>{account || "not connected"}</h1>
            <div className="balance-view is-size-2">
                Current Balance: <strong>10</strong> ETH.
            </div>
            <button className="btn mr-2" onClick={async () => {
                const accounts = await window.ethereum.request({method: 'eth_requestAccounts'});
                console.log(accounts);
            }}>Enable Ethereum
            </button>
            <button className="btn mr-2">Donate</button>
            <button className="btn">Withdraw</button>
        </div>
    </div>);
}

export default App;
