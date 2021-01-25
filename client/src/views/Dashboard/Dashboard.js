import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import TransferCurrency from "./TransferCurrency";
import axiosConfig from "../../axios/axiosConfig";
import endpoints from "../../const/endpoints";

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const { userData, setUserData } = useContext(UserContext);
  const history = useHistory();

  const pushToLoginPage = () => {
    history.push("/");
  };

  const getTransactions = async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${userData?.token}` },
      };

      const resp = await axiosConfig.get(endpoints.transaction, config);
      const { data } = resp;

      if (data) {
        setTransactions(data);
      }
    } catch (error) {
      console.error(error.response.data.error);
    }
  };

  useEffect(() => {
    if (!userData) {
      pushToLoginPage();
    }
  }, [userData]);

  useEffect(() => {
    getTransactions();
  }, [userData]);

  const handleSignOut = (event) => {
    event.preventDefault();
    setUserData(null);
    pushToLoginPage();
  };

  return (
    <>
      {userData && (
        <>
          <div>
            <button type="submit" onClick={handleSignOut}>
              Signout
            </button>
            <div>Current balance: {userData?.user?.balance}</div>
            <div>Account number: {userData?.user?.accountNumber}</div>
            <div>Transactions</div>
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Amount</th>
                  <th>Account Number</th>
                  <th>Time of transaction</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction, index) => {
                  const {
                    amount,
                    foreignAccountNumber,
                    updatedAt,
                  } = transaction;
                  return (
                    <tr>
                      <td>{index}</td>
                      <td>{amount}</td>
                      <td>{foreignAccountNumber}</td>
                      <td>{updatedAt}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <TransferCurrency />
        </>
      )}
    </>
  );
};
export default Dashboard;
