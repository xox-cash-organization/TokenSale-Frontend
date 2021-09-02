/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useReducer, useEffect } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEquals } from "@fortawesome/free-solid-svg-icons";
import Web3 from "web3";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { initialState } from "../../state";
import reducer from "../../state/reducer";
import logo from "../../xoximg.png";
import PresaleABI from "../../assets/ABI.json";
import { CONTRACT_ADDRESS } from "../../assets/env";

const NavFlex = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
  margin-top: ${props => props.marginTop || 0};
  padding: ${props => props.padding || 0};
`;

const Spacer = styled.div`
  flex: 0 1;
`;

const CenterFlex = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
  margin-top: ${props => props.marginTop || 0};
  padding: ${props => props.padding || 0};
`;

const SpanText = styled.span`
  font-size: ${props => props.fontSize || "13px"};
  font-weight: ${props => props.fontWeight || "normal"};
  font-style: ${props => props.fontStyle || "normal"};
  color: ${props => props.color || "black"};
  padding: ${props => props.padding || 0};
`;

const AnchorLink = styled.a`
  font-size: ${props => props.fontSize || "13px"};
  font-weight: ${props => props.fontWeight || "normal"};
  font-style: ${props => props.fontStyle || "normal"};
  color: ${props => props.color || "black"};
  padding: ${props => props.padding || 0};
`;

const DivInCenterFlex = styled.div`
  margin: ${props => props.margin || "0"};
`;

const FaArrowsAltH = styled(FontAwesomeIcon)`
  font-size: ${props => props.fontSize || "12px"};
`;

const Image = styled.img`
  width: ${props => props.width || "90px"};
  height: ${props => props.height || "90px"};
  border-radius: ${props => props.borderRadius || "50%"};
`;

