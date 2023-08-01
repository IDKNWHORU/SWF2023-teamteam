const player = props.player ?? {
  name: "김유철",
  address: "0xFB6c8D00598B394798B2bbf3b66adCa608D5e08C",
};

const cronosContractAddress = "0xBBF09A10B1B8f1825cAdB58d34E0672A9Ee69c2d";

const cronosContractABI = [
  {
    type: "function",
    stateMutability: "view",
    outputs: [
      { type: "string", name: "", internalType: "string" },
      { type: "string", name: "", internalType: "string" },
      { type: "string", name: "", internalType: "string" },
      { type: "string", name: "", internalType: "string" },
      { type: "string", name: "", internalType: "string" },
      { type: "uint256", name: "", internalType: "uint256" },
      { type: "string", name: "", internalType: "string" },
    ],
    name: "getPlayerInfo",
    inputs: [{ type: "address", name: "player", internalType: "address" }],
  },
];

const selectPrice = (price) => {
  State.update({
    price,
  });
};

const getPlayerInfo = (_) => {
  const cronosContract = new ethers.Contract(
    cronosContractAddress,
    cronosContractABI,
    Ethers.provider().getSigner()
  );

  cronosContract.getPlayerInfo(player.address).then((player) => {
    State.update({ player });
  });
};

if (Ethers.provider()) {
  const signer = Ethers.provider().getSigner();
  signer
    .getAddress()
    .then((address) => {
      State.update({ address });
    })
    .catch((err) => {
      console.log({ err });
    });
}

getPlayerInfo();

const PlayerWrapper = styled.div`
  h1 {
    margin-left: 40px;
  }
`;

const PlayerInfoWrapper = styled.div`
  display: flex;
  margin-left: 40px;

  gap: 40px;

  .label-wrapper {
    width: 100px;
  }

  .content-wrapper {
    width: 100%;
  }

  p {
    margin-bottom: 10px;
  }
`;

return (
  <>
    {state.player !== undefined ? (
      <PlayerWrapper>
        <h1 className="player-name">
          {state.player[0]} {state.player[1]}
        </h1>
        <hr />
        <PlayerInfoWrapper>
          <div className="label-wrapper">
            <p className="label-name">포지션</p>
            <p className="label-name">소속팀</p>
            <p className="label-name">생년월일</p>
          </div>
          <div className="content-wrapper">
            <p className="content-name">{state.player[3]}</p>
            <p className="content-name">{state.player[4]}</p>
            <p className="content-name">{state.player[2]}</p>
          </div>
        </PlayerInfoWrapper>
      </PlayerWrapper>
    ) : null}
  </>
);
