import './App.css';
import {useCallback, useEffect, useState} from 'react';
import Web3 from 'web3';
import detectEthereumProvider from '@metamask/detect-provider';
import {loadContract} from './utils/load-contract';

function App() {

    const [web3Api, setWeb3Api] = useState({
        provider: null,
        web3: null,
        contract: null,
        isProviderLoaded: false,
    });
    const [balance, setBalance] = useState(null);
    const [account, setAccount] = useState(null);
    const [shouldReload, reload] = useState(false);

    const canConnectToContract = account && web3Api.contract;
    const reloadEffect = useCallback(() => reload(!shouldReload), [shouldReload]);
    const setAccountListener = provider => {
        provider.on('accountsChanged', _ => window.location.reload());
        // provider.on('accountsChanged', accounts => setAccount(accounts[0]));
        // provider._jsonRpcConnection._events.on('notification',payload => {
        //     const {method, params} = payload;
        //     if (method === 'metamask_unlockStateChanged') {
        //         setAccount(null);
        //     }
        // });
    }
    const setChainListener = provider => provider.on('chainChanged', _ => window.location.reload());

    useEffect(() => {
        const loadProvider = async () => {
            // with MetaMask, we have access to window.ethereum & to window.web3
            // metamask will inject a global API into website
            // this API allows website to request users, accounts, read data to blockchain
            // sign messages and transactions
            console.log('Web3', window.web3);
            console.log('Ethereum', window.ethereum);
            const provider = await detectEthereumProvider();
            if (provider) {
                const contract = await loadContract('Faucet', provider);
                setAccountListener(provider);
                setChainListener(provider);
                provider.request({method: "eth_requestAccounts"});
                setWeb3Api({
                    web3: new Web3(provider),
                    provider,
                    contract,
                    isProviderLoaded: true,

                })
            } else {
                // setWeb3Api({...web3Api, isProviderLoaded: true});
                setWeb3Api(api => ({...api, isProviderLoaded: true}));
                console.error("Please, install Metamask.");
            }
        }
        loadProvider();
    }, []);
    useEffect(() => {
        const loadBalance = async () => {
            const {contract, web3} = web3Api;
            const balance = await web3.eth.getBalance(contract.address);
            const balanceInEth = web3.utils.fromWei(balance, 'ether');
            setBalance(balanceInEth);
        };
        web3Api.contract && loadBalance();
    }, [web3Api, shouldReload]);
    useEffect(() => {
        const getAccount = async () => {
            const accounts = await web3Api.web3.eth.getAccounts();
            console.log('accounts', accounts);
            setAccount(accounts[0]);
        }
        web3Api.web3 && getAccount();
    }, [web3Api.web3]);
    console.log('web3', web3Api.web3);

    const addFunds = useCallback(async () => {
        const {web3, contract} = web3Api;
        const amount = web3.utils.toWei('1', 'ether');
        await contract.addFunds({from: account, value: amount});
        // window.location.reload();
        reloadEffect();
    }, [web3Api, account, reloadEffect]);

    const withdraw = useCallback(async () => {
        const {web3, contract} = web3Api;
        const amount = web3.utils.toWei('0.1', 'ether');
        await contract.withdraw(amount, {from: account});
        reloadEffect();
    }, [web3Api, account, reloadEffect]);

    return (
        <div className="faucet-wrapper">
            <div className="faucet">
                {web3Api.isProviderLoaded
                    ? <div className="is-flex is-align-items-center">
                        <span className="mr-2"><strong>Account:</strong></span>
                        {account
                            ? <div>{account}</div>
                            : !web3Api.provider
                                ? <div className="notification is-size-6 is-rounded is-warning">
                                    Wallet is not provided!{' '}
                                    <a href="https://metamask.io/download.html" target="_blank" rel="noreferrer">Install
                                        Metamask</a>
                                </div>
                                : <button className="button is-small" onClick={() => web3Api.provider.request({
                                    method: "eth_requestAccounts" +
                                        ""
                                })}>Connect Wallet</button>}
                    </div>
                    : <span>Looking for Web3...</span>
                }
                <div className="balance-view is-size-2 my-4">
                    Current Balance: <strong>{balance}</strong> ETH.
                </div>
                {
                    !canConnectToContract && <i className="is-block">Connect to Ganache</i>
                }
                <button className="button is-link mr-2" disabled={!canConnectToContract} onClick={addFunds}>Donate 1 eth</button>
                <button className="button is-primary" disabled={!canConnectToContract} onClick={withdraw}>Withdraw 0.1 eth</button>
            </div>
        </div>);
}

export default App;