const Home = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [bnbAmount, setBNBAmount] = useState(0);
  const [daysLeft, setDaysLeft] = useState("0");
  const [hoursLeft, setHoursLeft] = useState("0");
  const [minutesLeft, setMinutesLeft] = useState("0");
  const [secondsLeft, setSecondsLeft] = useState("0");
  const [presaleContract, setPresaleContract] = useState(null);

  const setProvider = provider =>
    dispatch({
      type: "WEB3_INJECTED",
      payload: new Web3(provider)
    });

  const setAccount = account =>
    dispatch({
      type: "ACCOUNT_SET",
      payload: account
    });

  const handleBNBInputChange = e => setBNBAmount(e.target.value);

  const injectProvider = () => {
    if (window.ethereum) {
      setProvider(window.ethereum);
    }
  };

  const setContract = () => {
    const contract = new state.provider.eth.Contract(
      PresaleABI,
      CONTRACT_ADDRESS
    );
    console.log(CONTRACT_ADDRESS);
    setPresaleContract(contract);
  };

  const requestAccounts = () => {
    if (window.ethereum) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then(accounts => setAccount(accounts[0]));
    }
  };

  const loadTime = async () => {
    const remainingDays = await presaleContract.methods
      .getRemainingDays()
      .call();
    const jsDate = new Date(Date.now() + remainingDays * 1000).getTime();
    setInterval(() => {
      const now = new Date().getTime();
      const diff = jsDate - now;
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      const daysAsString = days.toFixed(0);
      const hoursAsString = hours.toFixed(0);
      const minutesAsString = minutes.toFixed(0);
      const secondsAsString = seconds.toFixed(0);
      setDaysLeft(daysAsString);
      setHoursLeft(hoursAsString);
      setMinutesLeft(minutesAsString);
      setSecondsLeft(secondsAsString);
    }, 1000);
  };

  useEffect(() => {
    injectProvider();
  }, []);

  useEffect(() => {
    if (!!state.provider) setContract();
  }, [state.provider]);

  useEffect(() => {
    if (!!presaleContract) loadTime();
  }, [presaleContract]);

  return (
    <div>
      <NavFlex marginTop="2px" padding="2px">
        <div>
          <Image
            borderRadius="50%"
            src={logo}
            width="60px"
            height="60px"
            alt="XOXCASH Logo"
          />
        </div>
        <Spacer />
        <CenterFlex>
          <AnchorLink
            href="https://discord.gg/qqFF3BtQDq"
            fontSize="19px"
            fontWeight="bold"
            color="#ffffff"
            padding="2px 6px 2px 6px"
          >
            Discord
          </AnchorLink>
          <AnchorLink
            href="https://t.me/xoxgroupchat"
            fontSize="19px"
            fontWeight="bold"
            color="#ffffff"
            padding="2px 6px 2px 6px"
          >
            Telegram
          </AnchorLink>
          <AnchorLink
            href="https://twitter.com/x0xcash"
            fontSize="19px"
            fontWeight="bold"
            color="#ffffff"
            padding="2px 6px 2px 6px"
          >
            Twitter
          </AnchorLink>
        </CenterFlex>
        <Spacer />
        <Button
          color="black"
          backgroundColor="#ffffff"
          borderRadius="5px"
          fontStyle="normal"
          fontWeight="bold"
          onClick={requestAccounts}
        >
          {!!state.account
            ? state.account.substring(0, state.account.length - 36) +
              "..." +
              state.account.substring(state.account.length - 4)
            : "CONNECT METAMASK"}
        </Button>
      </NavFlex>
      <CenterFlex marginTop="40px" padding="14px">
        <DivInCenterFlex margin="3px 4px 3px 4px">
          <Input
            disabled
            padding="14px"
            border="0.7px solid #000000"
            value="1 XOXCASH"
          />
        </DivInCenterFlex>
        <DivInCenterFlex margin="3px 4px 3px 4px">
          <FaArrowsAltH icon={faEquals} color="#dcdcdc" fontSize="18px" />
        </DivInCenterFlex>
        <DivInCenterFlex margin="3px 4px 3px 4px">
          <Input
            disabled
            padding="14px"
            border="0.7px solid #000000"
            value="0.0025 BNB"
          />
        </DivInCenterFlex>
      </CenterFlex>
      <CenterFlex marginTop="40px" padding="14px">
        <DivInCenterFlex margin="2px">
          <Input
            padding="20px"
            border="0.7px solid #000000"
            borderRadius="5px"
            width="400px"
            placeholder="Enter BNB amount"
            value={bnbAmount}
            type="number"
            onChange={handleBNBInputChange}
          />
        </DivInCenterFlex>
        <DivInCenterFlex margin="2px">
          <Button
            color="white"
            backgroundColor="#1642fa"
            borderRadius="5px"
            fontStyle="normal"
            fontWeight="bold"
            padding="20px"
            border="none"
          >
            Buy
          </Button>
        </DivInCenterFlex>
      </CenterFlex>
      <CenterFlex marginTop="40px" padding="14px">
        <DivInCenterFlex margin="2px">
          <SpanText
            fontSize="28px"
            fontWeight="bold"
            color="#ffffff"
            padding="2px 6px 2px 6px"
          >
            Sale ends in:{" "}
          </SpanText>
          <SpanText
            fontSize="34px"
            fontWeight="bold"
            color="#1642fa"
            padding="1px 4px 1px 4px"
          >
            {daysLeft}
          </SpanText>
          <SpanText fontSize="15px" fontWeight="normal" color="#ffffff">
            days
          </SpanText>
          <SpanText
            fontSize="34px"
            fontWeight="bold"
            color="#1642fa"
            padding="1px 4px 1px 4px"
          >
            {hoursLeft}
          </SpanText>
          <SpanText fontSize="15px" fontWeight="normal" color="#ffffff">
            hours
          </SpanText>
          <SpanText
            fontSize="34px"
            fontWeight="bold"
            color="#1642fa"
            padding="1px 4px 1px 4px"
          >
            {minutesLeft}
          </SpanText>
          <SpanText fontSize="15px" fontWeight="normal" color="#ffffff">
            minutes
          </SpanText>
          <SpanText
            fontSize="34px"
            fontWeight="bold"
            color="#1642fa"
            padding="1px 4px 1px 4px"
          >
            {secondsLeft}
          </SpanText>
          <SpanText fontSize="15px" fontWeight="normal" color="#ffffff">
            seconds
          </SpanText>
        </DivInCenterFlex>
      </CenterFlex>
    </div>
  );
};

export default Home;
