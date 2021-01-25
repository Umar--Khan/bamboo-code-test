import { useContext, useState } from "react";
import axiosConfig from "../../axios/axiosConfig";
import endpoints from "../../const/endpoints";
import { INVALID_TRANSACTION_REQUEST } from "../../const";
import { UserContext } from "../../context/UserContext";

const TransferCurrency = () => {
  const [amount, setAmount] = useState(0);
  const [account, setAccount] = useState("");
  const [transferError, setTransferError] = useState("");
  const { userData, setUserData } = useContext(UserContext);

  const postTransaction = async (body) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${userData?.token}` },
      };
      const resp = await axiosConfig.post(endpoints.transaction, body, config);
      const { data } = resp;

      if (data) {
        setUserData({
          ...userData,
          user: { ...userData.user, balance: data.balance },
        });
        resetForm();
        resetTransferErrors();
      }
    } catch (error) {
      console.error(error.response.data.error);
      if (error.response.data.error) {
        setTransferError(error.response.data.error);
      }
    }
  };

  const handleTransfer = (event) => {
    event.preventDefault();
    if (amount > 0 && account.length >= 2) {
      return postTransaction({ amount, accountNumber: account });
    }
    setTransferError(INVALID_TRANSACTION_REQUEST);
  };

  const resetForm = () => {
    setAmount(0);
    setAccount("");
  };

  const resetTransferErrors = () => {
    setTransferError("");
  };

  return (
    <>
      <label htmlFor="amount">Amount:</label>
      <input
        type="number"
        value={amount}
        onChange={(e) => {
          setAmount(e.target.value);
        }}
      />
      <label htmlFor="account">Account:</label>
      <input
        type="text"
        value={account}
        onChange={(e) => {
          setAccount(e.target.value);
        }}
      />
      {transferError && <span>{transferError}</span>}
      <button type="submit" onClick={handleTransfer}>
        Transfer
      </button>
    </>
  );
};

export default TransferCurrency;
